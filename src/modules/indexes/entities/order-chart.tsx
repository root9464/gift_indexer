import { ChartTooltip, type ChartConfig } from '@/components/ui/chart';
import type { Extend } from '@/shared/types/utils';
import { formatDateСharts } from '@/shared/utils/utils';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, type TooltipProps } from 'recharts';

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
    color: '#10b981',
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload, label, chartData }: TooltipProps<number, string> & { chartData: OrderChartProps[] }) => {
  if (active && payload && payload.length) {
    const currentData = payload[0].payload as OrderChartProps;
    const currentClose = currentData.close;

    const currentIndex = chartData.findIndex((item) => item.date === currentData.date);
    const prevClose = currentIndex > 0 ? chartData[currentIndex - 1].close : currentClose;

    const priceChange = currentClose - prevClose;
    const percentChange = (priceChange / prevClose) * 100;
    const isPositive = priceChange >= 0;

    return (
      <div className='w-[230px] rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-xl'>
        <p className='text-xs text-gray-600'>{formatDateСharts(label)}</p>
        <p className='text-sm font-bold text-gray-800'>${currentClose.toFixed(2)}</p>
        <p className={`text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}
          {priceChange.toFixed(2)} ({percentChange.toFixed(2)}%)
        </p>
        <div className='mt-1 grid grid-cols-2 gap-1'>
          <div>
            <p className='text-xs text-gray-500'>Open</p>
            <p className='text-xs font-medium'>${currentData.open.toFixed(2)}</p>
          </div>
          <div>
            <p className='text-xs text-gray-500'>High</p>
            <p className='text-xs font-medium'>${currentData.high.toFixed(2)}</p>
          </div>
          <div>
            <p className='text-xs text-gray-500'>Low</p>
            <p className='text-xs font-medium'>${currentData.low.toFixed(2)}</p>
          </div>
          <div>
            <p className='text-xs text-gray-500'>Volume</p>
            <p className='text-xs font-medium'>{currentData.volume.toLocaleString()}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const OrderChart = ({ chartData }: { chartData: OrderChartProps[] }) => {
  return (
    <div className='h-[160px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart data={chartData} margin={{ top: 5, right: 15, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id='priceGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#10b981' stopOpacity={0.3} />
              <stop offset='100%' stopColor='#10b981' stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id='lineGradient' x1='0' y1='0' x2='1' y2='0'>
              <stop offset='0%' stopColor='#059669' />
              <stop offset='50%' stopColor='#10b981' />
              <stop offset='100%' stopColor='#34d399' />
            </linearGradient>
          </defs>
          <CartesianGrid horizontal={true} vertical={false} stroke='#f3f4f6' strokeWidth={1} strokeDasharray='3 3' />
          <XAxis
            dataKey='date'
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickMargin={8}
            tickCount={5}
            tickFormatter={formatDateСharts}
          />
          <YAxis
            domain={['dataMin - 0.1', 'dataMax + 0.1']}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickMargin={8}
            width={43}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          <ChartTooltip
            content={<CustomTooltip chartData={chartData} />}
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
            strokeWidth={1}
            activeDot={{
              r: 5,
              strokeWidth: 2,
            }}
            animationDuration={1000}
            animationEasing='ease-out'
            name='Close Price'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
