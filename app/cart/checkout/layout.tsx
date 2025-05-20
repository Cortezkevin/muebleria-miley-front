import { CartItem } from '@/components/ui/cart/CartItem';
import { CartSummary } from '@/components/ui/cart/CartSummary';
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
        <div className='w-[400px] flex flex-col gap-3'>
          <div className='flex flex-col w-full text-end'>
            <h3 className='text-xl font-semibold'>Resumen del Pedido</h3>
            <span className='text-sm'><b>2 items</b> en tu carrito</span>
          </div>
          <Divider />
          <div className="w-full h-[400px] overflow-y-auto p-2">
            <div className="flex flex-col gap-2">
              {testProductData.map(p => (
                <CartItem 
                  key={p.id} 
                  amount={1} 
                  name={p.name} 
                  image={p.image} 
                  price={p.price} 
                  characteristics={p.characteristics} 
                />
              ))}
            </div>
          </div>


          <Divider />
          
          <Card className='flex flex-col gap-2 p-3 text-sm bg-black/80 dark:bg-black'>
            <div className='flex items-center justify-between'>
              <span className='text-default-300 dark:text-default-400'>Subtotal</span>
              <span className='text-white/70'>S/ 2000</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-default-300 dark:text-default-400'>Delivery</span>
              <span className='text-white/70'>S/ 100</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-default-300 dark:text-default-400'>IGV (18%)</span>
              <span className='text-white/70'>S/ 120</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-default-300 dark:text-default-400'>Descuento</span>
              <span className='text-white/70'>- S/ 200</span>
            </div>
            <Divider className='bg-default-500'/>
            <div className='flex items-center justify-between text-lg'>
              <span className='text-default-300 dark:text-default-500'>Total</span>
              <span className='font-[500] text-white'>S/ 2020 </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}