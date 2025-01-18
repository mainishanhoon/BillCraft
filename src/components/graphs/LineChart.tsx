'use client';

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface LineChartProps {
  data: {
    date: string;
    amount: number;
  }[];
}

export default function LineChartGraph({ data }: LineChartProps) {
  return (
    <ChartContainer
      config={{
        amount: {
          label: 'Amount',
          color: 'hsl(var(--primary))',
        },
      }}
      className="rounded-2xl bg-background pr-4 pt-4 font-bold lg:pr-6 lg:pt-6"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="hsl(var(--primary))"
            strokeWidth={2.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
