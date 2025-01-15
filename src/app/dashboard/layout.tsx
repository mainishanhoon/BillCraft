import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { fetchUser } from '@/hooks/hooks';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Header />
      <PageContainer scrollable>
        <main className="p-2 md:p-3 lg:p-5">{children}</main>
      </PageContainer>
    </Fragment>
  );
}
