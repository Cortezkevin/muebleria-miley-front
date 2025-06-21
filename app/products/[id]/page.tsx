"use client";

import { ProductAPI } from '@/api';
import { ProductCalification } from '@/components/ui/products/detail/ProductCalification';
import { ProductDetail } from '@/components/ui/products/detail/ProductDetail';
import { SimilarOptions } from '@/components/ui/products/detail/SimilarOptions';
import { DetailedProductDTO, SuccessResponseDTO } from '@/types';
import { NextPage } from 'next'
import React from 'react'

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage: NextPage<PageProps> = ({ params }) => {
  const param = React.use(params);
  const [product, setProduct] = React.useState<DetailedProductDTO | undefined>(undefined);
  const [images, setImages] = React.useState<string[]>([]);
    
  React.useEffect(() => {
    (async () => {
      const response = await ProductAPI.getDetailsById((param as any).id);
      if (response?.success) {
        const data = response as SuccessResponseDTO<DetailedProductDTO>;
        setProduct(data.content);
        setImages(
          data.content.images && data.content.images.length > 0
                ? data.content.images
                : data.content.colors[0].images.map(i => i.url)
        );
      }
    })();
  }, []);

  const handleColorSelected = (color: string) => {
    const newImages = product?.colors.find(c => c.color === color)?.images.map(i => i.url)!;
    setImages(newImages);
  }

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
              imageColors={product.colors.length > 0 ? product.colors.map(c => ({ color: c.color, image: c.images[0].url })) : undefined}
              images={
                images
              }
              features={
                product.features
              }
              description={product.description}
              onColorSelected={handleColorSelected}
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