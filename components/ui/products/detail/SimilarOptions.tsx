"use client";
import { testProductData } from '@/utils/data'
import { Card, CardHeader, CardBody } from '@heroui/card'
import React from 'react'
import { Product } from '../../commons'

export const SimilarOptions = () => {
  return (
    <Card className='p-4'>
        <CardHeader>
          <h3 className='text-xl font-semibold'>Productos Similares</h3>
        </CardHeader>
        <CardBody>
            <div className='flex gap-5'>
              { testProductData.map( p => (
                  <Product key={p.id} { ...p } />
              )) }
            </div>
        </CardBody>
    </Card>
  )
}
