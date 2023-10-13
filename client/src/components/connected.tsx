import { ThirdwebSDKProvider } from '@thirdweb-dev/react';
import { Signer } from 'ethers';
import Profile from './profile';

export const ConnectedComponents = ({ signer }: { signer: Signer }) => {
  return (
    <div className="flex flex-col items-center p-10">
      <ThirdwebSDKProvider
        signer={signer}
        activeChain={'mumbai'}
        clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      >
        <Profile />
      </ThirdwebSDKProvider>
    </div>
  );
};
