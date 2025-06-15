import { CarrierDTO } from "../delivery/carrier";
import { GrocerDTO } from "../warehouse/grocer";
import { ProfileDTO } from "./profile";

export type UserDTO = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    profile: ProfileDTO;
    photoUrl: string;
    status: 'ACTIVO' | 'INACTIVO';
    roleExtraData?: GrocerDTO | CarrierDTO | null;
}