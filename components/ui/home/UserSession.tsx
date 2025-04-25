"use client";
import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import React, { FC } from 'react'
import { useRouter } from 'next/navigation';

interface Props {
  isLogged: boolean;
}

export const UserSession: FC<Props> = ({ isLogged }) => {

  const router = useRouter();

  const handleSignIn = () => {
    router.push("/auth/login");
  };

  return (
    <div>
      {
        isLogged
        ? (
          <Popover placement="bottom-start" backdrop='blur'>
            <PopoverTrigger>
              <Avatar name="User" size='sm' popoverTarget='asd'/>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-2 px-1 py-1">
                <div className="font-bold text-center text-small">Acciones</div>
                <Button variant='faded' color='primary' size='sm'>Ver Pedidos</Button>
                <Divider className="my-1" />
                <Button variant='flat' color='danger' size='sm'>Cerrar Sesión</Button>
              </div>
            </PopoverContent>
          </Popover>
        )
        : (
          <Button onPress={ handleSignIn } variant='ghost' color='primary'>
            Iniciar Sesión
          </Button>
        )
      }
    </div>
  )
}