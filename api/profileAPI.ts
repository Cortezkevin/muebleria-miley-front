import { SuccessResponseDTO, ErrorResponseDTO, UpdateProfileDTO, UserDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { handleAPIError, headersMultipart } from "@/utils/helpers";

const PATH = "profile";

export const update = async ( profile: UpdateProfileDTO, image?: File ): Promise<SuccessResponseDTO<UserDTO> | ErrorResponseDTO> => {
  const formData = new FormData();
  if(image){
    formData.append('file', image);
  }
  formData.append('body', JSON.stringify(profile));
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<UserDTO>>(PATH, formData, headersMultipart);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}