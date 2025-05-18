import { IProductCharacteristics } from '@/utils/data';
import { Card } from '@heroui/card'
import { Image } from '@heroui/image'
import React, { FC } from 'react'

interface Props {
    image: string;
    price: number;
    name: string;
    amount: number;
    characteristics?: IProductCharacteristics[];
}

export const CartItem: FC<Props> = ({ name, price, amount = 1, image, characteristics }) => {
  return (
    <Card className='w-full flex flex-row gap-2' shadow='sm'>
        <Image width={330} height={120} src={image} alt={name} />
        <div className='w-full text-sm flex flex-col gap-1 justify-center px-1 py-2'>
            <span className='font-semibold line-clamp-1'>{name}</span>
            <span>S/ {price}</span>
            <div className='flex flex-col w-full text-xs'>
                { characteristics && characteristics.map(c => (
                    <div key={c.name} className='flex gap-1'>
                        <span>{c.name}:</span>
                        <span className='font-semibold'>{c.value}</span>
                    </div>
                    
                )) }
                <div className='flex gap-1'>
                    <span>Cantidad:</span>
                    <span className='font-semibold'>{amount}</span>
                </div> 
            </div>
        </div>
    </Card>
  )
}
