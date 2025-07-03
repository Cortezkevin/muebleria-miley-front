import { SuccessResponseDTO, ErrorResponseDTO, CarrierDTO, NewCarrierDTO } from "@/types";
import { AxiosInstance } from "./axios"
import Cookies from 'js-cookie';
import { handleAPIError, headersWithToken } from "@/utils";

const PATH = "carrier";

export const getAll = async (): Promise<SuccessResponseDTO<CarrierDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<CarrierDTO[]>>(PATH, headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const create = async (carrier: NewCarrierDTO): Promise<SuccessResponseDTO<CarrierDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<CarrierDTO>>(PATH, carrier, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const availableStatus = async ( carrierId: string ): Promise<SuccessResponseDTO<CarrierDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<CarrierDTO>>(PATH + "/available/" + carrierId, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

