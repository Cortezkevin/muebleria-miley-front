import { ResourceStatus } from "../commons";
import { CarrierDTO } from "../delivery/carrier";
import { GrocerDTO } from "../warehouse/grocer";
import { ProfileDTO } from "./profile";

export type UserStatus = "ACTIVO" | "INACTIVO";

export type UserDTO = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    profile: ProfileDTO;
    photoUrl: string;
    userStatus: UserStatus;
    roleExtraData?: GrocerDTO | CarrierDTO | null;
}

export type MinimalUserDTO = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string;
    roles: string[];
    userStatus: UserStatus;
    resourceStatus: ResourceStatus
}