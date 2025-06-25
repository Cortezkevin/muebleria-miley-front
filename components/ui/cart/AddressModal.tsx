
import { Button } from '@heroui/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import React, { FC } from 'react'
import { Map } from './Map';
import { AuthContext } from '@/context/auth';
import Cookies from 'js-cookie';
import { CartContext } from '@/context/cart';
import { AddressDTO } from '@/types';

type Props = {
  isOpen: boolean;
  handleOpenModal: ( isOpen: boolean ) => void;
}

export const AddressModal: FC<Props> = ({ isOpen, handleOpenModal }) => {

  const [addressSelected, setAddressSelected] = React.useState<{ address: AddressDTO, distanceCost: string, distance: number }>({
    address: {
      id: "",
      department: "",
      district: "",
      fullAddress: "",
      lng: 0,
      lta: 0,
      postalCode: 0,
      province: "",
      street: "",
      urbanization: ""
    },
    distance: 0.0,
    distanceCost: "0.00",
  });

  const [memoryAddress, setMemoryAddress] = React.useState<AddressDTO | undefined>(undefined);

  const { onUpdateAddress, onUpdateAddressMemory, user: { profile: { address } }, isLogged } = React.useContext(AuthContext);
  const { onChangeShippingCost, onChangeShippingCostMemory } = React.useContext(CartContext);

  const handleSaveAddress = () => {
    if( isLogged ){
      onUpdateAddress( addressSelected.address );
      onChangeShippingCost( addressSelected.distanceCost, addressSelected.distance );
    }else {
      onUpdateAddressMemory( addressSelected.address );
      onChangeShippingCostMemory(  addressSelected.distanceCost );
    }
    handleOpenModal( false );
  }

  React.useEffect(() => {
    const address = JSON.parse(Cookies.get("address") || "null") as AddressDTO;
    if( address ){
      setMemoryAddress( address );
    }else {
      setMemoryAddress( undefined );
    }
  }, [])

  return (
    <Modal isOpen={isOpen} size='3xl' className='z-[200]' placement="center" onOpenChange={ handleOpenModal }>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Direccion de Entrega
            </ModalHeader>
            <ModalBody>
              <Map onSelectDirection={a => {
                setAddressSelected({ address: a.address, distance: a.distance, distanceCost: a.distanceCost })
              }}  initDestination={ 
                address
                ? address.lta && address.lng ? { lat: address.lta , lng: address.lng } : undefined
                : memoryAddress 
                ? { lat: memoryAddress.lta, lng: memoryAddress.lng } 
                : undefined } 
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cerrar
              </Button>
              <Button
                color="primary"
                className=" text-white"
                onPress={handleSaveAddress}
              >
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}