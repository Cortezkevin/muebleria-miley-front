import { ProductTopOptionsDTO, SuccessResponseDTO, ErrorResponseDTO, SalesDashboardDTO, SalesByMonthDTO, SalesByUserDTO, SalesByProductDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import { handleAPIError } from "@/utils";

const PATH = "dashboard";

export const sales = async (): Promise<SuccessResponseDTO<SalesDashboardDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<SalesDashboardDTO>>(PATH + "/sales");
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const salesMonthByYear = async ( year: number ): Promise<SuccessResponseDTO<SalesByMonthDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<SalesByMonthDTO[]>>(PATH + "/sales/month/" + year);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const salesTopByClient = async ( top: number ): Promise<SuccessResponseDTO<SalesByUserDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<SalesByUserDTO[]>>(PATH + "/sales/user/" + top);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const salesTopByProduct = async ({ top, year, month, order }: ProductTopOptionsDTO): Promise<SuccessResponseDTO<SalesByProductDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<SalesByProductDTO[]>>(`${PATH}/sales/product?top=${top}&year=${year}&month=${month}&order=${order}`);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}