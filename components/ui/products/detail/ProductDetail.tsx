"use client";
import { Card, CardBody, CardHeader } from '@heroui/card'
import React, { FC } from 'react'
import { ImagesSelector } from './ImagesSelector';
import { CalificationStars } from '../CalificationStars';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { Divider } from '@heroui/divider';
import { Chip } from '@heroui/chip';
import { AmountCounter } from '../../cart/AmountCounter';
import { Image } from '@heroui/image';

interface Props {
  name: string;
  images: string[];
  price: number;
  stock: number;
  category: string;
  subCategory: string;
  discountPercent: number;
}

const imageColors = [
  { color: 'Marron', image: 'https://media.falabella.com/falabellaPE/13878759_1/thumbnail' },
  { color: 'Cafe Claro', image: 'https://media.falabella.com/falabellaPE/13878758_1/thumbnail' },
  { color: 'Caramelo', image: 'https://media.falabella.com/falabellaPE/13878757_1/thumbnail' },
  { color: 'Beige', image: 'https://media.falabella.com/falabellaPE/13878773_1/thumbnail' },
]

export const ProductDetail: FC<Props> = ({name, stock, price, category, subCategory, images, discountPercent }) => {

  const [color, setColor] = React.useState<string>('Beige');

  const handleSelectColor = (selected: string) => {
    setColor(selected);
  }

  return (
    <Card>
      <CardBody className='flex flex-row gap-5 p-6'>
        <ImagesSelector images={images} />
        <div className='w-full h-[600px] py-4 px-6 flex flex-col gap-3'>
          <div className='w-full flex flex-col gap-4'>
            <div>
              <div className='flex gap-3 uppercase text-default-600 font-sm'>
              <span>{category}</span>
              -
              <span>{subCategory}</span></div>
              <h4 className='text-xl font-semibold'>{name}</h4>
            </div>
            <div className='flex gap-2'>
              <CalificationStars stars={5}  />
              <Link underline="always" color='foreground' className='cursor-pointer'>5 (2)</Link>
            </div>
          </div>
          <Divider className='bg-default-300' />
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'> 
              <div className='flex flex-col gap-1 items-start'>
                <p className="text-2xl font-semibold text-red-500">S/ {price}</p>
                {discountPercent && <p className='-mt-1 text-md line-through text-default-500'>S/ { price - 100}</p>}
              </div>
              {
              discountPercent && <Chip variant='flat' size='md' color='danger' radius='sm'>
                -{discountPercent}%
              </Chip>
              }
            </div>
            <div className='w-full'>
              <span><b>Color: </b>{ color }</span>
              <div className='flex gap-2 p-2'>
                {
                  imageColors.map( ic => (
                    <div 
                      onClick={e => handleSelectColor(ic.color)} 
                      key={ic.color} 
                      className={`w-[70px] cursor-pointer h-[70px] p-1 rounded-2xl border-2 ${color == ic.color ? 'border-default-800' : 'border-default-100'}`}
                    >
                      <Image src={ic.image} />
                    </div>
                  ))
                }
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <AmountCounter minValue={1} maxValue={stock} size='lg' />
              <Button className='w-[350px] text-lg' size='lg' color='primary' variant='shadow'>Agregar al Carrito</Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
