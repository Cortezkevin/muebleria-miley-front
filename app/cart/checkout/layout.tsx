"use client";
import { CartItem } from '@/components/ui/cart/CartItem';
import Stepper from '@/components/ui/cart/Stepper';
import { CartContext } from '@/context';
import { testProductData } from '@/utils/data';
import { Button } from '@heroui/button';
import { Card } from '@heroui/card';
import { Divider } from '@heroui/divider';
import React, { useContext } from 'react'
import NextLink from "next/link";
import { Link } from '@heroui/link';
import { usePathname } from 'next/navigation';

export default function CartCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const [step, setStep] = React.useState(pathName === '/cart/checkout/address' ? 2 : pathName === '/cart/checkout/payment' ? 3 : 4);
  const { count, subtotal, total, tax, shippingCost, discount, items } = useContext(CartContext);
  
  React.useEffect(() => {
    console.log('PATH CHANGE',pathName);
    setStep(pathName === '/cart/checkout/address' ? 2 : pathName === '/cart/checkout/payment' ? 3 : 4);
  }, [pathName])
  

  console.log("STEP: ", step);
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex w-full items-center justify-between'>
        <div>
          <h2 className='text-2xl font-semibold'>Dirección de Entrega</h2>
          <p className='text-md text-default-500'>Agrega la dirección donde recibiras tu pedido</p>
        </div>
        <Stepper
            defaultStep={step-1}
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
        <div className={`${step === 4 ? 'w-[1300px]' : 'w-[1000px]'}`}>
          { children }
        </div>
        <div className={`w-[450px] relative ${step === 4 ? 'hidden' : ''}`}>
          <div className='w-[450px] flex flex-col gap-3 sticky z-100 top-0'>
            <div className='flex justify-between w-full items-center'>
              {/* <Button>Editar Carrito</Button> */}
              <NextLink
                color="foreground"
                passHref
                className={`${step === 3 ? 'hidden' : ''}`}
                legacyBehavior
                href={"/cart"}
              >
                <Link>Editar</Link>
              </NextLink>
              <div className='flex flex-col text-end'>
                <h3 className='text-xl font-semibold'>Resumen del Pedido</h3>
                <span className='text-sm'><b>{count} items</b> en tu carrito</span>
              </div>
            </div>
            <Divider />
            <div className="w-full min-h-[150px] overflow-y-auto p-2">
              <div className="flex flex-col gap-2">
                {items.map(p => (
                  <CartItem 
                    key={p.id} 
                    amount={1} 
                    name={p.name} 
                    image={p.image} 
                    price={p.price} 
                  />
                ))}
              </div>
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
          </div>
        </div>
      </div>
    </div>
  )
}