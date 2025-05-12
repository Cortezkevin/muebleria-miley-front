import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Image } from '@heroui/image';
import { motion } from 'framer-motion';
import React, { FC } from 'react'
import { CalificationStars } from '../products/CalificationStars';
import { Chip } from '@heroui/chip';

interface Props {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  discountPercent?: number;
}

export const Product: FC<Props> = ({ name, price, image, category, discountPercent }) => {
  
  const [isHover, setIsHover] = React.useState(false);
  
  return (
    <Card shadow="lg" className='w-[292px]' onMouseOver={e => setIsHover(true)} onMouseLeave={e => setIsHover(false)}>
      <CardBody className="p-0 overflow-visible">
        <Image
          alt={name}
          className="w-full object-cover h-[200px]"
          radius="none"
          shadow="sm"
          src={image}
          width="100%"
        />
      </CardBody>
      <CardFooter className='relative p-0'>
        <div className='flex flex-col w-full gap-2 p-3'>
          <p className='uppercase text-default-500'>{category}</p>
          <p className='text-lg font-semibold'>{name}</p>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center gap-1'> 
              <div className='flex flex-col items-start'>
                <p className="text-lg font-semibold text-red-500">S/ {price}</p>
                {discountPercent && <p className='-mt-1 text-sm line-through text-default-500'>S/ { price - 100}</p>}
              </div>
              {
              discountPercent && <Chip variant='flat' size='sm' color='danger' radius='sm'>
                -{discountPercent}%
              </Chip>
              }
            </div>
            <div className='flex items-center gap-2'>
              <CalificationStars size='sm' stars={4} />
              <span className='text-default-500'>(4)</span>
            </div>
          </div>
        </div>
        <div className='absolute w-full h-full'>
          <motion.div
            style={{
              background: "#ffffff99",
              height: "100%",
              position: "relative",
              width: "100%",
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={ isHover ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: .8, type: "spring"}}
          >
            <div className='flex items-center justify-center w-full h-full gap-2'>
              <Button variant='solid' endContent={<i className="fa-solid fa-eye"></i>}>
                Ver
              </Button>
              <Button variant='solid' endContent={<i className="fa-solid fa-cart-plus"></i>}>
                Add to Cart
              </Button>
            </div>
          </motion.div>
        </div>
      </CardFooter>
    </Card>
  )
}
