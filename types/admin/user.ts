import { Status } from "../auth";

export type CreateUserModal = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    status: Status;
    roles: string[];
}

export type RoleDTO = {
    value: string;
    key: string;
}

export type UpdateUserModal = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    status: Status;
    roles: string[];
}