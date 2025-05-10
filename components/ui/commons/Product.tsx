import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Image } from '@heroui/image';
import { motion } from 'framer-motion';
import React, { FC } from 'react'

interface Props {
  id: number;
  name: string;
  image: string;
  price: number;
}

export const Product: FC<Props> = ({ name, price, image }) => {
  
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
          <div className='w-full flex flex-col gap-3 p-3'>
            <p className='text-lg font-semibold'>{name}</p>
            <div className='w-full flex justify-between items-center'>
              <p className="text-lg text-default-500 text-red-500">S/ {price}</p>
              <div>5 Estrellas</div>
            </div>
          </div>
          <div className='absolute w-full h-full'>
            <motion.div
              style={{
                background: "#ffffffbb",
                height: "100%",
                position: "relative",
                width: "100%",
              }}
              initial={{ y: 100 }}
              animate={ isHover ? { y: 0 } : {}}
              transition={{ duration: .8, type: "spring"}}
            >
              <div className='w-full h-full flex items-center justify-center gap-2'>
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
