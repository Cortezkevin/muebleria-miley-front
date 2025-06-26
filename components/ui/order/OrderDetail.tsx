"use client";

import { CartItemDTO } from '@/types';
import { Button } from '@heroui/button';
import { Image } from '@heroui/image';
import React, { FC } from 'react'

interface Props {
  image: string;
  name: string;
  amount: number;
  price: string;
  total: string;
  modeSoloImage?:boolean;
}


export const OrderDetail: FC<Props> = ({ amount, image, name, price, total, modeSoloImage=false }) => {
  return (
    <div className='flex items-center min-w-[300px]'>
      <div className='flex gap-3 items-center'>
        <div className='min-w-[140px]'>
          <Image
            className='rounded-lg'
            src={ image }
            alt=''
            width={ 140 }
            height={ 90 }
          /> 
        </div>
        <div className='flex flex-col gap-2 h-[90px] justify-center'>
          <h2 className='uppercase text-sm lg:text-md font-semibold'>{ name }</h2>
          <div className='flex items-center gap-3'>
            <span className='text-xs lg:text-sm'>Cantidad: </span>
            <span className='font-semibold text-xs lg:text-sm'>{ amount }</span>
          </div>
        </div>
      </div>
     {
      modeSoloImage &&
      (
        <div className='flex justify-around w-full'>
          <div className='flex flex-col items-center pl-6'>
            <span className='font-semibold text-xs lg:text-sm'>Precio: </span>
            <span className='text-xs lg:text-sm'>S/. { price }</span>
          </div>
          <div className='text-xs lg:text-sm flex flex-col items-center'>
            <span className='font-semibold text-xs lg:text-sm'>Total: </span>
            <span>S/. { total }</span>
          </div>
        </div>
      )
     }
    </div>
  )
}
