export type CreateUserModal = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
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
    roles: string[];
}