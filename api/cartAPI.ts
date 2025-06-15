import { AddItem, CartDTO, RemoveItem, SuccessResponseDTO, ErrorResponseDTO } from "@/types";
import { AxiosInstance } from "./axios";
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';
import { unknownError } from "@/utils/helpers";

const PATH = "cart";

/* export const getCartFromSession = async (userId: string): Promise<SuccessResponseDTO<CartDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<CartDTO>>(PATH + "/fromUser?user=" + "465663ad-f60c-4fca-bde6-f277873f800b", {
      headers: {
        'Authorization': 'Bearer ' + Cookies.get("token")
      },
      
    });
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }
    return unknownError;
  } 
} */

  export const getCartFromSession = async (userId: string): Promise<SuccessResponseDTO<CartDTO> | ErrorResponseDTO> => {
  try {
    const response = await fetch(`http://localhost:4000/api/cart/fromUser?user=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + Cookies.get('token'),
        'Content-Type': 'application/json'
      }
    });
    console.log(response);

    if (!response.ok) {
      // Manejo especial para 404
      if (response.status === 404) {
        const errorData: ErrorResponseDTO = await response.json();
        return errorData;
      }
      const errorData: ErrorResponseDTO = await response.json();
      return errorData;
    }

    const data: SuccessResponseDTO<CartDTO> = await response.json();
    return data;

  } catch (error) {
    console.error("Error de red o desconocido:", error);
    return unknownError;
  }
}


export const addItem = async (addItem: AddItem): Promise<SuccessResponseDTO<CartDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<CartDTO>>(PATH + "/add", addItem , {
      "headers": {
        "Content-Type": "application/json"
      }
    } );
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }
    return unknownError;
  } 
}

export const removeItem = async (removeItem: RemoveItem): Promise<SuccessResponseDTO<CartDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<CartDTO>>(PATH + "/remove", removeItem , {
      "headers": {
        "Content-Type": "application/json"
      }
    } );
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }
    return unknownError;
  } 
}

export const updateShippingCost = async (shippingCost: string, distance: number, cartId: string): Promise<SuccessResponseDTO<CartDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<CartDTO>>(PATH + "/shipping", { shippingCost, distance, cartId } , {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    } );
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }
    return unknownError;
  } 
}

export const clearCart = async (id: string): Promise<SuccessResponseDTO<CartDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<CartDTO>>(PATH + "/clear?cart="+id, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    } );
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }
    return unknownError;
  } 
}
