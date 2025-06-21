import { ConfirmationEmailForm } from '@/components/ui/auth/change-password/ConfirmationEmailForm';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import { Link } from '@heroui/link'
import { NextPage } from 'next'
import React from 'react'

const ConfirmPage: NextPage = () => {
  return (
    <div className='flex items-center justify-center h-full'>
      <Card className='w-[350px] py-2'>
        <CardHeader className='flex flex-col'>
          <h1 className='text-2xl font-semibold text-center'>Enviar Correo de Confirmación</h1>
        </CardHeader>
        <CardBody>
          <ConfirmationEmailForm />
        </CardBody>
        <CardFooter>
          <div className='flex items-center justify-center w-full gap-2'>
            <span className='text-sm'>¿Recordaste tu contraseña?</span>
            <Link href="/auth/login" color='primary' size='sm'>
              Inicia Sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ConfirmPage