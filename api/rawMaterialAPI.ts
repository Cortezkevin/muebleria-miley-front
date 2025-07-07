import { CreateRawMaterialDTO, RawMaterialDTO, SuccessResponseDTO, ErrorResponseDTO, UpdateRawMaterialDTO } from "@/types";
import { AxiosInstance } from "./axios"
import { handleAPIError } from "@/utils";

const PATH = "raw_material";

export const getAll = async (): Promise<SuccessResponseDTO<RawMaterialDTO[]> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<RawMaterialDTO[]>>(PATH);
    return data;
  } catch (e) {
    return handleAPIError(e);
  }
}

export const getBySupplier = async (supplierId: string): Promise<SuccessResponseDTO<RawMaterialDTO[]> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.get<SuccessResponseDTO<RawMaterialDTO[]>>(PATH + "/bySupplier?supplier=" + supplierId);
    return data;
  } catch (e) {
    return handleAPIError(e);
  }
}

export const create = async (newRawMaterial: CreateRawMaterialDTO): Promise<SuccessResponseDTO<RawMaterialDTO> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.post<SuccessResponseDTO<RawMaterialDTO>>(PATH, newRawMaterial);
    return data;
  } catch (e) {
    return handleAPIError(e);
  }
}

export const update = async (rawMaterial: UpdateRawMaterialDTO): Promise<SuccessResponseDTO<RawMaterialDTO> | ErrorResponseDTO> => {
  try {
    const { data } = await AxiosInstance.put<SuccessResponseDTO<RawMaterialDTO>>(PATH, rawMaterial);
    return data;
  } catch (e) {
    return handleAPIError(e);
  }
}