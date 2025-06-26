import { SuccessResponseDTO, ErrorResponseDTO, UpdateProfileDTO, UserDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';
import { unknownError } from "@/utils/helpers";

const PATH = "profile";

export const update = async ( profile: UpdateProfileDTO, image?: File ): Promise<SuccessResponseDTO<UserDTO> | ErrorResponseDTO> => {
  const formData = new FormData();
  if(image){
    formData.append('file', image);
  }
  formData.append('body', JSON.stringify(profile));
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<UserDTO>>(PATH, formData, {
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
    }else {
      return unknownError;
    }
  } 
}