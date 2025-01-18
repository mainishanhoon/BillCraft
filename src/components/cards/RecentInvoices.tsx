import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { fetchUser } from '@/hooks/hooks';
import { formatCurrency } from '@/utils/formatCurrency';
import { CurrencySign } from '@/types/types';
async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      total: true,
      currency: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 7,
  });

  return data;
}

export async function RecentInvoices() {
  const session = await fetchUser();
  const data = await getData(session.user?.id as string);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
        <CardDescription className="text-xs font-medium">
          The 7 Most Recent Payments.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {data.map((item) => (
          <div
            className="flex items-center gap-2 rounded-xl bg-background p-2 md:gap-4 md:p-4"
            key={item.id}
          >
            <Avatar className="hidden size-9 sm:flex">
              <AvatarFallback className="font-medium">
                {item.clientName?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="leadin-none text-sm font-medium">
                {item.clientName}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.clientEmail}
              </p>
            </div>
            <div className="ml-auto text-nowrap text-xs font-medium">
              +
              {formatCurrency({
                amount: item.total,
                currency: item.currency as CurrencySign,
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
