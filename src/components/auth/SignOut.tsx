import { Button } from '@/components/ui/button';
import { signOut } from '@/utils/auth';
import Form from 'next/form';

export default function SignOutButton() {
  return (
    <Form
      action={async () => {
        'use server';
        await signOut();
      }}
      className="flex flex-col gap-y-5"
    >
      <Button type="submit" variant="destructive">
        SignOut
      </Button>
    </Form>
  );
}
