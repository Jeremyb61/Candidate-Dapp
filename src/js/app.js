App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",

  init: () => {
    return App.initWeb3();
  },
  //initWeb3 connects client side app to local blockchain
  initWeb3: () => {
    if (typeof web3 !== "undefined") {
      // If web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },
  //loads contract into frontend application so we can interact with it
  initContract: function() {
    $.getJSON("Election.json", election => {
      //Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      //Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      return App.render();
    });
  },
  render: () => {
    var electionIntance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    //Load Account data

    web3.eth.getCoinbase((err, account) => {
      if (err === null) {
        App.account = account;
        $("#address").html("Your Account: " + account);
      } else {
        console.log("ERR: ", err);
      }
    });
    // address: "0x6F73A24c971B0E4E24114C2962E50d9BeD481990"

    //Load contract data
    App.contracts.Election.deployed()
      .then(instance => {
        electionIntance = instance;
        return electionIntance.candidateCount();
      })
      .then(candidateCount => {
        var candidateResults = $("#candidateResults");
        candidateResults.empty();

        for (let i = 1; i <= candidateCount; i++) {
          electionIntance.candidates(i).then(candidate => {
            var id = candidate[0];
            var name = candidate[1];
            var voteCount = candidate[2];

            var candidateTemplate =
              "<tr><th>" +
              id +
              "</th><td>" +
              name +
              "</td><td>" +
              voteCount +
              "</td></tr>";
            candidateResults.append(candidateTemplate);
            console.log(candidateTemplate);
            console.log(candidateResults);
          });
        }
        loader.hide();
        content.show();
      })
      .catch(error => {
        console.warn(error);
      });
  }
};

$(() => {
  $(window).load(() => {
    App.init();
  });
});
