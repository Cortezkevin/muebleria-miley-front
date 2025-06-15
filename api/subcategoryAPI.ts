import { SubCategoryDTO, CreateSubCategoryDTO, SuccessResponseDTO, ErrorResponseDTO, UpdateSubCategoryDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';
import { unknownError } from "@/utils/helpers";

const PATH = "sub-category";

export const create = async (newSubCategory: CreateSubCategoryDTO, image: File): Promise<SuccessResponseDTO<SubCategoryDTO> | ErrorResponseDTO>  => {
  const formData = new FormData();
  formData.append('body', JSON.stringify(newSubCategory));
  formData.append('file', image);
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<SubCategoryDTO>>(PATH , formData, {
      "headers": {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    console.log(e);
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }else{
        return unknownError;
    }
  } 
}

export const update = async (updateSubCategory: UpdateSubCategoryDTO, image?: File): Promise<SuccessResponseDTO<SubCategoryDTO> | ErrorResponseDTO>  => {
  const formData = new FormData();
  if(image){
    formData.append('file', image);
  }
  formData.append('body', JSON.stringify(updateSubCategory ));
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<SubCategoryDTO>>(PATH, formData, {
      "headers": {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    console.log(e);
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }else {
        return unknownError;
    }
  } 
}

export const getAll = async (): Promise<SuccessResponseDTO<SubCategoryDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<SubCategoryDTO[]>>(PATH + "/public");
    return data;
  }catch(e){
    console.log(e);
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ErrorResponseDTO;
      }
      return e.response!.data as ErrorResponseDTO;
    }else{
        return unknownError;
    }
  } 
}