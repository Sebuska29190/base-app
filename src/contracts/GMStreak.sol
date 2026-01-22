// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GMStreak {
    mapping(address => uint256) public streaks;
    mapping(address => uint256) public lastGM;

    function sayGM() public {
        if (block.timestamp - lastGM[msg.sender] >= 86400) { // 1 day in seconds
            streaks[msg.sender] += 1;
        } else {
            streaks[msg.sender] = 1;
        }
        lastGM[msg.sender] = block.timestamp;
    }

    function getStreak(address user) public view returns (uint256) {
        return streaks[user];
    }
}