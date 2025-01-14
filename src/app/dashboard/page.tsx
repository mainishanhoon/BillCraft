import { Button } from '@/components/ui/button';
import { fetchUser } from '@/hooks/hooks';
import { signOut } from '@/utils/auth';
import Form from 'next/form';

export default async function DashboardRoute() {
  const session = await fetchUser();
  return (
    <Form
      action={async () => {
        'use server';
        await signOut();
      }}
      className="flex flex-col gap-y-5"
    >
      <Button type="submit">SignOut</Button>
    </Form>
  );
}
