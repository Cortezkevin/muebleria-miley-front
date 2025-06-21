"use client";

import { AuthContext } from '@/context';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'
import * as yup from "yup";

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

interface Props {
  token: string;
}

export const ChangePasswordForm: FC<Props> = ({ token }) => {
  const router = useRouter();
  const { onChangePassword } = React.useContext(AuthContext);
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
        const result = await onChangePassword(password, confirmPassword, token);
        if (result) {
          router.push('/auth/login');
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
        label="Nueva Contraseña"
        onChange={handleChange("password")}
        onBlur={handleBlur("password")}
        value={values.password}
        isInvalid={!!errors.password && touched.password}
        errorMessage={touched.password && errors.password}
      />
      <Input
        isRequired
        variant='bordered'
        label="Confirmar Contraseña"
        onChange={handleChange("confirmPassword")}
        onBlur={handleBlur("confirmPassword")}
        value={values.confirmPassword}
        isInvalid={!!errors.confirmPassword && touched.confirmPassword}
        errorMessage={touched.confirmPassword && errors.confirmPassword}
      />
      <Button color='primary' type='submit' size='lg' isDisabled={!isValid} isLoading={isLoading}>
        Confirmar
      </Button>
    </form>
  )
}
