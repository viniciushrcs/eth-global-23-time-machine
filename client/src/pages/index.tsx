import Profile from '@/components/profile';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';

export default function Home() {
  const address = useAddress();

  return (
    <div className="container">
      <div className="flex flex-col items-center p-10 gap-4">
        <img alt="logo" src="/logo.png" className="w-64 h-auto mb-8" />

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Give gifts that really matters
        </h1>

        <p className="text-lg text-center text-gray-600">
          Create Savings Capsules and save money for the future of your child
        </p>
        <ConnectWallet
          btnTitle="Login with Email"
          theme={'dark'}
          modalTitleIconUrl="/logo_mini.png"
          modalTitle="Sign-up/Sign-in"
        />
        {address ? <Profile /> : null}
      </div>
    </div>
  );
}
