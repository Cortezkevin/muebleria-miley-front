"use client";
import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import React, { FC, useContext } from 'react'
import { useRouter } from 'next/navigation';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown';
import { user } from '@heroui/theme';
import { User } from '@heroui/user';
import { AuthContext } from '@/context/auth';
import { CartContext } from '@/context/cart';

interface Props {
  isLogged: boolean;
}

export const UserSession: FC<Props> = ({ isLogged }) => {

  const { isAdmin, onLogout, user } = useContext(AuthContext);
  const { onClear } = useContext(CartContext);

  const router = useRouter();

  const handleSignIn = () => {
    router.push("/auth/login");
  };

  const handleProfile = () => {
    router.push("/profile");
  }

  const handleLogout = () => {
    onLogout();
    onClear();
  };

  const handleOrdersHistory = () => {
    router.push("/orders");
  };

  return (
    <div>
      {
        isLogged
        ? (

          <Dropdown size="sm" placement="bottom-end">
              <DropdownTrigger className="flex">
                <User
                  as="button"
                  avatarProps={{
                    name: user.firstName,
                    src: user.photoUrl !== "" ? user.photoUrl : undefined,
                  }}
                  name={undefined}
                  className="transition-transform"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem isReadOnly key="detail" className="h-14 gap-2">
                  <User
                    avatarProps={{
                      name: user.firstName,
                      src: user.photoUrl !== "" ? user.photoUrl : undefined,
                    }}
                    name={user.firstName + " " + user.lastName}
                    description={user.email}
                    className="transition-transform"
                  />
                </DropdownItem>
                <DropdownItem key="MiPerfil" onClick={handleProfile}>Mi perfil</DropdownItem>
                <DropdownItem key="MisPedidos" onClick={handleOrdersHistory}>
                  Mis pedidos
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  Cerrar Sesion
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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

          {/* <Popover placement="bottom-end" backdrop='blur'>
            <PopoverTrigger>
              <Avatar name="User" size='md' popoverTarget='asd'/>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-2 px-1 py-1">
                <div className="font-bold text-center text-small">Acciones</div>
                <Button variant='faded' color='primary' size='sm'>Ver Pedidos</Button>
                <Divider className="my-1" />
                <Button variant='flat' color='danger' size='sm'>Cerrar Sesión</Button>
              </div>
            </PopoverContent>
          </Popover> */}