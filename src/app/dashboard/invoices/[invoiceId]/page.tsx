import { InvoiceUpdationForm } from '@/components/forms/EditInvoice';
import { prisma } from '@/lib/prisma';
import { fetchUser } from '@/hooks/hooks';
import { notFound } from 'next/navigation';

interface Params {
  params: Promise<{ invoiceId: string }>;
}
async function getData(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditInvoiceRoute({ params }: Params) {
  const { invoiceId } = await params;
  const session = await fetchUser();
  const data = await getData(invoiceId, session.user?.id as string);

  return <InvoiceUpdationForm data={data} />;
}
