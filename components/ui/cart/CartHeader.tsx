"use client";
import { CartContext } from '@/context/cart';
import React from 'react'

export const CartHeader = () => {
    const { count, items } = React.useContext( CartContext );
  return (
    <div>
        <h2 className='text-2xl font-semibold'>Carrito de Compras</h2>
        <p className='text-md text-default-500'>Tienes <b className='text-default-800'>{count} productos</b> en tu carrito</p>
    </div>
  )
}
