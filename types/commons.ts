export interface ResponseDTO {
    message: string;
    success: boolean;
    statusCode: string;
}

export interface SuccessResponseDTO<T> extends ResponseDTO {
    content: T;
}

export interface ErrorResponseDTO extends ResponseDTO {
}