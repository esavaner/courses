'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
type Props = {
  href: string;
  children: React.ReactNode;
};

export const ActiveLink = ({ href, children }: Props) => {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === href : pathname.includes(href);
  return (
    <Link
      href={href}
      className={clsx(
        ` border-b  text-blue-400 hover:text-blue-600`,
        isActive ? 'border-b-slate-800' : 'border-b-slate-50',
      )}
      {...(isActive && { 'aria-current': true })}
    >
      {children}
    </Link>
  );
};
