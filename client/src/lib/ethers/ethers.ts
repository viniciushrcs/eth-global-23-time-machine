import { Mumbai } from '@thirdweb-dev/chains';
import { Signer, ethers } from 'ethers';

const savingsCapsuleABI = [{}];

export function getProvider() {
  return new ethers.providers.JsonRpcProvider(Mumbai.rpc[0]);
}

export function getSavingsCapsuleContract(signer: Signer) {
  const contractAddress = process.env.SAVING_CAPSULE_ADDRESS ?? '';
  return new ethers.Contract(contractAddress, savingsCapsuleABI, signer);
}

export async function createCapsule(
  signer: Signer,
  _unlockTime: number,
  _amountGoal: number,
) {
  const contract = getSavingsCapsuleContract(signer);
  const tx = await contract.createCapsule(_unlockTime, _amountGoal);
  const receipt = tx.wait();
  console.log(receipt);
  return receipt;
}
