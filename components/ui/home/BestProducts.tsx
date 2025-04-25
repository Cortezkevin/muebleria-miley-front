"use client";
import { testCategoryData, testProductData } from '@/utils/data'
import { Tab, Tabs } from '@heroui/tabs'
import React from 'react'
import { Product } from '../';
import NextLink from 'next/link';
import { Link } from '@heroui/link';

export const BestProducts = () => {
  return (
    <div className='flex flex-col items-center gap-8'>
      <h2 className='flex items-center gap-4 text-2xl font-semibold'>Productos Populares</h2>
      <Tabs aria-label="Tabs variants" size='lg' variant={"underlined"}>
          {
            testCategoryData.map((category) => (
              <Tab key={category.id} title={category.name}/>
            ))
          }
      </Tabs>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
        {
          testProductData.map((product) => (
            <Product key={product.id} { ...product } />
          )) 
        }
      </div>
      <NextLink href={"/products"} legacyBehavior passHref>
        <Link>Ver Todos</Link>
      </NextLink>
    </div>
  )
}
