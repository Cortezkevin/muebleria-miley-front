import { CreateUserModal, RoleDTO, UserDTO, SuccessResponseDTO, ErrorResponseDTO, UpdateProfileDTO, UpdateUserModal } from "@/types";
import { AxiosInstance } from "./axios"
import Cookies from 'js-cookie';

const PATH = "user";

export const getUsers = async () => {
  try {
    const response = await AxiosInstance.get<SuccessResponseDTO<UserDTO[]>>(PATH, {
      "headers": {
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}

export const getRoles = async () => {
  try {
    const response = await AxiosInstance.get<SuccessResponseDTO<RoleDTO[]>>(PATH+"/roles", {
      "headers": {
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}

export const create = async (user: CreateUserModal) => {
  try {
    const response = await AxiosInstance.post<SuccessResponseDTO<UserDTO>>(PATH, user, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}

export const update = async (user: UpdateUserModal) => {
  try {
    const response = await AxiosInstance.put<SuccessResponseDTO<UserDTO>>(PATH, user, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}

export const updateProfile = async (user: UpdateProfileDTO) => {
  try {
    const response = await AxiosInstance.put<SuccessResponseDTO<UserDTO>>(PATH+"/profile", user, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}