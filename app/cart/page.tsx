import Stepper from '@/components/ui/cart/Stepper'
import { Card } from '@heroui/card'
import { NextPage } from 'next'
import React from 'react'

const CartPage: NextPage = () => {
  return (
    <div>
      <div>
        <div>
          <h2 className='text-2xl font-semibold'>Carrito de Compras</h2>
          <p className='text-md text-default-500'>Tienes <b className='text-default-800'>2 productos</b> en tu carrito</p>
        </div>
        <Card>
        </Card>
      </div>
      <div></div>
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
  )
}

export default CartPage