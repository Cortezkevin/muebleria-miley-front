"use client";
import { testProductData } from '@/utils/data';
import { Card } from '@heroui/card'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table'
import React from 'react'
import { AmountCounter } from './AmountCounter';
import { Button } from '@heroui/button';

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
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          { testProductData.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className='flex items-center gap-3 w-[300px]'>
                  <img src={product.image} alt={product.name} className='object-cover w-[120px] h-[90px] rounded-md' />
                  <div className='flex flex-col gap-1'>
                    <span className='text-sm uppercase text-default-500'>{product.category}</span>
                    <h3 className='font-semibold text-md line-clamp-1'>{product.name}</h3>
                    { product.characteristics && (
                      product.characteristics.map(c => (
                        <div key={c.name} className='flex flex-col gap-[1px] text-xs'>
                          <div className='flex gap-1'>
                            <span className='text-default-500'>{ c.name }:</span> 
                            <span className='font-semibold'>{ c.value }</span>
                          </div>
                        </div>
                      ))
                    ) }
                  </div>
                </div>
              </TableCell>
              <TableCell>S/ {product.price}</TableCell>
              <TableCell>
                <AmountCounter initialValue={10}/>
              </TableCell>
              <TableCell>- S/ {100}</TableCell>
              <TableCell>S/ {product.price - 100}</TableCell>
              <TableCell>
                <Button color='danger' isIconOnly><i className="fa-solid fa-trash"></i></Button>
              </TableCell>
            </TableRow> 
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
