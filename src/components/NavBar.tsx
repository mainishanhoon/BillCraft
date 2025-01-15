'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { navItems } from '@/constants/navLinks';

interface NavBarProps {
  onNavItemClick: () => void;
}

export default function NavBar() {
  const pathname = usePathname();
  return (
    <>
      {navItems.map((label, index) => (
        <Link
          href={label.href}
          key={index}
          className={cn(
            pathname == label.href
              ? 'bg-primary/10 text-primary'
              : 'bg-muted/50 text-muted-foreground',
            'text-md mx-1 flex items-center gap-2 rounded-lg px-3 py-2 font-semibold tracking-wide transition-all hover:text-primary/70',
          )}
        >
          <label.icon size={25} strokeWidth={2.5} />
          {label.label}
        </Link>
      ))}
    </>
  );
}
