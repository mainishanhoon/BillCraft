import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { fetchUser } from '@/hooks/hooks';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';

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
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await fetchUser();
  await getUser(session.user?.id!);

  return (
    <Fragment>
      <Header />
      <PageContainer scrollable>
        <main className="p-2 md:p-3 lg:p-5">{children}</main>
      </PageContainer>
    </Fragment>
  );
}
