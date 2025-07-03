import { SuccessResponseDTO, GrocerDTO, NewGrocerDTO, ErrorResponseDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { handleAPIError, headersWithToken } from "@/utils";

const PATH = "grocer";

export const getAll = async (): Promise<SuccessResponseDTO<GrocerDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<GrocerDTO[]>>(PATH, headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const create = async (grocer: NewGrocerDTO): Promise<SuccessResponseDTO<GrocerDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<GrocerDTO>>(PATH, grocer, headersWithToken);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}
