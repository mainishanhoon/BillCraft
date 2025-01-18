import { Suspense } from 'react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import EmptyState from '@/components/EmptyState';
// import { InvoiceGraph } from '@/components/InvoiceGraph';
// import { RecentInvoices } from '@/components/RecentInvoices';
import { prisma } from '@/lib/prisma';
import { fetchUser } from '@/hooks/hooks';
import { Skeleton } from '@/components/ui/skeleton';

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  return data;
}

export default async function DashboardRoute() {
  const session = await fetchUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No invoices found"
          description="Create an invoice to see it right here"
          text="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <Suspense fallback={<Skeleton className="h-full w-full flex-1" />}>
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5'>
          <DashboardCard />
          </div >
          <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
            {/* <InvoiceGraph />
            <RecentInvoices /> */}
          </div>
        </Suspense>
      )}
    </>
  );
}
