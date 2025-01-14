import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';

export async function fetchUser() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }
  return session;
}
