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
        assert.equal(candidate[1], "Andrew Yang", "Contains the correct name");
        assert.equal(candidate[2], 0, "Contains then correct Vote Count");
        return electionInstance.candidates(2);
      })
      .then(candidate => {
        assert.equal(candidate[0], 2, "Contains the correct Id");
        assert.equal(candidate[1], "trump", "Contains the correct name");
        assert.equal(candidate[2], 0, "Contains then correct Vote Count");
      });
  });
});
