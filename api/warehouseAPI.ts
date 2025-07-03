import { SuccessResponseDTO, ErrorResponseDTO, WarehouseDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { handleAPIError, headersWithToken } from "@/utils";

const PATH = "warehouse";

export const getAll = async (): Promise<SuccessResponseDTO<WarehouseDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<WarehouseDTO[]>>(PATH, headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const create = async (location: string): Promise<SuccessResponseDTO<WarehouseDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<WarehouseDTO>>(PATH + "?location=" + location, headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const update = async (warehouse: WarehouseDTO): Promise<SuccessResponseDTO<WarehouseDTO> | ErrorResponseDTO> => {  
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<WarehouseDTO>>(PATH, warehouse, headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}