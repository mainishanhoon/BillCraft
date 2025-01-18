import { Suspense } from 'react';
import DashboardCard from '@/components/cards/DashboardCard';
import EmptyState from '@/components/EmptyState';
import { RecentInvoices } from '@/components/cards/RecentInvoices';
import { prisma } from '@/lib/prisma';
import { fetchUser } from '@/hooks/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { RevenueGraph } from '@/components/graphs/RevenueGraph';

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
          title="No Invoices Found"
          description="Create an Invoice to see it right here"
          text="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <Suspense fallback={<Skeleton className="h-full w-full flex-1" />}>
          <div className="grid grid-rows-[auto,auto] gap-2 md:gap-3 lg:gap-5">
            <div className="grid gap-2 sm:grid-cols-2 md:gap-3 lg:grid-cols-4 lg:gap-5">
              <DashboardCard />
            </div>
            <div className="grid gap-2 md:gap-3 lg:grid-cols-3 lg:gap-5">
              <div className="lg:col-span-2">
                <RevenueGraph />
              </div>
              <RecentInvoices />
            </div>
          </div>
        </Suspense>
      )}
    </>
  );
}
