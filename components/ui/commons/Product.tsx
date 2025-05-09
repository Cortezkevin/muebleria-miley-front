import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Image } from '@heroui/image';
import React, { FC } from 'react'

interface Props {
  id: number;
  name: string;
  image: string;
  price: number;
}

export const Product: FC<Props> = ({ name, price, image }) => {
  return (
    <Card shadow="lg" className='w-[290px]'>
      <CardBody className="p-0 overflow-visible">
        <Image
          alt={name}
          className="w-full object-cover h-[200px]"
          radius="lg"
          shadow="sm"
          src={image}
          width="100%"
        />
      </CardBody>
      <CardFooter className="justify-between text-small">
        <b>{name}</b>
        <div className='flex items-center gap-4'>
          <p className="text-lg text-default-500">S/ {price}</p>
          <Button isIconOnly aria-label="Add To Cart" color="warning" variant="flat" className="rounded-full">
            <i className="fa-solid fa-cart-shopping"></i>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
