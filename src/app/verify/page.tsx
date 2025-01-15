import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BadgeAlert, ChevronsLeft, Mail } from 'lucide-react';
import Link from 'next/link';

export default function VerifyRoute() {
  return (
    <div className="flex h-dvh w-full items-center justify-center px-4">
      <Card className="max-w-sm">
        <CardHeader className="text-center">
          <span className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/20">
            <Mail size={50} color="hsl(var(--primary))" />
          </span>
          <CardTitle className="text-3xl font-bold">Check Your Email</CardTitle>
          <CardDescription>
            We have sent a verification link to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 rounded-md border-2 border-dashed border-yellow-500 bg-yellow-500/10 p-2 md:p-4">
            <div className="flex items-center gap-x-3">
              <BadgeAlert size={25} className="text-yellow-500" />
              <p className="text-sm font-medium text-yellow-600">
                Be sure to check your spam folder!
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href={'/'}
            className={buttonVariants({
              className: 'flex w-full gap-x-3',
              variant: 'outline',
            })}
          >
            <ChevronsLeft size={25} strokeWidth={2.5} />
            <p>Back to HomePage</p>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
