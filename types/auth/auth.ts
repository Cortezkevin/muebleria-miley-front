import { MemoryCartDTO } from "../sales/cart";
import { MemoryAddressDTO, UserDTO } from "./";

export type LoginUserDTO = {
    email: string;
    password: string;
}

export type JwtTokenDTO = {
    token: string;
    user: UserDTO
}

export type SessionDTO = {
    token: string;
    email: string;
    photo: string;
    roles: string[];
}

export type NewUserDTO = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    memoryCart?: MemoryCartDTO;
    memoryAddress?: MemoryAddressDTO;
    isAdmin: boolean;
}