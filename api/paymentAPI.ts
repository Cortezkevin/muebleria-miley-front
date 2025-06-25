import { SuccessResponseDTO, ErrorResponseDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';
import { IServerPaymentIntent } from "@/types";
import { unknownError } from "@/utils/helpers";

const PATH = "payment";

export const createPaymentIntent = async (userId: string) => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<IServerPaymentIntent>>(PATH+"/createIndent?user="+userId, {
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
      }else {
        return e.response!.data as ErrorResponseDTO;
      }
    }
    else {
      return unknownError;
    }
  } 
}