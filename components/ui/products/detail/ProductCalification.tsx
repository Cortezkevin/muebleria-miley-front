"use client";
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Divider } from '@heroui/divider';
import React from 'react'
import { CalificationDetails } from './CalificationDetails';
import { CalificationStars } from '../CalificationStars';
import { Button } from '@heroui/button';
import { Comment } from './Comment';

export const ProductCalification = () => {
  return (
    <Card className='p-4'>
      <CardHeader className='flex flex-col gap-8 items-start'>
        <h3 className='text-xl font-semibold'>Comentarios de este Producto</h3>
        <Divider className='bg-default-500 h-[2px]' />
      </CardHeader>
      <CardBody className='flex flex-col gap-8'>
        <div className='w-full flex gap-5 justify-arround items-center'>
          <CalificationDetails />
          <Button color='warning' variant='ghost' className='w-[450px]' size='lg'>Califica este Producto: <CalificationStars /></Button>
        </div>
        <div className='flex flex-wrap gap-3 items-center justify-center'>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </CardBody>
    </Card>
  )
}
