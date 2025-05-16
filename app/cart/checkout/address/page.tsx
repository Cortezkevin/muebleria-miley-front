import { Button } from '@heroui/button'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Input } from '@heroui/input'
import React from 'react'

const CartAddress = () => {
  return (
    <div className='flex gap-6 w-full'>
      <Card className='flex flex-col gap-3 w-[800px] p-3'>
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
      <Card className='flex flex-col gap-3 p-4 w-[400px]'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi dicta deleniti at, itaque delectus sint fugit voluptate asperiores alias! Magnam iure, nesciunt consequuntur dolores ratione possimus aut explicabo saepe fugit.
        Deserunt nesciunt repellendus, perspiciatis, ratione possimus autem, fugit eum vel minima atque quis. Delectus, excepturi perferendis reiciendis quo debitis qui placeat possimus nisi vero tenetur molestiae voluptatem quibusdam sapiente doloremque?
        Quis, optio natus. Nesciunt voluptatibus quos incidunt necessitatibus laudantium numquam praesentium beatae. Repellat temporibus dolore recusandae facere, perferendis eaque esse veritatis vel aspernatur cupiditate quae numquam accusamus quasi, atque voluptatem?
      </Card>
    </div>
  )
}

export default CartAddress