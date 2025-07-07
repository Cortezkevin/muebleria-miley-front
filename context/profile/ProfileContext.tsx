"use client";

import { AddressDTO, UpdateProfileDTO, PersonalDataDTO } from '@/types';
import { createContext } from 'react';

export interface ProfileProps {
  personal?: PersonalDataDTO;
  address?: AddressDTO;
  loadingPersonalData: boolean;
  loadingAddress: boolean;
  isSavingAddress: boolean;
  isSavingPersonalData: boolean;
  //onAvailableStatus: ( id: string, type: "Carrier" | "Grocer" ) => void;
  onUpdateAddress: ( address: AddressDTO ) => void;
  onUpdateAddressMemory: ( address: AddressDTO ) => void;
  onUpdatePersonalData: ( profile: UpdateProfileDTO, file?: File ) => Promise<boolean>;
}
export const ProfileContext = createContext({} as ProfileProps);