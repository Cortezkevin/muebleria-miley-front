
import { PaymentAPI, UserAPI } from '@/api';
import { SuccessResponseDTO } from '@/types';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import { Chip } from '@heroui/react';
import React, { FC } from 'react'
import toast from 'react-hot-toast';

type Props = {
  idToDelete: string;
  isOpen: boolean;
  confirmationText: string;
  handleOpenModal: ( isOpen: boolean ) => void;
  onSuccessDelete: () => void;
}

export const LogicalDeleteModal: FC<Props> = ({ idToDelete, isOpen, handleOpenModal, confirmationText, onSuccessDelete }) => {

  const [confirmText, setConfirmText] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    const res = await UserAPI.deleteUser(idToDelete);
    if(res.success){
        const data = res as SuccessResponseDTO<any>;
        toast.success(data.message);
        onSuccessDelete();
        return;
    }
    toast.error(res.message);
    setIsLoading(false);
  }

  return (
    <Modal isOpen={isOpen} size='xl' className='z-[200]' placement="center" onOpenChange={ handleOpenModal }>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              ⚠️ Eliminación Logica del Recurso
            </ModalHeader>
            <ModalBody>
                <h3>¿Estás seguro de que deseas dar de baja al recurso <Chip color='danger'>{confirmationText}</Chip>?</h3>
                <Input 
                    value={confirmText}
                    onChange={e => setConfirmText(e.target.value)}
                    required variant='bordered'
                    label='Razon'
                    placeholder='Por favor escribe aqui el texto que esta marcado arriba'
                    description='Para confirmar la eliminacion del recurso seleccionado'
                />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="flat" onPress={onClose}>
                Cerrar
              </Button>
              <Button
                color="danger"
                className=" text-white"
                isDisabled={confirmText !== confirmationText}
                onPress={handleConfirmDelete}
                isLoading={isLoading}
              >
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}