import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  ThirdwebProvider,
  embeddedWallet,
  smartWallet,
} from '@thirdweb-dev/react';
import { Mumbai } from '@thirdweb-dev/chains';

const queryClient = new QueryClient();
const activeChain = Mumbai;

export default function App({ Component, pageProps }: AppProps) {
  const smartWalletConfig = {
    factoryAddress: '0x32f86995607DBB40a5ac033d49be1d7064aea2b0',
    gasless: true,
    clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
  };
  const wallet = smartWallet(embeddedWallet(), smartWalletConfig);

  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[wallet]}
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}
