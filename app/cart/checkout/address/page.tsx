import { Button } from '@heroui/button'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Input } from '@heroui/input'
import React from 'react'

const CartAddress = () => {
  return (
    <Card className='flex flex-col gap-3 w-full p-3'>
      <CardHeader>
        <h3 className='text-xl'>Información de la Dirección</h3>
      </CardHeader>
      <CardBody>
        <form action="" className='flex flex-col gap-3'>
          <Input label="Dirección 1" />
          <Input label="Dirección 2" />
          <div className='flex gap-3'>
            <Input label="Departamento" />
            <Input label="Distrito" />
          </div>
          <Button size='lg'>Continuar</Button>
        </form>
      </CardBody>
    </Card>
  )
}

export default CartAddress