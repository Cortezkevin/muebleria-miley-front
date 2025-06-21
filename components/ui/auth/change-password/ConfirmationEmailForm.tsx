"use client";

import React from 'react'
import * as yup from "yup";
import { useRouter } from 'next/navigation';
import { sendConfirmationEmail } from '@/api';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

type ChangePasswordFormInputs = {
  email: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un email valido")
    .required("Campo requerido")
});

export const ConfirmationEmailForm = () => {
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
        const response = await sendConfirmationEmail(email);
        if (response?.success) {
          router.push("/auth/login");
          toast.success(response.message);
        } else {
          toast.error(response?.message || "Ocurrio un error");
        }
        setIsLoading(false);
      },
      validationSchema: schema,
    });


  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <Input
        isRequired
        variant='bordered'
        label="Email"
        onChange={handleChange("email")}
        value={values.email}
        isInvalid={!!errors.email}
        errorMessage={errors.email}
      />
      <Button color='primary' type='submit' size='lg' isDisabled={!isValid} isLoading={isLoading}>
        Enviar
      </Button>
    </form>
  )
}
