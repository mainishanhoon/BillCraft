import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { fetchUser } from '@/hooks/hooks';
import { Fragment } from 'react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await fetchUser();

  return (
    <div>
      <Header />
      <PageContainer scrollable>
        <main className="p-2 md:p-3 lg:p-5">{children}</main>
      </PageContainer>
    </div>
  );
}
