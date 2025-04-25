import { Button } from '@heroui/button';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { Input } from '@heroui/input';
import { NextPage } from 'next'
import React from 'react'

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ChangePassword: NextPage<PageProps> = ({ searchParams }) => {
  return (
    <div className='flex items-center justify-center h-full'>
      <Card className='w-[350px] py-2'>
        <CardHeader className='flex flex-col'>
          <h1 className='text-2xl font-semibold text-center'>Actualiza tu Contraseña</h1>
        </CardHeader>
        <CardBody>
          <form action="" className='flex flex-col gap-3'>
            <Input variant='bordered' label="Nueva Contraseña" />
            <Input variant='bordered' label="Confirmar Contraseña" />
            <Button color='primary' type='submit' size='lg'>
              Confirmar
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default ChangePassword