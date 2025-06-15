"use client";
import { Card, CardHeader, CardBody } from '@heroui/card'
import React, { FC, useContext } from 'react'
import { Product } from '../../commons'
import { ShopContext } from '@/context/shop';
import { DetailedProductDTO } from '@/types';

interface Props {
  selfProduct: DetailedProductDTO;
}

export const SimilarOptions: FC<Props> = ({ selfProduct }) => {
  const { products } = useContext(ShopContext);
  console.log("SEIMILAR ", products)
  return (
    <Card className='p-4'>
        <CardHeader>
          <h3 className='text-xl font-semibold'>Productos Similares</h3>
        </CardHeader>
        <CardBody>
            <div className='flex gap-5'>
              { products.data.filter(p => p.subcategory === selfProduct.subcategory && p.id !== selfProduct.id).map( p => (
                  <Product key={p.id} { ...p } image={p.images[0]} />
              )) }
            </div>
        </CardBody>
    </Card>
  )
}
