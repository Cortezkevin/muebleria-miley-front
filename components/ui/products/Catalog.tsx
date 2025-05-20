"use client";
import React, { FC } from 'react'
import { Sorter } from './Sorter'
import { Product } from '../commons'
import { testProductData } from '@/utils/data';
import { Filter } from './Filter';

export const Catalog: FC = () => {
  return (
    <div className='flex w-full gap-4'>
      <div className='w-[400px] h-[800px]'>
        <Filter />
      </div>
      <div className='flex flex-col w-[1200px] gap-4'>
        <Sorter />
        <div className='flex flex-wrap gap-4'>
          {
            testProductData.map((product) => (
              <Product key={product.id} { ...product } />
            ))
          }
        </div>
      </div>
    </div>
  )
}
