import { redirect } from 'next/navigation';
import { auth } from '@/utils/auth';

export async function fetchUser() {
  const session = await auth();

  if (!session?.user) {
    redirect('/signIn');
  }

  return session;
}
