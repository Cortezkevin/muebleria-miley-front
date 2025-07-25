import { formatDate } from '@/utils/utils';
import { Divider } from '@heroui/divider';
import React, { FC } from 'react'

interface Props {
  id: string;
  title: string;
  body: string;
  date: string;
}

export const Notification: FC<Props> = ({ id, body, date, title }) => {
  return (
    <div className='flex flex-col w-[700px] hover:bg-default-200 transition-all duration-250 cursor-pointer rounded-md'>
      <div className='flex flex-col gap-2 p-3'>
        <div className='flex justify-between items-center'>
          <span className='text-lg font-semibold'>{title}</span>
          <span className='text-xs text-default-500'>{formatDate(date)}</span>
        </div>
        <span className='text-md'>{body}</span>
      </div>
      <Divider />
    </div>
  )
}