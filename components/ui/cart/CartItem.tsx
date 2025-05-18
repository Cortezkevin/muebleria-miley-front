import { IProductCharacteristics } from '@/utils/data';
import { Card } from '@heroui/card'
import { Image } from '@heroui/image'
import React, { FC } from 'react'

interface Props {
    image: string;
    price: number;
    name: string;
    characteristics?: IProductCharacteristics[];
}

export const CartItem: FC<Props> = ({ name, price, image, characteristics }) => {
  return (
    <Card className='w-full flex flex-row gap-2'>
        <Image width={150} height={90} src={image} alt={name} />
        <div className='w-full text-sm flex flex-col gap-1'>
            <span className='line-clamp-1'>{name}</span>
            <span>S/ {price}</span>
            <div className='flex flex-col w-full '>
                { characteristics && characteristics.map(c => (
                    <div className='flex gap-1'>
                        <span>{c.name}:</span>
                        <span className='font-semibold'>{c.value}</span>
                    </div>
                )) }
            </div>
        </div>
    </Card>
  )
}
