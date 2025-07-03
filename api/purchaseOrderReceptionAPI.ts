import { AcceptAndRejectPurchaseOrderDTO, DetailedPurchaseOrderReceptionDTO, PurchaseOrderReceptionDTO, SuccessResponseDTO, ErrorResponseDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { handleAPIError, headersWithToken } from "@/utils";

const PATH = "purchase_order_reception";

export const getAll = async (): Promise<SuccessResponseDTO<PurchaseOrderReceptionDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<PurchaseOrderReceptionDTO[]>>(PATH, headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const getById = async ( id: string ): Promise<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO>>(PATH + "/" + id , headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const startOrderReception = async ( receptionId: string, purchaseOrderId: string, grocerId: string): Promise<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO>>(`${PATH}/${receptionId}?purchaseOrderId=${purchaseOrderId}&grocerId=${grocerId}`, headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const checkReviewOrderReception = async ( receptionId: string ): Promise<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO>>(`${PATH}/${receptionId}`, headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const acceptOrRejectOrderMaterials = async ( receptionId: string, acceptOrRejectPurchaseOrder: AcceptAndRejectPurchaseOrderDTO ): Promise<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO>>(`${PATH}/acceptOrReject/${receptionId}`, acceptOrRejectPurchaseOrder , headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}