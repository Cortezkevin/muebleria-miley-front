import { CartItem } from '@/components/ui/cart/CartItem';
import Stepper from '@/components/ui/cart/Stepper';
import { testProductData } from '@/utils/data';
import { Card, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import React from 'react'

export default function CartCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex w-full items-center justify-between'>
        <div>
          <h2 className='text-2xl font-semibold'>Dirección de Entrega</h2>
          <p className='text-md text-default-500'>Agrega la dirección donde recibiras tu pedido</p>
        </div>
        <Stepper
            defaultStep={2}
            steps={[
              {
              title: "Carrito",
              },
              {
              title: "Dirección",
              },
              {
              title: "Pago",
              },
              {
              title: "Confirmación",
              }
            ]}
        />
      </div>
      <div className='flex gap-6'>
        <div className='w-[1000px]'>
          { children }
        </div>
        <div className='w-[350px] flex flex-col gap-3'>
          <div className='flex flex-col w-full text-end'>
            <h3 className='text-xl font-semibold'>Resumen del Pedido</h3>
            <span className='text-sm'><b>2 items</b> en tu carrito</span>
          </div>
          <Divider />
          { testProductData.map(p => (
            <CartItem key={p.id} name={p.name} image={p.image} price={p.price} characteristics={p.characteristics} />
          )) }
        </div>
      </div>
    </div>
  )
}