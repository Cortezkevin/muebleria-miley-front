import { SuccessResponseDTO, ErrorResponseDTO, NotificationDTO } from "@/types";
import Cookies from 'js-cookie';
import { handleAPIError } from "@/utils/helpers";
import { AxiosInstance } from "./axios";

const PATH = "notification";

export const getFromSession = async (): Promise<SuccessResponseDTO<NotificationDTO[]> | ErrorResponseDTO> => {
  try{
    const { data, status } = await AxiosInstance.get<SuccessResponseDTO<NotificationDTO[]>>(PATH + "/fromSession");
    if( status === 204){
      console.log("VACIO")
      return {
        message: "No hay datos",
        content: [],
        success: true,
        statusCode: "201"
      }
    }
    return data;
  }catch(e){
    console.log("ERROR" , e);
    return handleAPIError(e);
  } 
}