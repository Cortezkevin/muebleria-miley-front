import { SuccessResponseDTO, ErrorResponseDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { IServerPaymentIntent } from "@/types";
import { handleAPIError } from "@/utils/helpers";

const PATH = "payment";

export const createPaymentIntent = async (userId: string) => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<IServerPaymentIntent>>(PATH+"/createIndent?user="+userId);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const cancelPaymentIntent = async (reason: string, intentId: string): Promise<SuccessResponseDTO<string> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<string>>(PATH+"/cancelIntent/"+intentId+"?reason="+reason);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}
