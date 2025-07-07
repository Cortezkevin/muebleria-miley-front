import { SuccessResponseDTO, ErrorResponseDTO, CarrierDTO, NewCarrierDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { handleAPIError } from "@/utils";

const PATH = "carrier";

export const getAll = async (): Promise<SuccessResponseDTO<CarrierDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<CarrierDTO[]>>(PATH);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const create = async (carrier: NewCarrierDTO): Promise<SuccessResponseDTO<CarrierDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<CarrierDTO>>(PATH, carrier);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const availableStatus = async ( carrierId: string ): Promise<SuccessResponseDTO<CarrierDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<CarrierDTO>>(PATH + "/available/" + carrierId);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

