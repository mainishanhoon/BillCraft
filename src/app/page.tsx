import { Hero, NavBar } from '@/components/Hero';

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <NavBar />
      <Hero />
    </main>
  );
}
