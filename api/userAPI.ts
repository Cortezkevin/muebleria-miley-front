import { CreateUserModal, RoleDTO, UserDTO, SuccessResponseDTO, ErrorResponseDTO, UpdateProfileDTO, UpdateUserModal, GrocerDTO, CarrierDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { handleAPIError } from "@/utils";

const PATH = "user";

export const getUsers = async () => {
  try {
    const response = await AxiosInstance.get<SuccessResponseDTO<UserDTO[]>>(PATH);
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}

export const getExtraRoleData = async (): Promise<SuccessResponseDTO<GrocerDTO | CarrierDTO> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.get<SuccessResponseDTO<CarrierDTO | GrocerDTO>>(PATH+"/extraRoleData");
    return response.data;
  } catch (e) {
    return handleAPIError(e);
  }
}

export const getRoles = async (): Promise<SuccessResponseDTO<RoleDTO[]> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.get<SuccessResponseDTO<RoleDTO[]>>(PATH+"/roles");
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}

export const create = async (user: CreateUserModal): Promise<SuccessResponseDTO<UserDTO> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<UserDTO>>(PATH, user);
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}

export const update = async (user: UpdateUserModal): Promise<SuccessResponseDTO<UserDTO> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.put<SuccessResponseDTO<UserDTO>>(PATH, user);
    return response.data;
  } catch (e: any) {
    return handleAPIError(e);
  }
}

export const updateProfile = async (user: UpdateProfileDTO): Promise<SuccessResponseDTO<UserDTO> | ErrorResponseDTO> => {
  try {
    const response = await AxiosInstance.put<SuccessResponseDTO<UserDTO>>(PATH+"/profile", user);
    return response.data;
  } catch (e) {
    return handleAPIError(e);
  }
}