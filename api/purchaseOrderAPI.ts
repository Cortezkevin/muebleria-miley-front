import { CreatePurchaseOrderDTO, DetailedPurchaseOrderDTO, PurchaseOrderDTO, SuccessResponseDTO, ErrorResponseDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { handleAPIError, headersWithToken } from "@/utils";

const PATH = "purchase_order";

export const getAll = async (): Promise<SuccessResponseDTO<PurchaseOrderDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<PurchaseOrderDTO[]>>(PATH, headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const getById = async ( id: string): Promise<SuccessResponseDTO<DetailedPurchaseOrderDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<DetailedPurchaseOrderDTO>>(PATH + "/" + id, headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const cancel = async ( id: string): Promise<SuccessResponseDTO<DetailedPurchaseOrderDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<DetailedPurchaseOrderDTO>>(PATH + "/cancel/" + id, headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const create = async (newPurchaseOrder: CreatePurchaseOrderDTO): Promise<SuccessResponseDTO<PurchaseOrderDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<PurchaseOrderDTO>>(PATH, newPurchaseOrder, headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}
