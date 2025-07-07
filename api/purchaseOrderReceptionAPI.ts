import { AcceptAndRejectPurchaseOrderDTO, DetailedPurchaseOrderReceptionDTO, PurchaseOrderReceptionDTO, SuccessResponseDTO, ErrorResponseDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { handleAPIError } from "@/utils";

const PATH = "purchase_order_reception";

export const getAll = async (): Promise<SuccessResponseDTO<PurchaseOrderReceptionDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<PurchaseOrderReceptionDTO[]>>(PATH);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const getById = async ( id: string ): Promise<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO>>(PATH + "/" + id);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const startOrderReception = async ( receptionId: string, purchaseOrderId: string, grocerId: string): Promise<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO>>(`${PATH}/${receptionId}?purchaseOrderId=${purchaseOrderId}&grocerId=${grocerId}`);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const checkReviewOrderReception = async ( receptionId: string ): Promise<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO>>(`${PATH}/${receptionId}`);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const acceptOrRejectOrderMaterials = async ( receptionId: string, acceptOrRejectPurchaseOrder: AcceptAndRejectPurchaseOrderDTO ): Promise<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO>>(`${PATH}/acceptOrReject/${receptionId}`, acceptOrRejectPurchaseOrder);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}