"use client";
import { AuthContext } from '@/context'
import { ProfileContext } from '@/context/profile';
import { useAuth } from '@/hooks/useAuth';
import { AddressDTO } from '@/types'
import { Button } from '@heroui/button'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Input, Textarea } from '@heroui/input'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import * as yup from "yup";

type ExtraData = {
  phone: string;
  specificAddress: string;
  note: string;
};

const phoneSchema = yup
  .string()
  .matches(/^9\d{8}$/, "Ingrese un numero valido")
  .required("Ingrese un numero de telefono");


const CartAddress = () => {
  const { userId, email } = useAuth();
  const { onUpdatePersonalData, isSavingPersonalData, personal, address: userAddress } = useContext(ProfileContext);
  const [phoneTouched, setPhoneTouched] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState("");
   const [isValidPhone, setIsValidPhone] = React.useState(false);
  const [address, setAddress] = React.useState<AddressDTO>({
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
  });

  const [extraData, setExtraData] = React.useState<ExtraData>({
    phone: personal ? personal.phone : "",
    specificAddress: "",
    note: "",
  });

  const handleChangeExtraData = (dataName: keyof ExtraData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setExtraData((prev) => ({ ...prev, [dataName]: e.target.value }));
    };
  };

  const router = useRouter();

  React.useEffect(() => {
    if( userId && personal && personal.phone ){
      if( personal.phone.length > 0 ){
        setIsValidPhone( true );
      }
      setExtraData(prev => ({ ...prev, phone: personal.phone }));
    }
  },[ userId, personal ])

  React.useEffect(() => {
    if (phoneTouched) {
      validatePhone();
    }
  }, [extraData.phone]);

  React.useEffect(() => {
    if (userAddress) {
      setAddress(userAddress);
    }
  }, [userAddress])

  const validatePhone = () => {
    phoneSchema
      .validate(extraData.phone)
      .then((p) => {
        setIsValidPhone(true);
      })
      .catch((e) => {
        if (phoneTouched) {
          setPhoneError(e.message);
        }
        setIsValidPhone(false);
      });
  };

  const handleContinueOrder = async () => {
    if (userId && personal && extraData.phone !== "") {
      Cookies.set(
        "extraOrderData",
        JSON.stringify({
          specific: extraData.specificAddress,
          note: extraData.note,
        })
      );
      const result = await onUpdatePersonalData({
        userId,
        birthdate: personal.birthdate,
        firstName: personal.firstName,
        lastName: personal.lastName,
        phone: extraData.phone,
        email: email,
        photoUrl: ""
      });
      if( result ){
        router.push("/cart/checkout/payment");
      }
    }
  }

  return (
    <Card className='flex flex-col gap-3 w-full p-3'>
      <CardHeader className='flex flex-col gap-1 justify-start items-start'>
        <h3 className='text-xl'>Información de la Dirección</h3>
        <small>Valida la informacion guardada previamente como direccion de entrega del pedido</small>
      </CardHeader>
      <CardBody className='-mt-4'>
        <form className='flex flex-col gap-3'>
          <Input
            isReadOnly
            value={address.fullAddress} 
            label="Dirección 1" 
          />
          <Input 
            onChange={handleChangeExtraData("specificAddress")} 
            label="Direccion Especifica (Opcional)"
            placeholder='Especifica mas tu direccion aqui...'
            value={extraData.specificAddress}
          />
          <div className='flex gap-3'>
            <Input isReadOnly value={address.department} label="Departamento" />
            <Input isReadOnly value={address.district} label="Distrito" />
          </div>
          <div className='flex gap-3'>
            <Input isReadOnly value={address.street} label="Calle" />
            <Input 
              onChange={handleChangeExtraData("phone")} 
              value={extraData.phone} 
              isRequired 
              label="Telefono"
              type="text"
              maxLength={9}
              errorMessage={phoneError}
              isInvalid={!isValidPhone && phoneTouched}
              onFocus={() => setPhoneTouched(true)}
              onBlur={validatePhone}
              readOnly={personal && personal.phone !== ""}
            />
          </div>
          <Textarea 
            onChange={handleChangeExtraData("note")} 
            label="Nota (Opcional)" 
            placeholder='Algo que quieras decirle al repartidor...'
             value={extraData.note}
          />
          <Button 
            isDisabled={!isValidPhone}
            isLoading={isSavingPersonalData}
            onPress={handleContinueOrder}
            size='lg'
            >
            Continuar
          </Button>
          <span className='text-default-600 text-xs text-center'>Completa todos los campos requeridos para continuar</span>
        </form>
      </CardBody>
    </Card>
  )
}

export default CartAddress