import { ThirdwebSDK, isContractDeployed } from '@thirdweb-dev/sdk';
import { PaperWallet, SmartWallet } from '@thirdweb-dev/wallets';
import { Mumbai } from '@thirdweb-dev/chains';

const chain = Mumbai;

export function createSmartWallet(): SmartWallet {
  const smartWallet = new SmartWallet({
    chain: 'mumbai',
    factoryAddress: '0x32f86995607DBB40a5ac033d49be1d7064aea2b0',
    gasless: true,
    clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
  });
  return smartWallet;
}

export async function connectPaperWallet(email: string): Promise<PaperWallet> {
  const paperWallet = new PaperWallet({
    chain: Mumbai,
    clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
  });

  await paperWallet.connect({
    email,
  });

  return paperWallet;
}

export async function connectSmartWallet(email: string): Promise<SmartWallet> {
  const smartWallet = createSmartWallet();

  const personalWallet = await connectPaperWallet(email);

  await smartWallet.connect({
    personalWallet,
  });

  const sdk = await ThirdwebSDK.fromWallet(smartWallet, chain, {
    clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
  });

  const address = await sdk.wallet.getAddress();
  const isDeployed = await isContractDeployed(address, sdk.getProvider());

  if (!isDeployed) {
  } else {
  }
  return smartWallet;
}
