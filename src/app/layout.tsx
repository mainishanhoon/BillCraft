import type { Metadata } from 'next';
import { DM_Serif_Text, Jura, Outfit } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Toaster } from 'sonner';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

const serif = DM_Serif_Text({
  weight: ['400'],
  variable: '--font-serif',
  subsets: ['latin'],
});

const jura = Jura({
  weight: ['400'],
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
        className={`${outfit.className} ${serif.variable} ${jura.variable} antialiased`}
      >
        <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
