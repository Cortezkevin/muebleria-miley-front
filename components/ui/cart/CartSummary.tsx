"use client";

import { CartContext } from '@/context/cart';
import { Button } from '@heroui/button'
import { Card } from '@heroui/card'
import { Divider } from '@heroui/divider'
import { Input } from '@heroui/input'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AddressModal } from './AddressModal';

export const CartSummary = () => {

  const router = useRouter();
  const { shippingCost, count, subtotal, total, tax, discount, items } = React.useContext(CartContext);

  const [openModal, setOpenModal] = useState(false);

  const handleContinueOrder = () => {
    router.push("/cart/checkout/address");
  }

  return (
   <Card className='flex flex-col gap-5 p-4'>
      <h2 className='text-lg font-semibold'>Resumen</h2>
      <div className='flex flex-col gap-2'>
        <span>Dirección de Entrega</span>
        <form className='flex flex-col gap-2' action="">
          <Input size='sm' label="Dirección" />
          <Button onPress={() => setOpenModal(true)}>Seleccionar Dirección</Button>
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
      <Button onPress={handleContinueOrder}>Continuar</Button>
   </Card>
  )
}
