import { CartDTO, UserDTO, JwtTokenDTO, NewUserDTO, SuccessResponseDTO, ErrorResponseDTO, SessionDTO } from "@/types";
import { AxiosInstance } from "./axios"
import Cokkies from 'js-cookie';
import { handleAPIError } from "@/utils/helpers";
const PATH = "auth/";

export const login = async (email: string, password: string): Promise<SuccessResponseDTO<SessionDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<SessionDTO>>(PATH + "login", { email, password });
     if( data.success ){
      Cokkies.set('token', data.content.token);
      //Cokkies.set('user',JSON.stringify(data.content.user));
      const newMemoryCart: CartDTO = {
        id: "",
        user_id : "",
        cartItems: [],
        tax: "0.00",
        discount: "0.00",
        subtotal: "0.00",
        distance: 0.0,
        shippingCost: "0.00",
        total: "0.00"
      }
      Cokkies.set("cart", JSON.stringify(newMemoryCart));
      Cokkies.remove("address");
      return data;
    }else {
      return data as ErrorResponseDTO;
    }
  }catch(e){
    return handleAPIError(e);
  }
}

export const register = async (newUser: NewUserDTO): Promise<SuccessResponseDTO<SessionDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<SessionDTO>>(PATH + "register", newUser);
    if( data.success ){
      Cokkies.set('token', data.content.token);

      const newMemoryCart: CartDTO = {
        id: "",
        user_id : "",
        cartItems: [],
        tax: "0.00",
        discount: "0.00",
        subtotal: "0.00",
        distance: 0.0,
        shippingCost: "0.00",
        total: "0.00"
      }
      Cokkies.set("cart", JSON.stringify(newMemoryCart));
      Cokkies.remove("address");
    }
    return data;
  }catch(e){
    return handleAPIError(e);
  }
}

export const sendConfirmationEmail = async (to: string): Promise<SuccessResponseDTO<string> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<string>>(PATH + "sendConfirmationEmail?to=" + to);
    return data;
  }catch(e){
    return handleAPIError(e);
  }
}

export const changePassword = async (
  { password, confirmPassword, tokenPassword }: { password: string, confirmPassword: string, tokenPassword: string }
): Promise<SuccessResponseDTO<string> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<string>>(PATH + "changePassword", { password, confirmPassword, tokenPassword });
    return data;
  }catch(e){
    return handleAPIError(e);
  }
}

export const validateToken = async ( token: string  ): Promise<SuccessResponseDTO<UserDTO> | ErrorResponseDTO> => {
  try{
    const response = await fetch("http://localhost:4000/api/auth/getUserFromToken", 
    { method: "GET", credentials: "omit", headers: { "Authorization": "Bearer " + token }, }
    );
    const data = await response.json() as SuccessResponseDTO<UserDTO>;
    if( data && data.success ){
      Cokkies.set('user',JSON.stringify(data.content));
      return data;
    }else {
      Cokkies.remove("token");
      Cokkies.remove("user");
      return data;
    }
  }catch(e){
    Cokkies.remove("token");
    Cokkies.remove("user");
    return handleAPIError(e);
  }
}

export const saveDeviceWebToken = async (userId: string, token: string): Promise<SuccessResponseDTO<string> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<string>>(PATH + "device-token/web/" + userId + "?token="+token);
    return data;
  }catch(e){
    return handleAPIError(e);
  }
}