"use client";

import { NextPage } from 'next'
import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { IServerPaymentIntent, SuccessResponseDTO, UserDTO } from '@/types';
import { PaymentAPI } from '@/api';
import { Spinner } from '@heroui/spinner';
import { PaymentForm } from '@/components/ui/cart/PaymentForm';

const stripePromise = loadStripe('pk_test_51LDHfGCjrtAyA6AHzh36NEGKbzPiYM9Fel9h28wMMLA7J5LZjN0ritK5oBjhzgcAozDEj0vvi3mxpi4ymWM66VQ700YW2Rdpqk');

const CartPaymentPage: NextPage = () => {
  const [isLoaded, setisLoaded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [stripeClientSecret, setStripeClientSecret] = React.useState<string>("");
  const [intentId, setIntentId] = React.useState<string>("");
  
  React.useEffect(() => {
    const user = JSON.parse( Cookies.get("user") || "null" ) as UserDTO;
    if( !isLoaded ){
      if( user ){
        if(stripeClientSecret === "" ){
          getClientSecret( user ).then( res => {
            setStripeClientSecret( res );
          });
        }
      }
    }
  }, []);

  const getClientSecret = React.useCallback(async( user: UserDTO ) => {
    setIsLoading(true);
    const response = await PaymentAPI.createPaymentIntent( user.id );
    if( response?.success ){
      const data = response as SuccessResponseDTO<IServerPaymentIntent>;
      setisLoaded(true);
      setStripeClientSecret(data.content.clientSecret);
      setIntentId(data.content.intentId)
      setIsLoading(false);
      return data.content.clientSecret;
    }else {
      toast.error(response?.message || "Ocurrio un error");
      setIsLoading(false);
      return "";
    }
    
  },[]);

  return (
     <div className="min-h-[500px] p-6 flex items-center justify-center">
      {
        isLoading && (
          <Spinner label="Cargando..." size="lg" />
        )
      }
      {
        stripePromise && stripeClientSecret && (
          <Elements stripe={ stripePromise } options={{ clientSecret: stripeClientSecret }}>
            <PaymentForm intentId={ intentId }/> 
          </Elements>
        )
      }
    </div>
  )
}

export default CartPaymentPage