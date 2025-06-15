import { CategoryDTO, JwtTokenDTO, SuccessResponseDTO, ErrorResponseDTO, UpdateCategoryDTO, CreateCategoryDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';
import { unknownError } from "@/utils/helpers";

const PATH = "category";

export const create = async (data: CreateCategoryDTO, image: File) => {
  const formData = new FormData();
  formData.append('body', JSON.stringify(data));
  formData.append('file', image);
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<CategoryDTO>>(PATH, formData, {
      "headers": {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }
    return unknownError;
  } 
}

export const update = async (data: UpdateCategoryDTO, image?: File) => {
  const formData = new FormData();
  if(image){
    formData.append('file', image);
  }
  formData.append('body', JSON.stringify( data ));
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<CategoryDTO>>(PATH, formData, {
      "headers": {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }
    return unknownError;
  } 
}

export const getAll = async () => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<CategoryDTO[]>>(PATH + "/public");
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }
    return unknownError;
  } 
}