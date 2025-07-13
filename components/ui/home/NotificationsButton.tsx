"use client";
import { Badge } from '@heroui/badge';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'

interface Props {
  notificationsCount?: number;
}

export const NotificationsButton: FC<Props> = ({ notificationsCount }) => {

  const router = useRouter();

  const handleClick = () => {
    router.push('/notifications');
  }

  return (
    <Badge color="primary" size='sm' content={ notificationsCount ? (notificationsCount === 0 ? undefined : notificationsCount): undefined } variant='solid' className='border-none'>
      <i onClick={handleClick} className="fa-solid fa-bell text-xl cursor-pointer hover:opacity-80 text-default-500"></i>
    </Badge>
  )
}
