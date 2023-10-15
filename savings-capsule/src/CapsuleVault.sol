// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract CapsuleVault {
    address public admin;
    address public owner;
    bool public isLocked;
    uint256 public unlockTime;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
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

    function withdrawAll() external onlyAdmin {
        require(isLocked == false, "Wallet is still locked");
        uint256 balance = address(this).balance;
        payable(owner).transfer(balance);
        emit Withdrew(owner, balance);
    }

    function withdrawAmount(uint256 _amount) external onlyAdmin {
        require(isLocked == false, "Wallet is still locked");
        require(_amount <= address(this).balance, "Insufficient funds");
        payable(owner).transfer(_amount);
        emit Withdrew(owner, _amount);
    }

    function info() external view returns (address, address, bool, uint256) {
        return (admin, owner, isLocked, address(this).balance);
    }

    event Received(address from, uint256 amount);
    event Withdrew(address to, uint256 amount);
}
