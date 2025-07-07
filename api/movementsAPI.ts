import { CreateInventoryMovementDTO, DetailedMovementsDTO, MovementsDTO, SuccessResponseDTO, ErrorResponseDTO, UpdateInventoryMovementDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { handleAPIError } from "@/utils";

const PATH = "movements";

export const getAll = async (): Promise<SuccessResponseDTO<MovementsDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<MovementsDTO[]>>(PATH);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const getById = async ( id: string ): Promise<SuccessResponseDTO<DetailedMovementsDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<DetailedMovementsDTO>>(PATH + "/" + id);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const create = async ( movement: CreateInventoryMovementDTO ): Promise<SuccessResponseDTO<MovementsDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<MovementsDTO[]>>(PATH,movement);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const update = async ( movement: UpdateInventoryMovementDTO ): Promise<SuccessResponseDTO<MovementsDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<MovementsDTO>>(PATH,movement);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}