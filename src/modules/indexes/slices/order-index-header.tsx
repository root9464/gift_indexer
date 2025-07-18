import { DrawerClose, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { XIcon } from 'lucide-react';

export const OrderIndexHeader = () => {
  return (
    <DrawerHeader className='relative flex flex-col'>
      <DrawerTitle className='-ml-3 flex flex-row items-center gap-2'>
        <div className='flex items-baseline rounded-lg px-2 py-1'>
          <span className='mr-1 flex items-center text-sm text-red-500'>▼</span>
          <span className='mr-1 font-mono text-xl font-bold tracking-wide text-green-500'>$</span>
          <span className='font-mono text-xl font-bold tracking-wide text-green-500'>804.20</span>
        </div>
        <span className='rounded-lg bg-red-100 px-2 py-1 text-xs font-medium text-red-500'>-9.0%</span>
      </DrawerTitle>
      <DrawerDescription className='flex flex-row items-center gap-2'>
        <span className='text-xs text-gray-500'>Last Price</span>
        <span className='text-xs text-gray-500'>$804.20</span>
      </DrawerDescription>

      <DrawerClose className='absolute top-4 right-4'>
        <XIcon className='h-4 w-4 text-gray-500' />
      </DrawerClose>
    </DrawerHeader>
  );
};
