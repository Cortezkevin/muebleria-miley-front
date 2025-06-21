import { Card, CardHeader, CardBody } from '@heroui/card';
import { NextPage } from 'next'
import React from 'react'
import { ChangePasswordForm } from '@/components/ui/auth/change-password/ChangePasswordForm';

interface PageProps {
  params: Promise<{ token: string }>;
}

const ConfirmChangePasswordPage: NextPage<PageProps> = ({ params }) => {
  const param = React.use(params);
  return (
    <div className='flex items-center justify-center h-full'>
      <Card className='w-[350px] py-2'>
        <CardHeader className='flex flex-col'>
          <h1 className='text-2xl font-semibold text-center'>Actualiza tu Contraseña</h1>
        </CardHeader>
        <CardBody>
          <ChangePasswordForm token={param.token} />
        </CardBody>
      </Card>
    </div>
  )
}

export default ConfirmChangePasswordPage;