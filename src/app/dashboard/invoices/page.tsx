import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { CircleFadingPlus, Table } from 'lucide-react';
import Link from 'next/link';
import { columns } from '@/components/tables/invoices/Columns';
import { DataTable } from '@/components/tables/invoices/DataTable';

async function getData() {
  const data = await prisma.invoice.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return data;
}

export default async function InvoicesRoute() {
  const data = await getData();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Table size={30} strokeWidth={2.5} />
          <h1 className="font-jura text-2xl font-bold tracking-wide">
            Invoices
          </h1>
        </div>
        <Button
          className="flex items-center gap-x-2 font-jura font-black text-white"
          asChild
        >
          <Link href="/dashboard/invoices/create">
            <CircleFadingPlus size={20} strokeWidth={3} />
            <p>Create Invoice</p>
          </Link>
        </Button>
      </div>
      <Card className="pt-6">
        <CardHeader className="sr-only">
          <CardTitle className="text-xl">Invoices</CardTitle>
          <CardDescription>Manage your invoices right here</CardDescription>
        </CardHeader>
        <CardContent className="font-jura font-bold">
          <DataTable data={data} columns={columns} />
        </CardContent>
      </Card>
    </section>
  );
}
