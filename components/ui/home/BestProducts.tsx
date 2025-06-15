"use client";
import { testCategoryData, testProductData } from '@/utils/data'
import { Tab, Tabs } from '@heroui/tabs'
import React, { useContext } from 'react'
import { Product } from '../';
import NextLink from 'next/link';
import { Link } from '@heroui/link';
import { ShopContext } from '@/context/shop';
import { Spinner } from '@heroui/spinner';
import { ProductDTO } from '@/types';

export const BestProducts = () => {
  const { products, categories } = useContext(ShopContext);
  const [bestProducts, setBestProducts] = React.useState<ProductDTO[]>([]);

  const getProdutcs = (categorySelected: string) => {
    return products.data.filter(p => p.category === categorySelected).slice(0,4);
  }

  console.log(bestProducts);

  return (
    <div className='flex flex-col items-center gap-8'>
      <h2 className='flex items-center gap-4 text-2xl font-semibold'>Productos Populares</h2>
      {
        !categories.loading
        ? (
          <Tabs aria-label="Tabs variants" size='lg' variant={"underlined"} >
              {categories.data.map((category) => (
                <Tab key={category.id} title={category.name}>
                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-4 min-h-[340px] items-center'>
                    {
                      getProdutcs(category.name).length === 0
                      ? <span className='text-center w-[1230px] text-lg'>
                        Aun no tenemos productos para esta categoria
                      </span>
                      : 
                        getProdutcs(category.name).map((product) => (
                        <Product key={product.id} { ...product } image={product.images[0]} />
                        ))
                    }
                  </div>
                </Tab>
              ))}
          </Tabs>
        )
        : (
          <Spinner label='Cargando categorias...' />
        )
      }
{/*       <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
        {
          !products.loading 
          ? (
            bestProducts.map((product) => (
              <Product key={product.id} { ...product } image={product.images[0]} />
            )) 
          )
          : (
            <Spinner label='Cargando productos...' />
          )
        }
      </div> */}
      <NextLink href={"/products"} legacyBehavior passHref>
        <Link>Ver Todos</Link>
      </NextLink>
    </div>
  )
}
