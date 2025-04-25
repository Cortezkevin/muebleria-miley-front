import { Button } from '@heroui/button'
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import { Input } from '@heroui/input'
import { Link } from '@heroui/link'
import { NextPage } from 'next'
import React from 'react'

const RegisterPage: NextPage = () => {
  return (
    <div className='flex items-center justify-center h-full'>
      <Card className='w-[350px] py-2'>
        <CardHeader className='flex flex-col'>
          <h1 className='text-2xl font-semibold text-center'>Crear una Cuenta</h1>
        </CardHeader>
        <CardBody>
          <form action="" className='flex flex-col gap-3'>
            <Input variant='bordered' label="Email" />
            <Input variant='bordered' label="Contraseña" />
            <Input variant='bordered' label="Telefono" />
            <Input variant='bordered' label="Confirmar Contraseña" />
            <Button color='primary' type='submit' size='lg'>
              Confirmar
            </Button>
          </form>
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