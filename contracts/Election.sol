pragma solidity ^0.5.16;

contract Election {
    string public candidate;

    // contracts need constructors
    constructor() public {
        candidate = "Andrew Yang";
    }

    // something that will run whenever we initialize
    //the contract upon migration

}
