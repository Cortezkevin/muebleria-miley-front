"use client";
import React, { FC, useContext } from 'react'
import { Sorter } from './Sorter'
import { Product } from '../commons'
import { Filter } from './Filter';
import { ShopContext } from '@/context/shop';

export const Catalog: FC = () => {
  const { products } = useContext(ShopContext);
  
  return (
    <div className='flex w-full gap-4'>
      <div className='w-[400px] h-[800px]'>
        <Filter />
      </div>
      <div className='flex flex-col w-[1200px] gap-4'>
        <Sorter />
        <div className='flex flex-wrap gap-4'>
          {
            products.data.map((product) => (
              <Product key={product.id} { ...product } image={product.images[0]} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
