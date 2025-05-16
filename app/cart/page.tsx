import { CartItems } from '@/components/ui/cart/CartItems'
import { CartSummary } from '@/components/ui/cart/CartSummary'
import { NextPage } from 'next'
import React from 'react'

const CartPage: NextPage = () => (
  <div className='flex items-center w-full gap-6'>
    <div className='w-[900px] flex flex-col gap-6'>
      <div>
        <h2 className='text-2xl font-semibold'>Carrito de Compras</h2>
        <p className='text-md text-default-500'>Tienes <b className='text-default-800'>2 productos</b> en tu carrito</p>
      </div>
      <CartItems />
    </div>
    <div className='w-[300px]'>
      <CartSummary />
    </div>
  </div>
)

export default CartPage