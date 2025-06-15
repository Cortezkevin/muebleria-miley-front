export type ProfileDTO = {
    birthDate: string;
    address?: AddressDTO;
    phone: string;
}

export type AddressDTO = {
    id: string;
    lta: number;
    lng: number;
    department: string;
    province: string;
    district: string;
    urbanization: string;
    street: string;
    postalCode: number;
    fullAddress: string;
}

export type MemoryAddressDTO = {
    lta: number;
    lng: number;
    department: string;
    province: string;
    district: string;
    urbanization: string;
    street: string;
    postalCode: number;
    fullAddress: string;
}