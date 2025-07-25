"use client";
import { AuthContext } from '@/context';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Link } from '@heroui/link';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { FC, useContext, useState } from 'react'
import * as yup from "yup";

type LoginFormInputs = {
  email: string;
  password: string;
};

const schema = yup
  .object().shape({
    email: yup.string().email("Ingrese un email valido").required("Campo requerido"),
    password: yup.string().min(6, "La contraseña debe tener 6 caracteres como minimo").required("Campo requerido")
});

interface Props {
    redirectPage?: string;
}

export const LoginForm: FC<Props> = ({ redirectPage }) => {
     const { onLogin } = useContext( AuthContext );
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, values, handleChange, handleBlur, touched, isValid, errors } = useFormik<LoginFormInputs>({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: async ({ email, password }) => {
      console.log("ONSUBMIT LLAMADO");
      setIsLoading(true);
      const result = await onLogin( email, password);
      console.log("ESPERANDO RESPUESTA BACKEND");
      if( result ){
        console.log("RESPUESTA " + result);
        push(redirectPage || '/');
      }
      /*searchParams.get("prevPage")*/
      setIsLoading(false);
    },
    validationSchema: schema
  });
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <Input 
            variant='bordered' 
            label="Email"
            onChange={ handleChange("email")}
            onBlur={ handleBlur("email")}
            value={ values.email }
            isInvalid={ !!errors.email && touched.email }
            errorMessage={ touched.email && errors.email }
        />
        <Input 
            variant='bordered' 
            label="Contraseña"
            onChange={ handleChange("password")}
            onBlur={ handleBlur("password")}
            type='password'
            value={ values.password }
            isInvalid={ !!errors.password && touched.password }
            errorMessage={ touched.password && errors.password }
        />
        <div className='self-end px-2'>
            <Link href="/auth/change-password" color='primary' size='sm'>
                Olvide mi contraseña
            </Link>
        </div>
        <Button color='primary' type='submit' size='lg' isDisabled={ !isValid } isLoading={ isLoading }>
            Confirmar
        </Button>
    </form>
  )
}
