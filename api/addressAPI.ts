import { AddressDTO, SuccessResponseDTO, ErrorResponseDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';
import { unknownError } from "@/utils/helpers";

const PATH = "address";

export const update = async (address: AddressDTO ) => {
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<AddressDTO>>(PATH, address, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }else {
      return unknownError;
    }
  } 
}