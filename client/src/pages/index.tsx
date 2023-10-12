import { Login } from '@/components/login';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container">
      <div className="flex flex-col items-center p-10">
        <Image alt="logo" src="/logo.png" width={350} height={100} />
      </div>
      <Login />
    </div>
  );
}
