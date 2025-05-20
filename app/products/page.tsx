import { Catalog } from '@/components/ui/products/Catalog';
import { NextPage } from 'next'
import React from 'react'

const ProductsPage: NextPage = () => {
  return (
    <div className='flex w-full gap-4 '>
      <Catalog />
    </div>
  )
}

export default ProductsPage