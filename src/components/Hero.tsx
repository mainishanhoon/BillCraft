import { ReceiptIndianRupee } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 py-12 font-jura">
      <div className="flex flex-col items-center gap-8 text-center">
        <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-base font-medium tracking-tight text-primary">
          Introducing BillCraft 1.0
        </span>
        <p className="p-4 text-4xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          <span>Invoicing made</span>
          <br />
          <span className="bg-gradient-to-t from-blue-500 via-teal-500 to-green-500 bg-clip-text text-transparent">
            super easy!
          </span>
        </p>
        <p className="mx-auto max-w-xl leading-none tracking-normal text-muted-foreground lg:text-lg">
          Creating Invoices can be a pain! We at BillCraft make it super easy
          for you to get paid in time!
        </p>
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/signIn">
            <Button className="text-sm text-white md:text-xl">
              Come Onboard
            </Button>
          </Link>
          <Link href={'https://github.com/mainishanhoon/BillCraft'}>
            <Button variant="outline" className="gap-2 p-4 text-lg font-bold">
              <GitHubLogoIcon className="size-6" />
              <p>GitHub</p>
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative mx-auto mt-12 w-full items-center md:py-12">
        <svg
          className="absolute inset-0 -mt-24 blur-3xl"
          style={{ zIndex: -1 }}
          fill="none"
          viewBox="0 0 400 400"
          height="100%"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_10_20)">
            <g filter="url(#filter0_f_10_20)">
              <path
                d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                fill="#03FFE0"
              ></path>
              <path
                d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                fill="#7C87F8"
              ></path>
              <path
                d="M320 400H400V78.75L106.2 134.75L320 400Z"
                fill="#4C65E4"
              ></path>
              <path
                d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                fill="#043AFF"
              ></path>
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="720.666"
              id="filter0_f_10_20"
              width="720.666"
              x="-160.333"
              y="-160.333"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              ></feBlend>
              <feGaussianBlur
                result="effect1_foregroundBlur_10_20"
                stdDeviation="80.1666"
              ></feGaussianBlur>
            </filter>
          </defs>
        </svg>
        <div className="group relative aspect-video dark:hidden">
          <Image
            src="/Dashboard_Day.png"
            alt="Dashboard_Day"
            width={1920}
            height={1080}
            className="absolute inset-0 size-full rounded-lg border object-cover shadow-2xl transition-opacity duration-500 ease-in-out group-hover:opacity-0 lg:rounded-2xl"
          />
          <Image
            src="/Invoices_Day.png"
            alt="Invoices_Day"
            width={1920}
            height={1080}
            className="absolute inset-0 size-full rounded-lg border object-cover opacity-0 shadow-2xl transition-opacity duration-500 ease-in-out group-hover:opacity-100 lg:rounded-2xl"
          />
        </div>
        <div className="group relative hidden aspect-video dark:block">
          <Image
            src="/Dashboard_Night.png"
            alt="Dashboard_Night"
            width={1920}
            height={1080}
            className="absolute inset-0 size-full rounded-lg border object-cover shadow-2xl transition-opacity duration-500 ease-in-out group-hover:opacity-0 lg:rounded-2xl"
          />
          <Image
            src="/Invoices_Night.png"
            alt="Invoices_Night"
            width={1920}
            height={1080}
            className="absolute inset-0 size-full rounded-lg border object-cover opacity-0 shadow-2xl transition-opacity duration-500 ease-in-out group-hover:opacity-100 lg:rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export function NavBar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2 text-2xl font-black">
        <ReceiptIndianRupee
          size={35}
          className="rounded-md bg-primary p-1 text-white"
        />
        <p className="font-serif font-bold tracking-widest">
          Bill
          <span className="tracking-widest text-primary">Craft</span>
        </p>
      </Link>
      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggle />
        <Link href="/signIn">
          <Button className="text-sm text-white md:text-xl">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
