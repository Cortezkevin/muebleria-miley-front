"use client";

import { Button } from '@heroui/button';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { Input } from '@heroui/input';
import { NextPage } from 'next'
import React from 'react'
import * as yup from "yup";
import Cookies from 'js-cookie';
import { useFormik } from "formik";
import { CartDTO } from "@/types";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";

interface PageProps {
  params: URLSearchParams;
}

type ChangePasswordFormInputs = {
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, "La contraseña debe tener 8 caracteres como minimo")
    .required("Campo requerido"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required("Campo requerido"),
});

export default function ConfirmChangePasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const param = React.use(params as any);
  const router = useRouter();
  const { onChangePassword } = React.useContext( AuthContext );
  const [isLoading, setIsLoading] = React.useState(false);

  const { handleSubmit, values, handleChange, handleBlur, isValid, errors, touched } =
    useFormik<ChangePasswordFormInputs>({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      validateOnChange: true,
      isInitialValid: false,
      onSubmit: async ({ password, confirmPassword }) => {
        setIsLoading(true);
        const result = await onChangePassword(password, confirmPassword, (param as any).token );
        if( result ){
          router.push('/auth/login');
        }
        setIsLoading(false);
      },
      validationSchema: schema,
    });


  return (
    <div className='flex items-center justify-center h-full'>
      <Card className='w-[350px] py-2'>
        <CardHeader className='flex flex-col'>
          <h1 className='text-2xl font-semibold text-center'>Actualiza tu Contraseña</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={ handleSubmit } className='flex flex-col gap-3'>
            <Input 
              isRequired
              variant='bordered' 
              label="Nueva Contraseña"
              onChange={ handleChange("password")}
              onBlur={ handleBlur("password")}
              value={ values.password }
              isInvalid={ !!errors.password && touched.password }
              errorMessage={ touched.password && errors.password }
            />
            <Input
              isRequired
              variant='bordered' 
              label="Confirmar Contraseña"
              onChange={ handleChange("confirmPassword")}
              onBlur={ handleBlur("confirmPassword")}
              value={ values.confirmPassword }
              isInvalid={ !!errors.confirmPassword && touched.confirmPassword }
              errorMessage={ touched.confirmPassword && errors.confirmPassword }
            />
            <Button color='primary' type='submit' size='lg' isDisabled={ !isValid } isLoading={isLoading}>
              Confirmar
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}