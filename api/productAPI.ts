import { ProductDTO, CreateProductDTO, SuccessResponseDTO, ErrorResponseDTO, DetailedProductDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';
import { unknownError } from "@/utils/helpers";

const PATH = "product";

export const getAll = async (): Promise<SuccessResponseDTO<ProductDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<ProductDTO[]>>(PATH + "/public");
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

export const getDetailsById = async (id: string): Promise<SuccessResponseDTO<DetailedProductDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<DetailedProductDTO>>(PATH + "/public/" + id);
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

export const create = async (createProductDTO: CreateProductDTO, images: File[]): Promise<SuccessResponseDTO<ProductDTO> | ErrorResponseDTO> => {
  const formData = new FormData();
  formData.append('body', JSON.stringify(createProductDTO));
  for(let i = 0;i < images.length; i++ ){
    formData.append('files', images[i]);
  }
  
  try{
    const { data } = await AxiosInstance.post<SuccessResponseDTO<ProductDTO>>(PATH, formData, {
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

/*export const update = async (updateProduct: UpdateProduct) => {
  try{
    const { data } = await AxiosInstance.put<ResponseWrapper<IProduct>>(PATH , updateProduct , {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    } );
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ResponseWrapper<String>;
      }
      return e.response!.data as ResponseWrapper<any>;
    }
  } 
}*/