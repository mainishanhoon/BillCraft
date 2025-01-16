'use client';

import { RefreshCcw } from 'lucide-react';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { category, status } from '@/constants/sort';
import { DataTableFacetedFilter } from './FacetedFilter';
import { CalendarDatePicker } from './CalendarDatePicker';
import { useState } from 'react';
import { DataTableViewOptions } from './ViewOptions';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    // Filter table data based on selected date range
    table.getColumn('createdAt')?.setFilterValue([from, to]);
  };

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Name..."
          value={
            (table.getColumn('clientName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) => {
            table.getColumn('clientName')?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={status}
          />
        )}

        {isFiltered && (
          <Button
            variant="outline"
            onClick={() => table.resetColumnFilters()}
            className="h-8 border-input bg-background px-2 hover:bg-muted-foreground/30 lg:px-3"
          >
            Reset
            <RefreshCcw strokeWidth={2.5} className="ml-2 size-4" />
          </Button>
        )}
        <CalendarDatePicker
          date={dateRange}
          onDateSelect={handleDateSelect}
          className="h-8 w-[250px] border-dashed border-input"
          variant="outline"
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
