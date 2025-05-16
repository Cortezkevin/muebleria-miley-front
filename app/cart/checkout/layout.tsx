import Stepper from '@/components/ui/cart/Stepper';
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
       <div>
         { children }
       </div>
    </div>
  )
}