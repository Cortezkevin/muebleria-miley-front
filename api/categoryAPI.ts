import { CategoryDTO, SuccessResponseDTO, ErrorResponseDTO, UpdateCategoryDTO, CreateCategoryDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { handleAPIError, headersMultipart } from "@/utils/helpers";

const PATH = "category";

export const getAll = async (): Promise<SuccessResponseDTO<CategoryDTO[]> | ErrorResponseDTO>  => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<CategoryDTO[]>>(PATH + "/public");
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const create = async (data: CreateCategoryDTO, image: File): Promise<SuccessResponseDTO<CategoryDTO> | ErrorResponseDTO> => {
  const formData = new FormData();
  formData.append('body', JSON.stringify(data));
  formData.append('file', image);
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<CategoryDTO>>(PATH, formData, headersMultipart);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const update = async (data: UpdateCategoryDTO, image?: File): Promise<SuccessResponseDTO<CategoryDTO> | ErrorResponseDTO> => {
  const formData = new FormData();
  if(image){
    formData.append('file', image);
  }
  formData.append('body', JSON.stringify( data ));
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<CategoryDTO>>(PATH, formData, headersMultipart);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}