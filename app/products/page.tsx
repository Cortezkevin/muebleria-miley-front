import { Product } from '@/components/ui'
import { Catalog } from '@/components/ui/products/Catalog';
import { Sorter } from '@/components/ui/products/Sorter';
import { testProductData } from '@/utils/data'
import { Card, CardBody } from '@heroui/card'
import { Input } from '@heroui/input'
import { Pagination } from '@heroui/pagination'
import { Select, SelectItem } from '@heroui/select'
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