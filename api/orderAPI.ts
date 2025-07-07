import { 
  DetailedOrderDTO, 
  DetailedPreparationOrderDTO, 
  DetailedShippingOrderDTO, 
  OrderDTO, 
  PreparationOrderDTO, 
  ShippingOrderDTO, 
  SuccessResponseDTO,
  ErrorResponseDTO,
  CompletedOrderPreparationDTO 
} from "@/types";
import { AxiosInstance } from "./axios"
import { handleAPIError, headersWithToken } from "@/utils/helpers";

const PATH = "order";

export const getAllOrders = async (): Promise<SuccessResponseDTO<OrderDTO[]> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<OrderDTO[]>>(PATH);
    return data;
  } catch (e) {
    return handleAPIError(e);
  }
}

export const getAllShippingOrders = async (): Promise<SuccessResponseDTO<ShippingOrderDTO[]> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<ShippingOrderDTO[]>>(PATH + "/shipping");
    return data;
  } catch (e) {
    return handleAPIError(e);
  }
}

export const getAllPreparationOrders = async (): Promise<SuccessResponseDTO<PreparationOrderDTO[]> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<PreparationOrderDTO[]>>(PATH + "/preparation");
    return data;
  } catch (e) {
    return handleAPIError(e);
  }
}

export const getPreparationOrder = async (preparationOrderId: string): Promise<SuccessResponseDTO<DetailedPreparationOrderDTO> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<DetailedPreparationOrderDTO>>(PATH + "/preparation/" + preparationOrderId);
    return data;
  } catch (e) {
    return handleAPIError(e);
  }
}

export const getShippingOrder = async (shippingOrderId: string): Promise<SuccessResponseDTO<DetailedShippingOrderDTO> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<DetailedShippingOrderDTO>>(PATH + "/shipping/" + shippingOrderId);
    return data;
  } catch (e) {
    return handleAPIError(e);
  }
}

export const getDetailedOrder = async (orderId: string): Promise<SuccessResponseDTO<DetailedOrderDTO> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<DetailedOrderDTO>>(PATH + "/" + orderId);
    return data;
  } catch (e) {
    return handleAPIError(e);
  }
}

export const getOrdersByUser = async (userId: string): Promise<SuccessResponseDTO<OrderDTO[]> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<OrderDTO[]>>(PATH + "/findBy/" + userId);
    return data;
  } catch (e) {
    return handleAPIError(e);
  }
}

export const cancel = async (orderId: string): Promise<SuccessResponseDTO<OrderDTO> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.put<SuccessResponseDTO<OrderDTO>>(PATH + "/cancel/" + orderId);
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}

export const startShippingOrder = async (data: { orderId: string, userId: string }): Promise<SuccessResponseDTO<ShippingOrderDTO> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<ShippingOrderDTO>>(PATH + "/shipping/start", data);
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}

export const checkPrepareShippingOrder = async (data: { orderShippingId: string }): Promise<SuccessResponseDTO<ShippingOrderDTO> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<ShippingOrderDTO>>(PATH + "/shipping/prepare", data);
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}

export const checkTransitShippingOrder = async (data: { orderShippingId: string }): Promise<SuccessResponseDTO<ShippingOrderDTO> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<ShippingOrderDTO>>(PATH + "/shipping/transit", data);
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}

export const completeShippingOrder = async (data: { orderShippingId: string }): Promise<SuccessResponseDTO<ShippingOrderDTO> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<ShippingOrderDTO>>(PATH + "/shipping/complete", data);
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}

export const startPreparationOrder = async (data: { orderId: string, userId: string }): Promise<SuccessResponseDTO<PreparationOrderDTO> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<PreparationOrderDTO>>(PATH + "/preparation/start", data);
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}

export const checkPackagingPreparationOrder = async (data: { preparationOrderId: string }): Promise<SuccessResponseDTO<PreparationOrderDTO> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<PreparationOrderDTO>>(PATH + "/preparation/packaging", data);
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}

export const completePreparationOrder = async (completePreparationOrder: CompletedOrderPreparationDTO): Promise<SuccessResponseDTO<PreparationOrderDTO> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<PreparationOrderDTO>>(PATH + "/preparation/complete", completePreparationOrder);
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}
