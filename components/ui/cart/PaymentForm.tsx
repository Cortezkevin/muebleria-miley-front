import React, { FC } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "@heroui/button";
import toast from "react-hot-toast";
import { CartContext } from "@/context/cart";
import { Image } from "@heroui/image";
import { AuthContext } from "@/context/auth";
import Cookies from 'js-cookie';
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { CancelPaymentProcessModal } from "./CancelPaymentProcessModal";

type Props = {
  intentId: string;
}

export const PaymentForm: FC<Props> = ({ intentId }) => {
  const { user } = React.useContext(AuthContext);
  const { total, onClear, id } = React.useContext(CartContext);
  const [saveEvent, setSaveEvent] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [cancelProcessModal, setCancelProcessModal] = React.useState(false);

  const [isCompletedForm, setIsCompletedForm] = React.useState(false);

  const stripe = useStripe();
  const elements = useElements();

  React.useEffect(() => {
    if (id && saveEvent) {
      onClear();
    }
  }, [id, saveEvent]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if( user.id ){
      if (!stripe || !elements) {
        toast.error("Ocurrio un error al procesar su Pago");
        return;
      }
      setIsProcessing(true);
      setSaveEvent(true);
  
      console.log(user.id)

      let returnUrl = "";
      const extraData: { specific: string, note: string } = JSON.parse(Cookies.get("extraOrderData") || "null");
      if( extraData ){
        returnUrl = `http://localhost:4000/api/payment/success?user=${user.id}&note=${extraData.note}&specific=${extraData.specific}`;
      }else {
        returnUrl = `http://localhost:4000/api/payment/success?user=${user.id}`;
      }
  
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
      });
  
      if (error) {
        setErrorMessage(error.message || "Ocurrio un error");
      } else {
        toast.success("Compra realizada correctamente");
      }
      setIsProcessing(false);
    }else {
      toast.error("No id usaurio");
    }
  };

  const handleChangePaymentForm = (e: StripePaymentElementChangeEvent) => {
    setIsCompletedForm(e.complete);
  }

  const handleCancelProcess = () => {
    setCancelProcessModal(true);
  }

  return (
    <div className="rounded-lg shadow-l flex flex-col gap-8 items-center">
      <div className="flex flex-col items-center">
        {/* <Image src="/LOGO.jpeg" width={200} height={100} alt="Logo" /> */}
        <h1 className="text-2xl font-semibold text-center">
          ¡Estas a punto de completar tu compra!
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[400px]">
        <h2 className="text-lg font-semibold text-center">
          Realizar Pago y Generar el Pedido
        </h2>
        <PaymentElement onChange={handleChangePaymentForm} />
        <div className="flex flex-col gap-3">
          <Button
            isDisabled={ !isCompletedForm }
            className="hover:text-white"
            color="primary"
            variant="solid"
            size="lg"
            type="submit"
            isLoading={isProcessing}
          >
            {
              isProcessing
              ? "Procesando"
              : (<div className="flex gap-2">
              Pagar<p className="text-lg font-semibold">{"S/." + total}</p>
              </div>)
            }
          </Button>
          <Button 
            color="danger" 
            variant="flat"
            onPress={handleCancelProcess}
          >
            Cancelar Operacion
          </Button>
        </div>
        {errorMessage !== "" && (
          <span className="p-3 bg-red-300 border border-red-600 text-red-600 rounded-md mt-2 text-center">
            {errorMessage}
          </span>
        )}
      </form>
      <CancelPaymentProcessModal intentId={intentId} isOpen={cancelProcessModal} handleOpenModal={isOpen => setCancelProcessModal(isOpen)} />
    </div>
  );
}
