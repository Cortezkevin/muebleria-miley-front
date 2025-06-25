import { CarrierDTO } from "../delivery/carrier";
import { GrocerDTO } from "../warehouse/grocer";
import { ProfileDTO } from "./profile";

export type Status = "ACTIVO" | "INACTIVO";

export type UserDTO = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    profile: ProfileDTO;
    photoUrl: string;
    status: Status;
    roleExtraData?: GrocerDTO | CarrierDTO | null;
}