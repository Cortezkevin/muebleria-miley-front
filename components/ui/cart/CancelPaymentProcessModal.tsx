
import { PaymentAPI } from '@/api';
import { SuccessResponseDTO } from '@/types';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import React, { FC } from 'react'
import toast from 'react-hot-toast';

type Props = {
  isOpen: boolean;
  handleOpenModal: ( isOpen: boolean ) => void;
  intentId: string;
}

export const CancelPaymentProcessModal: FC<Props> = ({ isOpen, handleOpenModal, intentId }) => {

    const [reason, setReason] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirmCancelation = async () => {
    setIsLoading(true)
    const response = await PaymentAPI.cancelPaymentIntent(reason, intentId);
    if(response.success){
        const data = response as SuccessResponseDTO<string>;
        toast.success(data.content);
        handleOpenModal(false);
    }
    setIsLoading(false);
  }

  return (
    <Modal isOpen={isOpen} size='xl' className='z-[200]' placement="center" onOpenChange={ handleOpenModal }>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              ⚠️ Cancelar Pago
            </ModalHeader>
            <ModalBody>
                <h3>¿Estás seguro de que deseas cancelar esta operación?</h3>
                <Input 
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    required variant='bordered'
                    label='Razon'
                    placeholder='Por favor ingresa la razon de la cancelacion del pedido'
                    description='Para continuar con la cancelacion ingresa la razon'
                />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="flat" onPress={onClose}>
                Cerrar
              </Button>
              <Button
                color="danger"
                className=" text-white"
                isDisabled={reason.length === 0}
                onPress={handleConfirmCancelation}
                isLoading={isLoading}
              >
                Confirmar Cancelacion
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}