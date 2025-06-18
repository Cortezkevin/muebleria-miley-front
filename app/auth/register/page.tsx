"use client";

import { Button } from '@heroui/button'
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import { Input } from '@heroui/input'
import { Link } from '@heroui/link'
import { NextPage } from 'next'
import * as yup from "yup";
import Cookies from 'js-cookie';
import { useFormik } from "formik";
import React from 'react'
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/auth';
import { AddressDTO, CartDTO } from '@/types';

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Campo requerido"),
  lastName: yup
    .string()
    .required("Campo requerido"),
  email: yup
    .string()
    .email("Ingrese un email valido")
    .required("Campo requerido"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener 8 caracteres como minimo")
    .required("Campo requerido"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required("Campo requerido"),
});

const RegisterPage: NextPage = () => {

  const router = useRouter();
  const { onRegister } = React.useContext( AuthContext );
  const [isLoading, setIsLoading] = React.useState(false);

  const { handleSubmit, values, handleChange, handleBlur, isValid, errors, touched } =
    useFormik<RegisterFormInputs>({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validateOnChange: true,
      isInitialValid: false,
      onSubmit: async ({ firstName, lastName, email, password }) => {
        const cart = JSON.parse(Cookies.get("cart") || 'null') as CartDTO;
        const address = JSON.parse(Cookies.get("address") || "null") as AddressDTO;
        setIsLoading(true);
        const result = await onRegister({
          email,
          password,
          firstName,
          lastName,
          isAdmin: false,
          memoryCart: cart ? {
            itemList: cart.cartItems.map(i => {
              return {
                amount: i.amount,
                productId: i.product_id
              }
            }),
            shippingCost: cart.shippingCost
          } : undefined,
          memoryAddress: address ? {
            ...address
          } : undefined
        });
        if( result ){
          router.push('/');
        }
        setIsLoading(false);
      },
      validationSchema: schema,
    });

  return (
    <div className='flex items-center justify-center h-full mt-6'>
      <Card className='w-[350px] py-2'>
        <CardHeader className='flex flex-col'>
          <h1 className='text-2xl font-semibold text-center'>Crear una Cuenta</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={ handleSubmit } className='flex flex-col gap-3'>
            <Input
              isRequired
              variant='bordered' 
              label="Nombres"
              onChange={ handleChange("firstName")}
              onBlur={ handleBlur("firstName")}
              value={ values.firstName }
              isInvalid={ !!errors.firstName && touched.firstName }
              errorMessage={ touched.firstName && errors.firstName }
            />
            <Input
              isRequired
              variant='bordered' 
              label="Apellidos"
              onChange={ handleChange("lastName")}
              onBlur={ handleBlur("lastName")}
              value={ values.lastName }
              isInvalid={ !!errors.lastName && touched.lastName }
              errorMessage={ touched.lastName && errors.lastName }
            />
            <Input 
              isRequired
              variant='bordered'
              label="Email"
              onChange={ handleChange("email")}
              onBlur={ handleBlur("email")}
              value={ values.email }
              isInvalid={ !!errors.email && touched.email }
              errorMessage={ touched.email && errors.email }
            />
            <Input
              isRequired
              variant='bordered' 
              label="Contraseña"
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
            <Button color='primary' type='submit' size='lg' isDisabled={ !isValid } isLoading={ isLoading }>
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