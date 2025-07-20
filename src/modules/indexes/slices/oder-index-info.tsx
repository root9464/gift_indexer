type OrderIndexInfoProps = {
  icon: string;
  title: string;
  mcap: number;
};

export const OrderIndexInfo = ({ icon, title, mcap }: OrderIndexInfoProps) => {
  return (
    <div className='flex items-center justify-between px-5 pt-2'>
      <div className='flex items-center gap-2'>
        <img src={icon} alt={title} className='size-8 items-center justify-center rounded-lg' />
        <div className='flex-1'>
          <div className='text-sm font-bold text-gray-800'>{title}</div>
          <div className='text-xs text-gray-500'>Mcap • ${mcap}</div>
        </div>
      </div>
    </div>
  );
};
