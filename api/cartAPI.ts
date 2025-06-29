import { AddItem, CartDTO, RemoveItem, SuccessResponseDTO, ErrorResponseDTO } from "@/types";
import { AxiosInstance } from "./axios";
import Cookies from 'js-cookie';
import { handleAPIError, headersWithToken, unknownError } from "@/utils/helpers";

const PATH = "cart";

  export const getCartFromSession = async (userId: string): Promise<SuccessResponseDTO<CartDTO> | ErrorResponseDTO> => {
  try {
    const response = await fetch(`http://localhost:4000/api/cart/fromUser?user=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + Cookies.get('token'),
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
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
    return unknownError;
  }
}


export const addItem = async (addItem: AddItem): Promise<SuccessResponseDTO<CartDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<CartDTO>>(PATH + "/add", addItem , headersWithToken );
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const removeItem = async (removeItem: RemoveItem): Promise<SuccessResponseDTO<CartDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<CartDTO>>(PATH + "/remove", removeItem, headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const updateShippingCost = async (shippingCost: string, distance: number, cartId: string): Promise<SuccessResponseDTO<CartDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<CartDTO>>(PATH + "/shipping", { shippingCost, distance, cartId } , headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const clearCart = async (id: string): Promise<SuccessResponseDTO<CartDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<CartDTO>>(PATH + "/clear?cart="+id, headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}
