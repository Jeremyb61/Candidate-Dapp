const Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {
  var electionInstance;

  it("initializes with two candidates", () => {
    return Election.deployed()
      .then(instance => {
        return instance.candidateCount();
      })
      .then(count => {
        assert.equal(count, 2);
      });
  });

  it("Initilizes the Candidates with the correct values", () => {
    return Election.deployed()
      .then(instance => {
        electionInstance = instance;
        return electionInstance.candidates(1);
      })
      .then(candidate => {
        assert.equal(candidate[0], 1, "Contains the correct Id");
        assert.equal(candidate[1], "Bernie", "Contains the correct name");
        assert.equal(candidate[2], 0, "Contains then correct Vote Count");
        return electionInstance.candidates(2);
      })
      .then(candidate => {
        assert.equal(candidate[0], 2, "Contains the correct Id");
        assert.equal(candidate[1], "trump", "Contains the correct name");
        assert.equal(candidate[2], 0, "Contains then correct Vote Count");
      });
  });

  it("allows user to cast a vote", () => {
    return Election.deployed()
      .then(instance => {
        electionInstance = instance;
        candidateId = 1;
        return electionInstance.vote(candidateId, { from: accounts[0] });
      })
      .then(receipt => {
        return electionInstance.voters(accounts[0]);
      })
      .then(voted => {
        assert(voted, "the voter was marked as voted");
        return electionInstance.candidates(candidateId);
      })
      .then(candidate => {
        let voteCount = candidate[2];
        assert.equal(voteCount, 1, "increments the candidates vote count");
      });
  });
});
