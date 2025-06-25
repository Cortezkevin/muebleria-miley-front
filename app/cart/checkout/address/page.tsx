"use client";
import { AuthContext } from '@/context'
import { AddressDTO } from '@/types'
import { Button } from '@heroui/button'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Input } from '@heroui/input'
import { useRouter } from 'next/navigation';
import React from 'react'

const CartAddress = () => {
  const { user } = React.useContext(AuthContext);
  const [address, setAddress] = React.useState<AddressDTO>({ id: "",
      department: "",
      district: "",
      fullAddress: "",
      lng: 0,
      lta: 0,
      postalCode: 0,
      province: "",
      street: "",
      urbanization: "" });

  const router = useRouter();

  React.useEffect(() => {
    if(user.profile.address){
      setAddress(user.profile.address);
    }
  }, [user.profile.address])
  

  const handleContinueOrder = () => {
    router.push("/cart/checkout/payment");
  }

  return (
    <Card className='flex flex-col gap-3 w-full p-3'>
      <CardHeader className='flex flex-col gap-1 justify-start items-start'>
        <h3 className='text-xl'>Información de la Dirección</h3>
        <small>Valida la informacion guardada previamente como direccion de entrega del pedido</small>
      </CardHeader>
      <CardBody className='-mt-4'>
        <form action="" className='flex flex-col gap-3'>
          <Input value={address.fullAddress} label="Dirección 1" />
          <Input label="Dirección 2 (Opcional)" />
          <div className='flex gap-3'>
            <Input value={address.department} label="Departamento" />
            <Input value={address.district} label="Distrito" />
          </div>
          <Input value={address.street} label="Calle" />
          <Button onPress={handleContinueOrder} size='lg'>Continuar</Button>
        </form>
      </CardBody>
    </Card>
  )
}

export default CartAddress