"use client";

import { ProductAPI } from '@/api';
import { ProductCalification } from '@/components/ui/products/detail/ProductCalification';
import { ProductDetail } from '@/components/ui/products/detail/ProductDetail';
import { SimilarOptions } from '@/components/ui/products/detail/SimilarOptions';
import { DetailedProductDTO, SuccessResponseDTO } from '@/types';
import { NextPage } from 'next'
import React from 'react'

interface Props {
  params: {
    id: string;
  };
}

const ProductDetailsPage: NextPage<Props> = ({ params }) => {
  const param = React.use(params as any);
  const [product, setProduct] = React.useState<DetailedProductDTO | undefined>(undefined);
    
  React.useEffect(() => {
    (async () => {
      const response = await ProductAPI.getDetailsById((param as any).id);
      if (response?.success) {
        const data = response as SuccessResponseDTO<DetailedProductDTO>;
        setProduct(data.content);
      }
    })();
  }, []);

  return (
    <div className='flex flex-col gap-6'>
        {
          product
          && <ProductDetail
              id={product.id}
              stock={product.stock} price={product.price}
              discountPercent={10}
              name={product.name}
              category={product.category}
              subCategory={product.subcategory}
              images={
                product.images
              }
              features={
                product.features
              }
              description={product.description}
          />
        }
        { 
          product 
          ? <SimilarOptions selfProduct={product} />
          : <span>Loading...</span>
        }
        <ProductCalification />
    </div>
  )
}

export default ProductDetailsPage