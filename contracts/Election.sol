pragma solidity ^0.5.16;

contract Election {
    //Model a Candidate
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    //Store  accounts that have voted
    mapping(address => bool) public voters;

    //Store Candidate
    //Fetch Candidate
    mapping(uint256 => Candidate) public candidates;

    //Store Candidates Count
    uint256 public candidateCount;

    constructor() public {
        addCandidate("Bernie");
        addCandidate("trump");
    }

    function addCandidate(string memory _name) private {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
    }

    function vote(uint256 _candidateId) public {
        // require that they havent voted before
        require(!voters[msg.sender], "Sorry Bud, you\ve already voted");
        // require a valid candidate
        require(
            _candidateId > 0 && _candidateId <= candidateCount,
            "Sorry, No such candidate exist"
        );

        //recorded that voter has voted
        voters[msg.sender] = true;

        // update candidates vote count
        candidates[_candidateId].voteCount++;
    }

}
