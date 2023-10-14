import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { cn } from '@/utils/cn';
import { useRouter } from 'next/router';
import { ConnectWallet } from '@thirdweb-dev/react';

type NavItem = {
  title: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    title: 'My Savings',
    href: '/savings',
  },
  {
    title: 'Create Saving',
    href: '/create-savings',
  },
  {
    title: 'Give a Gift',
    href: '/give-gift',
  },
];

export function Navbar() {
  const { pathname } = useRouter();

  return (
    <div className={cn('w-full fixed z-navbar bg-navbar')}>
      <div className="container w-full flex items-center justify-between py-4 mb-2">
        <div className="flex items-center">
          <Link href="/" className="ml-0">
            <Image
              src="/logo_3.svg"
              width={50}
              height={50}
              alt="Saving Capsules"
            />
          </Link>

          <NavigationMenu className="flex space-x-6 ml-6">
            <NavigationMenuList>
              {NAV_ITEMS.map(({ title, href }) => {
                return (
                  <NavigationMenuItem key={title}>
                    <Link href={href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          'bg-transparent',
                        )}
                        active={pathname !== '/' && href.includes(pathname)}
                      >
                        {title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div>
          <ConnectWallet
            btnTitle="Login with Email"
            theme={'dark'}
            modalTitleIconUrl="/logo_3.svg"
            modalTitle="Sign-up/Sign-in"
          />
        </div>
      </div>
    </div>
  );
}
