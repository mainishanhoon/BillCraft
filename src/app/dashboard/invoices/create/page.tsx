import { InvoiceCreationForm } from '@/components/forms/CreateInvoice';
import { prisma } from '@/lib/prisma';
import { fetchUser } from '@/hooks/hooks';
import { notFound } from 'next/navigation';

async function getUserData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      state: true,
      city: true,
      street: true,
      pincode: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function InvoiceCreationRoute() {
  const session = await fetchUser();
  const data = await getUserData(session.user?.id as string);

  return <InvoiceCreationForm data={data} />;
}
