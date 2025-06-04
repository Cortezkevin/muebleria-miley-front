import { ProductCalification } from '@/components/ui/products/detail/ProductCalification';
import { ProductDetail } from '@/components/ui/products/detail/ProductDetail';
import { SimilarOptions } from '@/components/ui/products/detail/SimilarOptions';
import { NextPage } from 'next'
import React from 'react'

interface Props {
    params: {
        id: string;
    };
}

const ProductDetailsPage: NextPage<Props> = ({ params }) => {
  return (
    <div className='flex flex-col gap-6'>
        <ProductDetail
          stock={10} price={2000}
          discountPercent={10}
          name='Mueble 1'
          category='mueble'
          subCategory='sala'
          images={
            ["https://media.falabella.com/falabellaCO/20485812_1",
            "https://media.falabella.com/falabellaCO/20485812_2",
            "https://media.falabella.com/falabellaCO/20485812_3",
            "https://media.falabella.com/falabellaCO/20485812_4",
            "https://media.falabella.com/falabellaCO/20485812_5",
            "https://media.falabella.com/falabellaCO/20485812_6",
            "https://media.falabella.com/falabellaCO/20485812_7"]
          }
          features={
            [{ feature: 'Largo', value: '20cm' },
            { feature: 'Ancho', value: '30cm' },
            { feature: 'Alto', value: '40cm' }]
          }
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        />
        <SimilarOptions />
        <ProductCalification />
    </div>
  )
}

export default ProductDetailsPage