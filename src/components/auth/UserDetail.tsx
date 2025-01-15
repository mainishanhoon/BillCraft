import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { fetchUser } from '@/hooks/hooks';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Label } from '@/components/ui/label';
import SignOutButton from '@/components/auth/SignOut';

async function getUser(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      state: true,
      city: true,
      street: true,
      pincode: true,
    },
  });

  if (
    !data?.firstName ||
    !data?.lastName ||
    !data?.state ||
    !data?.city ||
    !data?.street ||
    !data?.pincode
  ) {
    redirect('/onboarding');
  }

  return data;
}

export default async function UserDropdown() {
  const session = await fetchUser();
  const data = await getUser(session?.user?.id as string);

  return (
    <div className="flex items-center gap-2">
      <Label className="flex flex-col justify-end text-sm">
        <div className="flex gap-1">
          <p>{data.firstName}</p>
          <p>{data.lastName}</p>
        </div>
        <div className="flex items-center justify-end gap-1">
          <MapPin size={16} strokeWidth={2.5} />
          <p className="font-xs">{data.city}</p>
        </div>
      </Label>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Image
              src={
                (session?.user?.image as string) ||
                `https://avatar.vercel.sh/rauchg.svg?text=${data.firstName?.charAt(0)}${data.lastName?.charAt(0)}`
              }
              alt="Profile Image"
              width={75}
              height={75}
              className="size-full rounded-full object-contain"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <SignOutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
