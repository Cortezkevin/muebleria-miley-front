"use client";
import { Badge } from '@heroui/badge';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'

interface Props {
  cartItemsCount?: number;
}

export const ShoppingCartButton: FC<Props> = ({ cartItemsCount }) => {

  const router = useRouter();

  const handleClick = () => {
    router.push('/cart');
  }

  return (
    <Badge color="primary" size='sm' content={ cartItemsCount ? (cartItemsCount === 0 ? undefined : cartItemsCount): undefined } variant='solid' className='border-none'>
      <i onClick={handleClick} className="text-xl cursor-pointer fa-solid fa-cart-shopping hover:opacity-80 text-default-500"></i>
    </Badge>
  )
}
