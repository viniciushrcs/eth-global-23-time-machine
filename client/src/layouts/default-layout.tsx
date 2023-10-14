import { Navbar } from '@/components/navbar/navbar';
import { PropsWithChildren } from 'react';

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />

      <div className="pt-16 lg:pt-[68px]">{children}</div>
    </>
  );
}
