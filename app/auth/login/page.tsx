import { LoginForm } from '@/components/ui/auth/login/LoginForm';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card'
import { Link } from '@heroui/link'
import { NextPage } from 'next'
import React from 'react'

interface PageProps {
  searchParams: Promise<Record<string, string>>;
}

const LoginPage: NextPage<PageProps> = ({ searchParams }) => {

  const params = React.use(searchParams);

  return (
    <div className='flex items-center justify-center h-full mt-6'>
      <Card className='w-[350px] py-2'>
        <CardHeader className='flex flex-col'>
          <h1 className='text-2xl font-semibold text-center'>Iniciar Sesión</h1>
        </CardHeader>
        <CardBody>
          <LoginForm redirectPage={params.prevPage} />
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