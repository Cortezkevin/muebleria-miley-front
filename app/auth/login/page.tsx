import { Button } from '@heroui/button'
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card'
import { Input } from '@heroui/input'
import { Link } from '@heroui/link'
import { NextPage } from 'next'
import React from 'react'

const LoginPage: NextPage = () => {
  return (
    <div className='flex items-center justify-center h-full'>
      <Card className='w-[350px] py-2'>
        <CardHeader className='flex flex-col'>
          <h1 className='text-2xl font-semibold text-center'>Iniciar Sesión</h1>
        </CardHeader>
        <CardBody>
          <form action="" className='flex flex-col gap-3'>
            <Input variant='bordered' label="Email" />
            <Input variant='bordered' label="Contraseña" />
            <div className='self-end px-2'>
              <Link href="/auth/confirm" color='primary' size='sm'>
                Olvide mi contraseña
              </Link>
            </div>
            <Button color='primary' type='submit' size='lg'>
              Confirmar
            </Button>
          </form>
        </CardBody>
        <CardFooter>
          <div className='flex items-center justify-center w-full gap-2'>
            <span className='text-sm'>¿No tienes cuenta?</span>
            <Link href="/auth/register" color='primary' size='sm'>
              Registrate
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage