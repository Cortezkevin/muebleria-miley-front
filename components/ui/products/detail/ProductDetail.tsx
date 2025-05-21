"use client";
import { Card, CardBody, CardHeader } from '@heroui/card'
import React, { FC } from 'react'
import { ImagesSelector } from './ImagesSelector';
import { CalificationStars } from '../CalificationStars';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';

interface Props {
  name: string;
  images: string[];
  category: string;
  subCategory: string;
}

export const ProductDetail: FC<Props> = ({name, category, subCategory, images }) => {
  return (
    <Card>
        <CardHeader>Detalles del Producto</CardHeader>
        <CardBody className='flex flex-row gap-5 p-6'>
          <ImagesSelector images={images} />
          <div className='h-[600px] py-4 px-6'>
            <div className='flex flex-col gap-4'>
              <div>
                <div className='flex gap-3 uppercase text-default-600 font-sm'>
                <span>{category}</span>
                -
                <span>{subCategory}</span></div>
                <h4 className='text-xl font-semibold'>{name}</h4>
              </div>
              <div className='flex gap-2'>
                <CalificationStars stars={5}  />
                <Link underline="always" color='foreground' className='cursor-pointer'>5 (2)</Link>
              </div>
            </div>
          </div>
        </CardBody>
    </Card>
  )
}
