import { CreateSupplierDTO, SupplierDTO, SuccessResponseDTO, ErrorResponseDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { handleAPIError } from "@/utils";

const PATH = "supplier";

export const getAll = async (): Promise<SuccessResponseDTO<SupplierDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<SupplierDTO[]>>(PATH);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const create = async (newSupplier: CreateSupplierDTO): Promise<SuccessResponseDTO<SupplierDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<SupplierDTO>>(PATH, newSupplier);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const update = async (supplier: SupplierDTO): Promise<SuccessResponseDTO<SupplierDTO> | ErrorResponseDTO> => {  
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<SupplierDTO>>(PATH, supplier);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}