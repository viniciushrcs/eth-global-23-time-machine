import { SAVING_CAPSULE_ADDRESS } from '@/constants/contract';
import { Mumbai } from '@thirdweb-dev/chains';
import { Signer, ethers } from 'ethers';
import { abi as savingsCapsuleABI } from '@/constants/SavingsCapsule.json';

export function getProvider() {
  return new ethers.providers.JsonRpcProvider(Mumbai.rpc[0]);
}

export function getSavingsCapsuleContract(signer: Signer) {
  const contractAddress = SAVING_CAPSULE_ADDRESS;
  return new ethers.Contract(contractAddress, savingsCapsuleABI, signer);
}

export async function createCapsule(
  signer: Signer,
  _unlockTime: number,
  _amountGoal: number,
) {
  const contract = getSavingsCapsuleContract(signer);
  const tx = await contract.createCapsule(_unlockTime, _amountGoal);
  const receipt = await tx.wait();
  console.log(receipt);
  return receipt;
}

export async function giveGift(
  signer: Signer,
  _capsuleId: number,
  _videoIPFSHash: string,
  _amount: number,
) {
  const contract = getSavingsCapsuleContract(signer);
  const tx = await contract.addGift(_capsuleId, _videoIPFSHash, {
    value: ethers.BigNumber.from(_amount),
  });
  const receipt = await tx.wait();
  console.log(receipt);
  return receipt;
}

export async function getGifts(signer: Signer, _capsuleId: number) {
  const contract = getSavingsCapsuleContract(signer);
  const tx = await contract.getGiftsCount(_capsuleId);
  const count = await tx.toNumber();
  const gifts = [];
  for (let i = 0; i < count; i++) {
    const gift = await contract.getGift(_capsuleId, i);
    const giftData = {
      gifter: gift.gifter,
      videoIPFSHash: gift.videoIPFSHash,
    };
    gifts.push(giftData);
  }
  return gifts;
}

export async function openCapsule(signer: Signer, _capsuleId: number) {
  const contract = getSavingsCapsuleContract(signer);
  const tx = await contract.openCapsule(_capsuleId);
  console.log(tx);
  const receipt = await tx.wait();
  console.log(receipt);
  return receipt;
}
