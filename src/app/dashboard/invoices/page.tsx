import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CircleFadingPlus, Table } from 'lucide-react';
import Link from 'next/link';

export default function InvoicesRoute() {
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
      <Card>
        <CardHeader className="sr-only">
          <CardTitle className="text-xl">Invoices</CardTitle>
          <CardDescription>Manage your invoices right here</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </section>
  );
}
