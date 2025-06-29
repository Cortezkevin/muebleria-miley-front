import { CreateUserModal, RoleDTO, UserDTO, SuccessResponseDTO, ErrorResponseDTO, UpdateProfileDTO, UpdateUserModal } from "@/types";
import { AxiosInstance } from "./axios"
import { handleAPIError, headersWithToken } from "@/utils";

const PATH = "user";

export const getUsers = async () => {
  try {
    const response = await AxiosInstance.get<SuccessResponseDTO<UserDTO[]>>(PATH, headersWithToken);
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}

export const getRoles = async (): Promise<SuccessResponseDTO<RoleDTO[]> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.get<SuccessResponseDTO<RoleDTO[]>>(PATH+"/roles", headersWithToken);
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}

export const create = async (user: CreateUserModal): Promise<SuccessResponseDTO<UserDTO> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<UserDTO>>(PATH, user, headersWithToken);
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}

export const update = async (user: UpdateUserModal): Promise<SuccessResponseDTO<UserDTO> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.put<SuccessResponseDTO<UserDTO>>(PATH, user, headersWithToken);
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}

export const updateProfile = async (user: UpdateProfileDTO): Promise<SuccessResponseDTO<UserDTO> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.put<SuccessResponseDTO<UserDTO>>(PATH+"/profile", user, headersWithToken);
    return response.data;
  } catch (e) {
    return handleAPIError(e);
  }
}