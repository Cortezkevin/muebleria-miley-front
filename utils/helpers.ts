import { ErrorResponseDTO } from "@/types";
import { isAxiosError } from "axios";
import Cookies from "js-cookie";

export const unknownError: ErrorResponseDTO = {
  message: "An error has ocurred",
  success: false,
  statusCode: "UNKNOW_ERROR"
}
export const handleAPIError = (e: unknown) => {
  if (isAxiosError(e)) {
    if (e.response?.status === 404) {
      return e.response!.data as ErrorResponseDTO;
    }
    return e.response!.data as ErrorResponseDTO
  }
  return unknownError;
}

export const headersWithToken = {
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + Cookies.get("token")
  }
}

export const headersMultipartWithToken = {
  "headers": {
    "Content-Type": "multipart/form-data",
    "Authorization": "Bearer " + Cookies.get("token")
  }
}