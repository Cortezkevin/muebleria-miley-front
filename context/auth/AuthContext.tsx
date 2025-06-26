"use client";

import { AddressDTO, UpdateProfileDTO, UserDTO, NewUserDTO } from '@/types';
import { createContext } from 'react';

export interface AuthProps {
  isLogged: boolean;
  isAdmin: boolean;
  user: UserDTO;
  isLoadingUserData: boolean;
  isSavingAddress: boolean;
  isSavingProfile: boolean;
  validateSession: () => void;
  //onAvailableStatus: ( id: string, type: "Carrier" | "Grocer" ) => void;
  onLogin: ( email: string, password: string ) => Promise<boolean>;
  onRegister: ( newUser: NewUserDTO ) => Promise<boolean>;
  onChangePassword: ( password: string, confirmPassword: string, token: string ) => Promise<boolean>;
  onLogout: () => void;
  onUpdateAddress: ( address: AddressDTO ) => void;
  onUpdateAddressMemory: ( address: AddressDTO ) => void;
  onUpdateProfile: ( profile: UpdateProfileDTO, file?: File ) => Promise<boolean>;
}
export const AuthContext = createContext({} as AuthProps);