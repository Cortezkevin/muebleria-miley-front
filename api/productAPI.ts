import { ProductDTO, CreateProductDTO, SuccessResponseDTO, ErrorResponseDTO, DetailedProductDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import { handleAPIError, headersMultipartWithToken, unknownError } from "@/utils/helpers";

const PATH = "product";

export const getAll = async (): Promise<SuccessResponseDTO<ProductDTO[]> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<ProductDTO[]>>(PATH + "/public");
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const getDetailsById = async (id: string): Promise<SuccessResponseDTO<DetailedProductDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.get<SuccessResponseDTO<DetailedProductDTO>>(PATH + "/public/" + id);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}

export const create = async (createProductDTO: CreateProductDTO, images: File[]): Promise<SuccessResponseDTO<ProductDTO> | ErrorResponseDTO> => {
  const formData = new FormData();
  formData.append('body', JSON.stringify(createProductDTO));
  for(let i = 0;i < images.length; i++ ){
    formData.append('files', images[i]);
  }
  
  try{
    if(createProductDTO.colorImages && createProductDTO.colorImages.length > 0){
      const { data } = await AxiosInstance.post<SuccessResponseDTO<ProductDTO>>(PATH+"/color_images", formData, headersMultipartWithToken);
      return data;
    }else {
      const { data } = await AxiosInstance.post<SuccessResponseDTO<ProductDTO>>(PATH+"/default-images", formData, headersMultipartWithToken);
      return data;
    }
  }catch(e){
    return handleAPIError(e);
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