import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ReceiptIndianRupee } from 'lucide-react';
import ThemeToggle from '@/components/ThemeSwitcher';
import NavBar from '@/components/NavBar';
import UserDropdown from '@/components/auth/UserDetail';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 bg-background px-2 py-3 dark:border-muted-foreground/40 sm:px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            className="mx-auto flex items-center gap-2 text-2xl font-black max-md:hidden"
          >
            <ReceiptIndianRupee
              size={35}
              className="rounded-md bg-primary p-1.5 text-white"
            />
            <p className="font-serif font-bold tracking-widest">
              Bill
              <span className="tracking-widest text-primary">Craft</span>
            </p>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex cursor-pointer items-center space-x-2 md:hidden">
                <ReceiptIndianRupee
                  size={35}
                  className="rounded-lg bg-primary p-1.5 text-white"
                />
                <p className="font-serif text-2xl font-bold tracking-widest">
                  Bill
                  <span className="tracking-widest text-primary">Craft</span>
                </p>
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="w-70 flex flex-col">
              <SheetTitle>
                <Link
                  href="/"
                  className="mx-auto mt-5 flex items-center gap-2 text-2xl font-black"
                >
                  <ReceiptIndianRupee
                    size={35}
                    className="rounded-lg bg-primary p-1.5 text-white"
                  />
                  <p className="font-serif font-bold tracking-widest">
                    Bill
                    <span className="tracking-widest text-primary">Craft</span>
                  </p>
                </Link>
              </SheetTitle>
              <nav className="mt-2 grid gap-2">
                <NavBar />
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="flex max-md:hidden">
          <NavBar />
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-5">
          <ThemeToggle />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
