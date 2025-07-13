"use client"
import { ProfileContext } from '@/context/profile';
import { useAuth } from '@/hooks/useAuth';
import React, { useContext } from 'react'

const page = () => {
  const { accessType } = useAuth();
  const { personal } = useContext(ProfileContext);

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='flex flex-col'>
        <h1 className='text-4xl font-semibold'>Bienvenido de nuevo</h1>
        { personal && (
          <div className='flex gap-2 text-xl'>
            <h2 className='font-semibold'>{ accessType }</h2>
            - 
            <h2>{ personal.firstName + " " + personal.lastName}</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default page