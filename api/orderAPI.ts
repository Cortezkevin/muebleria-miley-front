import { 
  AddressDTO, 
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
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';
import { unknownError } from "@/utils/helpers";

const PATH = "order";

export const getAllOrders = async (): Promise<SuccessResponseDTO<OrderDTO[]> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<OrderDTO[]>>(PATH, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 404) {
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }else {
      return unknownError;
    }
  }
}

export const getAllShippingOrders = async (): Promise<SuccessResponseDTO<ShippingOrderDTO[]> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<ShippingOrderDTO[]>>(PATH + "/shipping", {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 404) {
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }else {
      return unknownError;
    }
  }
}

export const getAllPreparationOrders = async (): Promise<SuccessResponseDTO<PreparationOrderDTO[]> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<PreparationOrderDTO[]>>(PATH + "/preparation", {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 404) {
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }else {
      return unknownError;
    }
  }
}

export const getPreparationOrder = async (preparationOrderId: string): Promise<SuccessResponseDTO<DetailedPreparationOrderDTO> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<DetailedPreparationOrderDTO>>(PATH + "/preparation/" + preparationOrderId, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 404) {
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }else {
      return unknownError;
    }
  }
}

export const getShippingOrder = async (shippingOrderId: string): Promise<SuccessResponseDTO<DetailedShippingOrderDTO> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<DetailedShippingOrderDTO>>(PATH + "/shipping/" + shippingOrderId, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 404) {
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }else {
      return unknownError;
    }
  }
}

export const getDetailedOrder = async (orderId: string): Promise<SuccessResponseDTO<DetailedOrderDTO> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<DetailedOrderDTO>>(PATH + "/" + orderId, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 404) {
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }else {
      return unknownError;
    }
  }
}

export const getOrdersByUser = async (userId: string) => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<OrderDTO[]>>(PATH + "/findBy/" + userId, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 404) {
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }
  }
}

export const cancel = async (orderId: string) => {
  try {
    const response = await AxiosInstance.put<SuccessResponseDTO<OrderDTO>>(PATH + "/cancel/" + orderId, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}

export const startShippingOrder = async (data: { orderId: string, userId: string }) => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<ShippingOrderDTO>>(PATH + "/shipping/start", data, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}

export const checkPrepareShippingOrder = async (data: { orderShippingId: string }) => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<ShippingOrderDTO>>(PATH + "/shipping/prepare", data, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}

export const checkTransitShippingOrder = async (data: { orderShippingId: string }) => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<ShippingOrderDTO>>(PATH + "/shipping/transit", data, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}

export const completeShippingOrder = async (data: { orderShippingId: string }) => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<ShippingOrderDTO>>(PATH + "/shipping/complete", data, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}

export const startPreparationOrder = async (data: { orderId: string, userId: string }) => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<PreparationOrderDTO>>(PATH + "/preparation/start", data, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}

export const checkPackagingPreparationOrder = async (data: { preparationOrderId: string }) => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<PreparationOrderDTO>>(PATH + "/preparation/packaging", data, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}

export const completePreparationOrder = async (completePreparationOrder: CompletedOrderPreparationDTO) => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<PreparationOrderDTO>>(PATH + "/preparation/complete", completePreparationOrder, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}
