"use client";

import { CartContext } from '@/context/cart';
import { Button } from '@heroui/button'
import { Card } from '@heroui/card'
import { Divider } from '@heroui/divider'
import { Input } from '@heroui/input'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { AddressModal } from './AddressModal';
import { AuthContext } from '@/context';
import { AddressDTO } from '@/types';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { ProfileContext } from '@/context/profile';

export const CartSummary = () => {

  const router = useRouter();
  const { isLogged } = useAuth();
  const { address, isSavingAddress } = useContext(ProfileContext);
  const [direction, setDirection] = useState<AddressDTO | undefined>(address);
  const [isDisableButton, setIsDisableButton] = useState(true);
  const { shippingCost, count, subtotal, total, tax, discount, items } = React.useContext(CartContext);

  const [openModal, setOpenModal] = useState(false);

  const handleContinueOrder = () => {
    if (!isLogged) {
      toast.error(
        "Crea una cuenta para continuar con tu pedido"
      );
      router.push("/auth/register?prevPage=/cart");
    } else {
      router.push("/cart/checkout/address");
    }
  }

  React.useEffect(() => {
    if( address ){
      setDirection(address);
      setIsDisableButton(count === 0 || !address || address.fullAddress === "" );
    }else {
      const address = JSON.parse( Cookies.get("address") || "null" ) as AddressDTO;
      if( address ){
        setDirection(address);
      }else {
        setDirection(undefined);
      }
    }
  }, [address, count]);

  return (
   <Card className='flex flex-col gap-5 p-4 mt-10 '>
      <h2 className='text-lg font-semibold'>Resumen</h2>
      <div className='flex flex-col gap-2'>
        <span>Dirección de Entrega</span>
        <form className='flex flex-col gap-2' action="">
          <Input 
            disabled size='sm' 
            label="Direccion de Entrega"
            value={ direction && direction !== null ? direction.fullAddress : ""}
          />
          <Button onPress={() => setOpenModal(true)} isLoading={isSavingAddress}>
            { direction && direction !== null ? "Cambiar direccion" : "Seleccionar Direccion" }
          </Button>
        </form>
      </div>
      <Divider />
      <Card className='flex flex-col gap-2 p-3 text-sm bg-black/80 dark:bg-black'>
        <div className='flex items-center justify-between'>
          <span className='text-default-300 dark:text-default-400'>Subtotal</span>
          <span className='text-white/70'>S/ {subtotal}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-default-300 dark:text-default-400'>Delivery</span>
          <span className='text-white/70'>S/ {shippingCost}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-default-300 dark:text-default-400'>IGV (18%)</span>
          <span className='text-white/70'>S/ {tax}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-default-300 dark:text-default-400'>Descuento</span>
          <span className='text-white/70'>- S/ {discount}</span>
        </div>
        <Divider className='bg-default-500'/>
        <div className='flex items-center justify-between text-lg'>
          <span className='text-default-300 dark:text-default-500'>Total</span>
          <span className='font-[500] text-white'>S/ {total} </span>
        </div>
      </Card>
      <AddressModal isOpen={ openModal } handleOpenModal={(isOpen) => setOpenModal(isOpen)} />
      <Divider/>
      <Button
        isDisabled={ isDisableButton }
        size="lg"
        className="w-full text-white font-semibold rounded-md"
        color="primary"
        variant="solid" 
        onPress={handleContinueOrder}
      >
        Continuar
      </Button>
      <small className='text-default-500 text-center text-xs -mt-1'>Selecciona la direccion de entrega para poder continuar con el pedido</small>
   </Card>
  )
}
