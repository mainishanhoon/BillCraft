import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LineChartGraph from './LineChart';
import { prisma } from '@/lib/prisma';
import { fetchUser } from '@/hooks/hooks';

async function getInvoices(userId: string) {
  const rawData = await prisma.invoice.findMany({
    where: {
      status: 'PAID',
      userId: userId,
      createdAt: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  //Group and aggregate data by date
  const aggregatedData = rawData.reduce(
    (acc: { [key: string]: number }, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
      });

      acc[date] = (acc[date] || 0) + curr.total;

      return acc;
    },
    {},
  );
  //Convert to array and from the object
  const transformedData = Object.entries(aggregatedData)
    .map(([date, amount]) => ({
      date,
      amount,
      originalDate: new Date(date + ', ' + new Date().getFullYear()),
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({
      date,
      amount,
    }));

  return transformedData;
}

export async function RevenueGraph() {
  const session = await fetchUser();
  const data = await getInvoices(session.user?.id as string);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Paid Invoices</CardTitle>
        <CardDescription className="text-xs font-medium">
          Invoices which have been paid in the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LineChartGraph data={data} />
      </CardContent>
    </Card>
  );
}
