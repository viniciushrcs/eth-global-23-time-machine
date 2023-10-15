// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./CapsuleVault.sol";

contract SavingsCapsule {
    struct Gift {
        address gifter;
        string videoIPFSHash;
    }

    struct Capsule {
        uint256 id;
        address capsuleCreator;
        address capsuleVault;
        uint256 unlockTime;
        uint256 amountGoal;
        uint256 currentAmount;
        bool isOpened;
        mapping(uint256 => Gift) gifts;
        uint256 giftsCount;
    }

    mapping(uint256 => Capsule) public capsules;
    uint256 public capsuleCounter;

    event CapsuleCreated(
        uint256 capsuleId,
        address capsuleCreator,
        address capsuleVault,
        uint256 unlockTime,
        uint256 amountGoal
    );
    event GiftAdded(uint256 capsuleId, uint256 value);
    event CapsuleOpened(uint256 capsuleId);

    function createCapsule(uint256 _unlockTime, uint256 _amountGoal) public {
        capsuleCounter++;
        address capsuleCreator = msg.sender;

        CapsuleVault newVault = new CapsuleVault(capsuleCreator, _unlockTime);

        address vaultAddress = address(newVault);

        capsules[capsuleCounter].id = capsuleCounter;
        capsules[capsuleCounter].capsuleCreator = capsuleCreator;
        capsules[capsuleCounter].capsuleVault = vaultAddress;
        capsules[capsuleCounter].unlockTime = _unlockTime;
        capsules[capsuleCounter].amountGoal = _amountGoal;
        capsules[capsuleCounter].currentAmount = 0;
        capsules[capsuleCounter].isOpened = false;
        capsules[capsuleCounter].giftsCount = 0;
        emit CapsuleCreated(
            capsuleCounter,
            capsuleCreator,
            vaultAddress,
            _unlockTime,
            _amountGoal
        );
    }

    function addGift(
        uint256 _capsuleId,
        string memory _videoIPFSHash
    ) public payable {
        require(
            capsules[_capsuleId].capsuleCreator != address(0),
            "Capsule does not exist"
        );
        require(!capsules[_capsuleId].isOpened, "Capsule is already opened");
        require(
            capsules[_capsuleId].currentAmount + msg.value <=
                capsules[_capsuleId].amountGoal,
            "Amount goal exceeded"
        );

        Gift memory newGift = Gift({
            gifter: msg.sender,
            videoIPFSHash: _videoIPFSHash
        });

        capsules[_capsuleId].gifts[capsules[_capsuleId].giftsCount] = newGift;
        capsules[_capsuleId].giftsCount++;
        capsules[_capsuleId].currentAmount += msg.value;
        payable(capsules[_capsuleId].capsuleVault).transfer(msg.value);

        emit GiftAdded(_capsuleId, msg.value);
    }

    function openCapsule(uint256 _capsuleId) public {
        require(
            msg.sender == capsules[_capsuleId].capsuleCreator,
            "Only the cretor can open the capsule"
        );
        require(
            block.timestamp >= capsules[_capsuleId].unlockTime,
            "Capsule is not yet ready to be opened"
        );
        require(!capsules[_capsuleId].isOpened, "Capsule is already opened");

        capsules[_capsuleId].isOpened = true;

        address payable vaultPayable = payable(
            capsules[_capsuleId].capsuleVault
        );
        CapsuleVault vaultContract = CapsuleVault(vaultPayable);
        vaultContract.unlockWallet();
        vaultContract.withdrawAll();

        emit CapsuleOpened(_capsuleId);
    }

    function getGiftsCount(uint256 _capsuleId) public view returns (uint256) {
        return capsules[_capsuleId].giftsCount;
    }

    function getGift(
        uint256 _capsuleId,
        uint256 giftIndex
    ) public view returns (address gifter, string memory videoIPFSHash) {
        require(
            giftIndex < capsules[_capsuleId].giftsCount,
            "Gift index out of bounds"
        );
        Gift memory gift = capsules[_capsuleId].gifts[giftIndex];
        return (gift.gifter, gift.videoIPFSHash);
    }
}
