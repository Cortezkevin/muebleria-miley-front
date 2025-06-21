import { CSSProperties } from "react";

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

export interface IconSvgProps {
    size?: number;
    width?: number | string;
    height?: number | string;
    className?: string;
}