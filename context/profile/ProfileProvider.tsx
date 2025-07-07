"use client";

import { ReactElement, useEffect, useReducer } from "react";
import { ProfileContext, ProfileReducer } from "./";
import { AddressDTO, UpdateProfileDTO, UserDTO, SuccessResponseDTO, PersonalDataDTO } from "@/types";
import { AddressAPI, ProfileAPI } from "@/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface ProfileState {
  isSavingAddress: boolean;
  isSavingPersonalData: boolean;
  loadingPersonalData: boolean;
  loadingAddress: boolean;
  personal?: PersonalDataDTO;
  address?: AddressDTO;
}

const name_INITIAL_STATE: ProfileState = {
  isSavingAddress: false,
  isSavingPersonalData: false,
  loadingPersonalData: false,
  loadingAddress: false,
  personal: undefined,
  address: undefined
};

export default function ProfileProvider({ children }: Props) {
  const { isLogged } = useAuth();
  const [state, dispatch] = useReducer(ProfileReducer, name_INITIAL_STATE);

  useEffect(() => {
    if(!isLogged) {
      const addressMemory = JSON.parse(Cookies.get("address") || "null") as AddressDTO ;
      if(addressMemory){
        dispatch({
          type: "[Profile] - Load Address",
          payload: addressMemory
        });
      }
    }else {
      console.log("USER IS LOGGED");
      (async() => {
        await loadAddress();
        await loadPersonalData();
      })();
    }
  }, [isLogged]);

  const loadPersonalData = async () => {
    dispatch({
      type: "[Profile] - Loading Personal Data",
      payload: true
    });

    const response = await ProfileAPI.getFromSession();
    if(response.success){
      const data = response as SuccessResponseDTO<PersonalDataDTO>;
      dispatch({
        type: "[Profile] - Load Personal Data",
        payload: data.content
      });
    }else {
      toast.error(response.message);
      dispatch({
        type: "[Profile] - Loading Personal Data",
        payload: false
      });
    }
  }

  const loadAddress = async () => {
    dispatch({
      type: "[Profile] - Loading Address",
      payload: true
    });

    const response = await AddressAPI.getAddressFromSession();
    if(response.success){
      const data = response as SuccessResponseDTO<AddressDTO>;
      dispatch({
        type: "[Profile] - Load Address",
        payload: data.content
      });
    }else {
      toast.error(response.message);
      dispatch({
        type: "[Profile] - Loading Address",
        payload: false
      });
    }
  }

  const handleUpdateAddress = async ( address: AddressDTO ) => {
    dispatch({
      type: "[Profile] - Saving Address",
      payload: true
    })
    const response = await AddressAPI.update(address);
    if( response?.success ){
      const data = response as SuccessResponseDTO<AddressDTO>;
      dispatch({
        type: "[Profile] - Update Address",
        payload: data.content
      })
      toast.success(data.message);
    }else {
      toast.error(response?.message || "Ocurrio un error");
      dispatch({
        type: "[Profile] - Saving Address",
        payload: false
      })
    }
  }

  const handleUpdateAddressMemory = (address: AddressDTO) => {
    Cookies.set("address", JSON.stringify( address ));
    dispatch({
      type: "[Profile] - Update Address",
      payload: address
    })
  }

  const handleUpdatePersonalData = async ( profile: UpdateProfileDTO, file?: File ) => {
    dispatch({
      type: "[Profile] - Saving Personal Data",
      payload: true
    })
    const response = await ProfileAPI.update( profile, file );
    if( response?.success ){
      const data = response as SuccessResponseDTO<UserDTO>;
      dispatch({
        type: "[Profile] - Update Personal Data",
        payload: {
          phone: data.content.profile.phone,
          birthdate: data.content.profile.birthDate,
          firstName: data.content.firstName,
          lastName: data.content.lastName
        }
      });
      toast.success(data.message);
      dispatch({
        type: "[Profile] - Saving Personal Data",
        payload: false
      })
      return true;
    }else {
      toast.error(response?.message || "Ocurrio un error, vuelve a intentarlo");
      dispatch({
        type: "[Profile] - Saving Personal Data",
        payload: false
      })
      return false;
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        onUpdateAddress: handleUpdateAddress,
        onUpdateAddressMemory: handleUpdateAddressMemory,
        onUpdatePersonalData: handleUpdatePersonalData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
