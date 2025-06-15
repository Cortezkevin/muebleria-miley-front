"use client";
import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Image } from '@heroui/image';
import { motion } from 'framer-motion';
import React, { FC } from 'react'
import { CalificationStars } from '../products/CalificationStars';
import { Chip } from '@heroui/chip';
import { useRouter } from 'next/navigation';
import { CartContext } from '@/context/cart';
import { addItem } from '@/api/cartAPI';
import { AuthContext } from '@/context/auth';

interface Props {
  id: string;
  name: string;
  category: string;
  image: string;
  price: string;
  stock: number;
  discountPercent?: number;
}

export const Product: FC<Props> = ({ id, name, price, image, category, stock, discountPercent }) => {
  const { isLogged } = React.useContext(AuthContext);
  const [isHover, setIsHover] = React.useState(false);
  const router = useRouter();
  const { onAddItem, id: cartId, isAddingItem, onAddMemoryItem } = React.useContext(CartContext);

  const handleShowDetails = () => {
    router.push(`/products/${id}`);
  }

  const handleAddItemToCart = () => {
    if (isLogged) {
      onAddItem({ product_id: id, amount: 1, cart_id: cartId });
    } else {
      onAddMemoryItem({
        id: cartId,
        product_id: id,
        amount: 1,
        description: "",
        image,
        name,
        price,
        category,
        total: parseFloat(price) * 1 + "",
        stock,
      });
    }
  }

  return (
    <Card shadow="lg" className='w-[292px] relative' onMouseOver={e => setIsHover(true)} onMouseLeave={e => setIsHover(false)}>
      { stock === 0 && <div className='absolute top-2 left-2 z-[100]'>
        <Chip size='md' color="danger" variant="solid">Agotado</Chip>
      </div> }
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
      <CardFooter className='relative h-[140px] p-0'>
        <div className='flex flex-col w-full h-full gap-1 p-3'>
          <p className='uppercase text-default-500'>{category}</p>
          <div className='flex items-center h-10'>
            <p className='font-semibold text text-base/5 line-clamp-2'>{ name }</p>
          </div>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center gap-1'> 
              <div className='flex flex-col items-start'>
                <p className="text-lg font-semibold text-red-500">S/ {price}</p>
                {discountPercent && <p className='-mt-1 text-sm line-through text-default-500'>S/ { Number.parseFloat(price) - 100}</p>}
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
            transition={{ duration: 1, type: "spring"}}
          >
            <div className='flex items-center justify-center w-full h-full gap-2'>
              <Button onPress={ handleShowDetails } variant='solid' endContent={<i className="fa-solid fa-eye"></i>}>
                Ver
              </Button>
              {
                stock && (
                  <Button onPress={handleAddItemToCart} variant='solid' endContent={<i className="fa-solid fa-cart-plus"></i>}>
                    Add to Cart
                  </Button>
                )
              }
            </div>
          </motion.div>
        </div>
      </CardFooter>
    </Card>
  )
}
