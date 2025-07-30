
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import React, { FC } from 'react'

type Props = {
  title: string;
  resourceName: string;
  action: string;
  isOpen: boolean;
  confirmationText: string;
  onOpenModal: ( isOpen: boolean ) => void;
  onConfirmAction: () => Promise<boolean>;
  onSuccessAction: () => void;
}

export const ConfirmActionModal: FC<Props> = ({ 
  title, 
  resourceName, 
  action, 
  isOpen, 
  onOpenModal, 
  onConfirmAction,
  confirmationText, 
  onSuccessAction 
}) => {
  const [confirmText, setConfirmText] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirmDeleteAction = async () => {
    setIsLoading(true);
    const isSuccess = await onConfirmAction();
    if(isSuccess){
      onSuccessAction();
      setConfirmText("");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  }

  return (
    <Modal isOpen={isOpen} size='xl' className='z-[200]' placement="center" onOpenChange={ onOpenModal }>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              { title }
            </ModalHeader>
            <ModalBody>
                <h3>¿Estás seguro de que deseas { action } al { resourceName } <b className='text-danger-500'>{ confirmationText }</b>?</h3>
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
                variant='flat'
                className=" text-white"
                isDisabled={confirmText !== confirmationText}
                onPress={handleConfirmDeleteAction}
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