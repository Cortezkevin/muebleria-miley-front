"use client";

import { Button } from '@heroui/button'
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import { Input } from '@heroui/input'
import { Link } from '@heroui/link'
import { NextPage } from 'next'
import React from 'react'
import * as yup from "yup";
import { useFormik } from "formik";
import { sendConfirmationEmail } from '@/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type ChangePasswordFormInputs = {
  email: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un email valido")
    .required("Campo requerido")
});


const ConfirmPage: NextPage = () => {

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const { handleSubmit, values, handleChange, isValid, errors } =
    useFormik<ChangePasswordFormInputs>({
      initialValues: {
        email: ""
      },
      validateOnChange: true,
      isInitialValid: false,
      onSubmit: async ({ email }) => {
        setIsLoading(true);
        const response = await sendConfirmationEmail( email );
        if( response?.success ){
          router.push("/auth/login");
          toast.success( response.message );
        }else {
          toast.error( response?.message || "Ocurrio un error");
        }
        setIsLoading(false);
      },
      validationSchema: schema,
    });

  return (
    <div className='flex items-center justify-center h-full'>
      <Card className='w-[350px] py-2'>
        <CardHeader className='flex flex-col'>
          <h1 className='text-2xl font-semibold text-center'>Enviar Correo de Confirmación</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <Input 
              isRequired
              variant='bordered'
              label="Email"
              onChange={ handleChange("email")}
              value={ values.email }
              isInvalid={ !!errors.email }
              errorMessage={ errors.email }
            />
            <Button color='primary' type='submit' size='lg' isDisabled={ !isValid } isLoading={ isLoading }>
              Enviar
            </Button>
          </form>
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