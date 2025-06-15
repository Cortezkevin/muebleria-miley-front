import { CartHeader } from '@/components/ui/cart/CartHeader'
import { CartItems } from '@/components/ui/cart/CartItems'
import { CartSummary } from '@/components/ui/cart/CartSummary'
import { NextPage } from 'next'
import React from 'react'

const CartPage: NextPage = () => {
  return (
    <div className='flex items-center w-full gap-6 h-[500px]'>
      <div className='w-[900px] h-full flex flex-col gap-6'>
        <CartHeader />
        <CartItems />
      </div>
      <div className='w-[300px]'>
        <CartSummary />
      </div>
    </div>
  )
}

export default CartPage