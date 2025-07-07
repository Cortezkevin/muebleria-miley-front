import { AddressDTO, ErrorResponseDTO, SuccessResponseDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { handleAPIError } from "@/utils/helpers";

const PATH = "address";

export const update = async (address: AddressDTO ): Promise<SuccessResponseDTO<AddressDTO> | ErrorResponseDTO> => {
  try{
    const { data } = await AxiosInstance.put<SuccessResponseDTO<AddressDTO>>(PATH, address);
    return data;
  }catch(e){
    return handleAPIError(e);
  } 
}