import { Button } from '@heroui/button'
import { Card } from '@heroui/card'
import { Divider } from '@heroui/divider'
import { Input } from '@heroui/input'
import React from 'react'

export const CartSummary = () => {
  return (
   <Card className='flex flex-col gap-5 p-4'>
      <h2 className='text-lg font-semibold'>Resumen</h2>
      <div className='flex flex-col gap-2'>
        <span>Dirección de Entrega</span>
        <form className='flex flex-col gap-1' action="">
          <Input size='sm' label="Dirección" />
          <Button>Seleccionar Dirección</Button>
        </form>
      </div>
      <Divider />
      <Card className='flex flex-col gap-2 p-3 text-sm bg-black/80 dark:bg-black'>
        <div className='flex items-center justify-between'>
          <span className='text-default-300 dark:text-default-400'>Subtotal</span>
          <span className='text-white/70'>S/ 2000</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-default-300 dark:text-default-400'>Delivery</span>
          <span className='text-white/70'>S/ 100</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-default-300 dark:text-default-400'>IGV (18%)</span>
          <span className='text-white/70'>S/ 120</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-default-300 dark:text-default-400'>Descuento</span>
          <span className='text-white/70'>- S/ 200</span>
        </div>
        <Divider className='bg-default-500'/>
        <div className='flex items-center justify-between text-lg'>
          <span className='text-default-300 dark:text-default-500'>Total</span>
          <span className='font-[500] text-white'>S/ 2020 </span>
        </div>
      </Card>
   </Card>
  )
}
