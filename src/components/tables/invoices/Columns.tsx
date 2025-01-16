'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Invoice } from '@/lib/zod';
import { DataTableColumnHeader } from './ColumnHeader';
import { DataTableRowActions } from './RowActions';
import { formatCurrency } from '@/utils/formatCurrency';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="hidden size-0 p-0"
        column={column}
        title="ID"
      />
    ),
    cell: ({ row }) => {
      return <span className="hidden size-0 p-0">{row.getValue('id')}</span>;
    },
  },
  {
    accessorKey: 'invoiceNumber',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex w-full justify-start text-xl"
        column={column}
        title="Invoice ID"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="w-full font-bold">
            {row.getValue('invoiceNumber')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'clientName',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex w-full justify-start"
        column={column}
        title="Customer"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="w-full truncate font-bold">
            {row.getValue('clientName')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex w-full justify-start"
        column={column}
        title="Total"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="">
          ₹<span className="w-24 font-bold">{row.getValue('total')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full"
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <span className="-mr-2 w-24 font-bold">
            <Badge
              variant={
                row.getValue('status') === 'PENDING'
                  ? 'secondary'
                  : 'constructive'
              }
            >
              {row.getValue('status')}
            </Badge>
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full"
        column={column}
        title="Created At"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      const formattedDate = date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      return (
        <div className="flex justify-center">
          <span className="w-28 font-bold">{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
