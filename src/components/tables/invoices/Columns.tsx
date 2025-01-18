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
      <DataTableColumnHeader className="sr-only" column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return <span className="sr-only">{row.getValue('id')}</span>;
    },
  },
  {
    accessorKey: 'invoiceNumber',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="border-r border-dashed text-center"
        column={column}
        title="Invoice ID"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="border-r border-dotted text-center">
          <span className="font-bold">{row.getValue('invoiceNumber')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'clientName',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="border-r border-dashed text-center"
        column={column}
        title="Customer"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="border-r border-dotted text-center">
          <span className="font-bold">{row.getValue('clientName')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'currency',
    header: ({ column }) => (
      <DataTableColumnHeader className="sr-only" column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return <span className="sr-only">{row.getValue('currency')}</span>;
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="border-r border-dashed text-center"
        column={column}
        title="Total"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="border-r border-dotted text-center">
          <span className="font-bold">
            {formatCurrency({
              amount: row.getValue('total'),
              currency: row.getValue('currency'),
            })}
          </span>
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
        className="border-r border-dashed text-center"
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="border-r border-dotted text-center">
          <span className="font-bold">
            <Badge
              variant={
                row.getValue('status') === 'PENDING'
                  ? 'secondary'
                  : 'constructive'
              }
              className="rounded-sm"
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
        className="border-r border-dashed text-center"
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
        <div className="border-r border-dotted text-center">
          <span className="font-bold">{formattedDate}</span>
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
