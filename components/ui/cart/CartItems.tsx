"use client";
import { Card } from '@heroui/card'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table'
import React from 'react'
import { AmountCounter } from './AmountCounter';
import { Button } from '@heroui/button';
import { CartContext } from '@/context/cart';
import { AuthContext } from '@/context/auth';
import { CartItemDTO } from '@/types';
import { useRouter } from 'next/navigation';
import { Spinner } from '@heroui/spinner';

export const CartItems = () => {
  const router = useRouter();
  const { isLogged } = React.useContext( AuthContext );
  const { items, onAddItem, onRemoveItem, onAddMemoryItem, onRemoveMemoryItem, id: cartId, loadingItems } = React.useContext( CartContext );

  const handleIncreaseAmount = (item: CartItemDTO) => {
    if(isLogged){
      onAddItem({
        cart_id: cartId,
        amount: 1,
        product_id: item.product_id
      });
    }else {
      onAddMemoryItem({
        ...item,
        amount: 1
      })
    }
  }

  const handleDecreaseAmount = (item: CartItemDTO) => {
    if( isLogged ){
      onRemoveItem({
        cart_id: cartId,
        amount: 1,
        item_id: item.id,
        removeAll: false
      });
    }else {
      onRemoveMemoryItem({
        amount: 1,
        productId: item.product_id,
        removeAll: false
      })
    }
  }

  const handleRemoveItem = (item: CartItemDTO) => {
    if( isLogged ){
      onRemoveItem({
        cart_id: cartId,
        amount: 0,
        item_id: item.id,
        removeAll: true
      });
    }else {
      onRemoveMemoryItem({
        amount: 0,
        productId: item.product_id,
        removeAll: true
      })
    }
  }

  return (
    <Card>
      <Table isHeaderSticky aria-label="Example static collection table" classNames={{
        base: "min-h-[200px] max-h-[520px] overflow-y-hidden",
        table: "min-h-[220px]",
      }}>
        <TableHeader>
          <TableColumn>Producto</TableColumn>
          <TableColumn>Precio</TableColumn>
          <TableColumn>Cantidad</TableColumn>
          <TableColumn>Descuento</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody 
          isLoading={loadingItems}
          loadingContent={<Spinner className='mt-10' label="Cargando items..."/>}
        >
          { 
            items.length === 0 && !loadingItems
            ? <TableRow>
                <TableCell className='text-center text-lg h-[150px]' colSpan={6}>
                  <div className='flex flex-col gap-2 items-center'>
                    <span>No tienes productos agregados.</span>
                    <Button 
                      endContent={<i className="fa-solid fa-cart-plus"></i>} 
                      className='w-[150px]' 
                      onPress={() => router.push("/products")}
                      variant='flat'
                    >Ir al catalogo</Button>
                  </div>
                </TableCell>
              </TableRow>
            : (
              items.map((cartItem) => (
                <TableRow key={cartItem.product_id}>
                  <TableCell>
                    <div className='flex items-center gap-3 w-[300px]'>
                      <img src={cartItem.image} alt={cartItem.name} className='object-cover w-[120px] h-[90px] rounded-md' />
                      <div className='flex flex-col gap-1'>
                        <span className='text-sm uppercase text-default-500'>{cartItem.category}</span>
                        <h3 className='font-semibold text-md line-clamp-1'>{cartItem.name}</h3>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>S/ {cartItem.price}</TableCell>
                  <TableCell>
                    <AmountCounter
                      onIncreaseCounter={() => handleIncreaseAmount(cartItem)}
                      onDecreaseCounter={() => handleDecreaseAmount(cartItem)}
                      initialValue={cartItem.amount}
                      maxValue={cartItem.stock}
                    />
                  </TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>S/ {Number.parseFloat(cartItem.total)}</TableCell>
                  <TableCell>
                    <Button onPress={() => handleRemoveItem(cartItem)} color='danger' isIconOnly><i className="fa-solid fa-trash"></i></Button>
                  </TableCell>
                </TableRow> 
                ))
              )
          }
        </TableBody>
      </Table>
    </Card>
  )
}

/* { product.characteristics && (
                      product.characteristics.map(c => (
                        <div key={c.name} className='flex flex-col gap-[1px] text-xs'>
                          <div className='flex gap-1'>
                            <span className='text-default-500'>{ c.name }:</span> 
                            <span className='font-semibold'>{ c.value }</span>
                          </div>
                        </div>
                      ))
                    ) } */