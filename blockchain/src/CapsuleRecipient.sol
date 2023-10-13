// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract CapsuleRecipient {
    address public admin;
    address public owner;
    bool public isLocked;
    uint256 public unlockTime;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(address _owner, uint256 _unlockTime) {
        admin = msg.sender;
        owner = _owner;
        isLocked = true;
        unlockTime = _unlockTime;
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    fallback() external payable {}

    function unlockWallet() external onlyAdmin {
        require(block.timestamp >= unlockTime, "Wallet is still locked");
        isLocked = false;
    }

    function withdrawAll() external onlyOwner {
        require(isLocked == false, "Wallet is still locked");
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
        emit Withdrew(msg.sender, balance);
    }

    function withdrawAmount(uint256 _amount) external onlyOwner {
        require(isLocked == false, "Wallet is still locked");
        require(_amount <= address(this).balance, "Insufficient funds");
        payable(msg.sender).transfer(_amount);
        emit Withdrew(msg.sender, _amount);
    }

    function info() external view returns (address, address, bool, uint256) {
        return (admin, owner, isLocked, address(this).balance);
    }

    event Received(address from, uint256 amount);
    event Withdrew(address to, uint256 amount);
}
