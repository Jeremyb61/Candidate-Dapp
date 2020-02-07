pragma solidity ^0.5.16;

contract Election {
    //Model a Candidate
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    //Store Candidate
    //Fetch Candidate
    mapping(uint256 => Candidate) public candidates;

    //Store Candidates Count
    uint256 public candidateCount;

    constructor() public {
        addCandidate("Andrew Yang");
        addCandidate("trump");
    }

    function addCandidate(string memory _name) private {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
    }

}
