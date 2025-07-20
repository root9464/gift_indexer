import { cn } from '@/shared/lib/utils';
import { useState, type ComponentType } from 'react';
import { type OrderChartProps } from '../entities/order-chart';

const timeFrames = [
  { label: '1D', days: 1 },
  { label: '7D', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: 'All', days: Infinity },
] as const;

type TimeFrame = (typeof timeFrames)[number]['label'];

const filterDataByTimeFrame = (data: OrderChartProps[], timeFrame: TimeFrame): OrderChartProps[] => {
  const days = timeFrames.find((tf) => tf.label === timeFrame)?.days ?? Infinity;
  if (days === Infinity) return data;
  const latestDate = new Date(data[data.length - 1].date);
  const startDate = new Date(latestDate);
  startDate.setDate(latestDate.getDate() - days);
  return data.filter((item) => new Date(item.date) >= startDate);
};
type OrderChartWithTimeFrameProps = {
  initialData: OrderChartProps[];
  Chart: ComponentType<{ chartData: OrderChartProps[] }>;
};

export const OrderChartWithTimeFrame = ({ initialData, Chart }: OrderChartWithTimeFrameProps) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('All');
  const filteredData = filterDataByTimeFrame(initialData, timeFrame);
  return (
    <div className='w-full'>
      <Chart chartData={filteredData} />
      <div className='mx-3 mt-2 flex justify-center gap-1 rounded-2xl bg-gray-100 p-0.5'>
        {timeFrames.map(({ label }) => (
          <button
            key={label}
            className={cn(
              'flex-1 rounded-full py-1 text-xs font-medium text-gray-500 transition-all duration-200 hover:bg-gray-50 hover:text-gray-700',
              timeFrame === label && 'bg-white text-gray-700',
            )}
            onClick={() => setTimeFrame(label)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
