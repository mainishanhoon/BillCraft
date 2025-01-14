import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-dvh w-full items-center justify-center px-4">
      <Button>
        <Link href="/signIn">SignIn Route</Link>
      </Button>
    </div>
  );
}
