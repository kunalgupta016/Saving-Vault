// SPDX-License-Identifier: MLT
pragma solidity ^0.8.0;

contract SavingsVault {
    mapping(address => uint256) private balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance to withdraw");
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
    
    function checkBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
