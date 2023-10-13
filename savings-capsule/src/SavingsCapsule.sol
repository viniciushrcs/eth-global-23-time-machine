// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./CapsuleRecipient.sol";

contract SavingsCapsule {
    struct Gift {
        address gifter; // Endereço do doador
        string videoIPFSHash; // Vídeo do presente
    }

    struct Capsule {
        uint256 id; // ID da cápsula
        address capsuleCreator; // Dono da cápsula
        address recipient; // id do Destinatário da cápsula (TimeLockedWallet)
        uint256 unlockTime; // Tempo para desbloquear a cápsula
        uint256 amountGoal;
        uint256 currentAmount;
        bool isOpened; // Status da cápsula (aberta/fechada)
        Gift[] gifts; // Lista de presentes na cápsula
    }

    mapping(uint256 => Capsule) public capsules;
    uint256 public capsuleCounter;

    // Eventos
    event CapsuleCreated(
        uint256 capsuleId,
        address capsuleCreator,
        address recipient,
        uint256 unlockTime,
        uint256 amountGoal
    );
    event GiftAdded(
        uint256 capsuleId,
        address gifter,
        string videoIPFSHash,
        uint256 value
    );
    event CapsuleOpened(uint256 capsuleId);

    function createCapsule(uint256 _unlockTime, uint256 _amountGoal) public {
        capsuleCounter++;
        address capsuleCreator = msg.sender;

        CapsuleRecipient newRecipient = new CapsuleRecipient(
            capsuleCreator,
            _unlockTime
        );

        address recipientAddress = address(newRecipient);

        capsules[capsuleCounter] = Capsule({
            id: capsuleCounter,
            capsuleCreator: capsuleCreator,
            recipient: recipientAddress,
            unlockTime: _unlockTime,
            amountGoal: _amountGoal,
            currentAmount: 0,
            isOpened: false,
            gifts: new Gift[](0)
        });
    }

    function addGift(
        uint256 _capsuleId,
        string memory _name,
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

        capsules[_capsuleId].gifts.push(newGift);
        capsules[_capsuleId].currentAmount += msg.value;
        payable(capsules[_capsuleId].recipient).transfer(msg.value);
    }

    function openCapsule(uint256 _capsuleId) public {
        require(
            msg.sender == capsules[_capsuleId].recipient,
            "Only the recipient can open the capsule"
        );
        require(
            block.timestamp >= capsules[_capsuleId].unlockTime,
            "Capsule is not yet ready to be opened"
        );
        require(!capsules[_capsuleId].isOpened, "Capsule is already opened");

        // Aqui, em um cenário real, usando Chainlink Functions para checar condições extratempo e pegar a chave de decriptação da mensagem e o vídeo.

        capsules[_capsuleId].isOpened = true;

        address payable recipientPayable = payable(
            capsules[_capsuleId].recipient
        );
        CapsuleRecipient recipientContract = CapsuleRecipient(recipientPayable);
        recipientContract.unlockWallet();

        payable(capsules[_capsuleId].capsuleCreator).transfer(
            capsules[_capsuleId].currentAmount
        );
    }
}
