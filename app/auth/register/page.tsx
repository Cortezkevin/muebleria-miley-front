import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import { Link } from '@heroui/link'
import { NextPage } from 'next'
import React from 'react'
import { RegisterForm } from '@/components/ui/auth/register/RegisterForm';

const RegisterPage: NextPage = () => {
  return (
    <div className='flex items-center justify-center h-full mt-6'>
      <Card className='w-[350px] py-2'>
        <CardHeader className='flex flex-col'>
          <h1 className='text-2xl font-semibold text-center'>Crear una Cuenta</h1>
        </CardHeader>
        <CardBody>
          <RegisterForm />
        </CardBody>
        <CardFooter>
          <div className='flex items-center justify-center w-full gap-2'>
            <span className='text-sm'>¿Tienes cuenta?</span>
            <Link href="/auth/login" color='primary' size='sm'>
              Inicia Sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RegisterPage