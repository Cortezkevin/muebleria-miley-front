"use client";
import { testProductData } from '@/utils/data';
import { Button } from '@heroui/button';
import { Card } from '@heroui/card'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table'
import React from 'react'

export const CartItems = () => {
  return (
    <Card>
      <Table aria-label="Example static collection table" >
        <TableHeader>
          <TableColumn>Producto</TableColumn>
          <TableColumn>Precio</TableColumn>
          <TableColumn>Cantidad</TableColumn>
          <TableColumn>Descuento</TableColumn>
          <TableColumn>Total</TableColumn>
        </TableHeader>
        <TableBody>
          { testProductData.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className='flex items-center gap-2 w-[300px]'>
                  <img src={product.image} alt={product.name} className='object-cover w-[120px] h-[90px] rounded-md' />
                  <div className='flex flex-col gap-1'>
                    <span className='text-sm uppercase text-default-500'>{product.category}</span>
                    <h3 className='font-semibold text-md line-clamp-2'>{product.name}</h3>
                  </div>
                </div>
              </TableCell>
              <TableCell>S/ {product.price}</TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Button size='sm' isIconOnly>
                    <i className="fa-solid fa-minus"></i>
                  </Button>
                  {1}
                  <Button size='sm' isIconOnly>
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                </div>
              </TableCell>
              <TableCell>- S/ {100}</TableCell>
              <TableCell>S/ {product.price - 100}</TableCell>
            </TableRow> 
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
