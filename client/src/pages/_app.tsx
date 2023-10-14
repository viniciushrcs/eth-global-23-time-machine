import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  ThirdwebProvider,
  embeddedWallet,
  smartWallet,
} from '@thirdweb-dev/react';
import { Mumbai } from '@thirdweb-dev/chains';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import DefaultLayout from '@/layouts/default-layout';

const queryClient = new QueryClient();
const activeChain = Mumbai;

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const smartWalletConfig = {
    factoryAddress: '0x32f86995607DBB40a5ac033d49be1d7064aea2b0',
    gasless: true,
    clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
  };
  const wallet = smartWallet(embeddedWallet(), smartWalletConfig);
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[wallet]}
    >
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}
