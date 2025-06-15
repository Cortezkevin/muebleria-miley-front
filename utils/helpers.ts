import { ErrorResponseDTO } from "@/types";

export const unknownError: ErrorResponseDTO = {
    message: "An error has ocurred",
    success: false,
    statusCode: "UNKNOW_ERROR"
}