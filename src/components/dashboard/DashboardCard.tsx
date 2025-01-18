import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Fragment, ReactNode } from 'react';
import {
  BadgeIndianRupee,
  HandCoins,
  ReceiptText,
  SquareLibrary,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { fetchUser } from '@/hooks/hooks';
import { formatCurrency } from '@/utils/formatCurrency';

interface DashboardCardProps {
  title: string;
  amount: string | number;
  description: string;
  icon: ReactNode;
}

async function getData(userId: string) {
  const [data, openInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: userId,
        createdAt: {
          lte: new Date(),
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
      select: {
        total: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: 'PENDING',
      },
      select: {
        id: true,
      },
    }),

    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: 'PAID',
      },
      select: {
        id: true,
      },
    }),
  ]);

  return {
    data,
    openInvoices,
    paidInvoices,
  };
}

function DashboardCard({
  title,
  amount,
  description,
  icon,
}: DashboardCardProps) {
  return (
    <Card className="relative w-full sm:max-w-sm">
      <CardHeader className="relative z-10 space-y-0">
        <CardTitle className="text-xl tracking-wide">{title}</CardTitle>
        <CardDescription className="font-mont text-xs font-medium">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <Label className="rounded-2xl bg-muted-foreground/20 px-3 py-1 font-sans text-2xl font-bold tracking-wider">
          <span>{amount.toLocaleString()}</span>
        </Label>
      </CardContent>
      <div className="absolute left-2/3 top-1/2 -translate-y-1/2 transform rounded-full bg-primary/20 p-3">
        {icon}
      </div>
    </Card>
  );
}

export default async function StatsCard() {
  const session = await fetchUser();
  const { data, openInvoices, paidInvoices } = await getData(
    session.user?.id as string,
  );

  return (
    <Fragment>
      <DashboardCard
        title="Total Revenue"
        amount={formatCurrency({
          amount: data.reduce((acc, invoice) => acc + invoice.total, 0),
          currency: 'INR',
        })}
        description="Since last 30 Days"
        icon={
          <BadgeIndianRupee
            size={45}
            strokeWidth={2}
            color="hsl(var(--primary))"
          />
        }
      />
      <DashboardCard
        title="Total Invoices"
        amount={data.length}
        description="Total Invoices Issued"
        icon={
          <ReceiptText
            size={45}
            strokeWidth={2.5}
            color="hsl(var(--primary))"
            className="p-0.5"
          />
        }
      />
      <DashboardCard
        title="Paid Invoices"
        amount={paidInvoices.length}
        description="Total paid Invoices"
        icon={
          <HandCoins
            size={45}
            strokeWidth={2.5}
            color="hsl(var(--primary))"
            className="p-0.5"
          />
        }
      />
      <DashboardCard
        title="Open Invoices"
        amount={openInvoices.length}
        description="Total unpaid Invoices"
        icon={
          <SquareLibrary
            size={45}
            strokeWidth={2}
            color="hsl(var(--primary))"
          />
        }
      />
    </Fragment>
  );
}
