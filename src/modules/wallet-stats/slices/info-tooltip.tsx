import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const InfoTooltip = () => (
  <div className='flex size-4 items-center justify-center rounded-full bg-gray-300'>
    <Tooltip>
      <TooltipTrigger>?</TooltipTrigger>
      <TooltipContent tooltipClassName='bg-gray-200 fill-gray-200' className='max-w-[180px] bg-gray-200 text-wrap text-gray-500' side='right'>
        <p>Может быть погрешность в балансе</p>
      </TooltipContent>
    </Tooltip>
  </div>
);
