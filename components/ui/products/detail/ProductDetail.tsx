"use client";
import { Card, CardBody, CardHeader } from '@heroui/card'
import React, { FC } from 'react'
import { ImagesSelector } from './ImagesSelector';

interface Props {
  images: string[];
}

export const ProductDetail: FC<Props> = ({ images }) => {
  return (
    <Card>
        <CardHeader>Detalles del Producto</CardHeader>
        <CardBody className='flex flex-row'>
          <ImagesSelector images={images} />
          <div className='h-[600px]'>
            
          </div>
        </CardBody>
    </Card>
  )
}
