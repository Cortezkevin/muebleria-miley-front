"use client";
import { Notification } from '@/components/ui/Notification';
import { NotificationContext } from '@/context/admin/notifications';
import { Spinner } from '@heroui/spinner';
import { NextPage } from 'next'
import React, { useContext } from 'react'

const NotificationsPage: NextPage = () => {

  const { loadingNotifications, notifications } = useContext(NotificationContext);

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-3xl font-semibold'>Notificaciones</h1>
      <div className='flex flex-col gap-3 items-center'>
        {
          loadingNotifications
          ? <Spinner title='Cargando...' size='lg' />
          : notifications.length === 0
           ? <div className='flex justify-center items-center  py-12'>
              <span className='text-xl'>No hay notificaciones aun</span>
            </div>
           : notifications.map(n => (
              <Notification key={n.id} {...n} />
            ))
        }
      </div>
    </div>
  )
}

export default NotificationsPage