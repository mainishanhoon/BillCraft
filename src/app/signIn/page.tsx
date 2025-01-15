import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signIn } from '@/utils/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Form from 'next/form';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/hooks/hooks';

export const metadata: Metadata = {
  title: 'About',
};

export default async function page() {
    const session = await fetchUser();

    if (session?.user) {
      redirect('/dashboard');
    }
  return (
    <div className="flex h-dvh w-full items-center justify-center px-4">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl">SignIn</CardTitle>
          <CardDescription>
            Enter the email below to login in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            action={async (formdata) => {
              'use server';
              await signIn('nodemailer', formdata);
            }}
            className="flex flex-col gap-y-5"
          >
            <div className="flex flex-col gap-y-2">
              <Label>Email</Label>
              <Input name='email' type="email" required placeholder="loremipsum@email.com"></Input>
            </div>
            <Button>Submit</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
