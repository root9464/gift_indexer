import type { ChartConfig } from '@/components/ui/chart';
import type { Extend } from '@/shared/types/utils';
import { formatDateСharts } from '@/shared/utils/utils';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type OHLCV = {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

type OrderChartProps = Extend<OHLCV, { date: string }>;

const chartConfig = {
  desktop: {
    label: 'Close Price',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export const OrderChart = ({ chartData }: { chartData: OrderChartProps[] }) => {
  return (
    <div className='h-[300px] w-full'>
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}>
          <CartesianGrid strokeDasharray='3 3' opacity={0.1} />
          <XAxis dataKey='date' tickFormatter={formatDateСharts} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              borderRadius: 'var(--radius)',
            }}
            formatter={(value: number, name: string) => [value, name === 'close' ? 'Close Price' : name]}
            labelFormatter={(label) => `Date: ${formatDateСharts(label)}`}
            itemSorter={(item) => {
              const order = ['close', 'open', 'high', 'low', 'volume'];
              return order.indexOf(item.dataKey as string) - order.indexOf(item.dataKey as string);
            }}
          />
          <Area
            type='monotone'
            dataKey='close'
            stroke={chartConfig.desktop.color}
            fill={chartConfig.desktop.color}
            fillOpacity={0.1}
            name='Close Price'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
