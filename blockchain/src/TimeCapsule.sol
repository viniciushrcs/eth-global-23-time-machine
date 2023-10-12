// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract TimeCapsule {
    struct Capsule {
        address owner; // Dono da cápsula
        address recipient; // Destinatário da cápsula
        uint256 unlockTime; // Tempo para desbloquear a cápsula
        uint256 amount; // Quantidade de dinheiro na cápsula
        string message; // Mensagem na cápsula
        string audio; // Áudio na cápsula
        string video; // Vídeo na cápsula
        bool isOpened; // Status da cápsula (aberta/fechada)
    }

    // Mapeamento para armazenar cápsulas associadas a um ID único
    mapping(uint256 => Capsule) public capsules;

    // Contador para gerar IDs únicos para as cápsulas
    uint256 public capsuleCounter;

    // Função para criar uma nova cápsula do tempo
    function createCapsule(
        address _recipient,
        uint256 _unlockTime
    ) public returns (uint256);

    // Função para adicionar presentes à cápsula
    function addGifts(
        uint256 _capsuleId,
        string memory _message,
        string memory _audio,
        string memory _video
    ) public payable;

    // Função para definir o destinatário da cápsula
    function setRecipient(uint256 _capsuleId, address _recipient) public;

    // Função para definir as condições de abertura da cápsula baseadas no tempo
    function setUnlockTime(uint256 _capsuleId, uint256 _unlockTime) public;

    // Função para o recebedor abrir a cápsula
    function openCapsule(uint256 _capsuleId) public;
}
