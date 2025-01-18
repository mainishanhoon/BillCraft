import type { Metadata } from 'next';
import { DM_Serif_Text, Jura, Montserrat } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Toaster } from 'sonner';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const serif = DM_Serif_Text({
  weight: ['400'],
  variable: '--font-serif',
  subsets: ['latin'],
});

const jura = Jura({
  weight: ['700'],
  variable: '--font-jura',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: { default: 'BillCraft', template: '%s | BillCraft' },
  description: 'created by @mainishanhoon',
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.className} ${serif.variable} ${jura.variable} bg-background tracking-wide text-foreground antialiased`}
      >
        <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            richColors
            closeButton
            className={`${jura.className} font-bold tracking-normal`}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
