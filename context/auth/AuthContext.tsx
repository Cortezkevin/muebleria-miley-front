"use client";

import { CarrierDTO, GrocerDTO, NewUserDTO } from '@/types';
import { createContext } from 'react';

export interface AuthProps {
  isLogged: boolean;
  isAdmin: boolean;
  userId?: string;
  email: string;
  photo: string;
  roles: string[];
  roleExtraData?: GrocerDTO | CarrierDTO;
  isEmployee: boolean;
  isLoadingUserData: boolean;
  validateSession: () => void;
  loadRoleExtraData: () => void;
  onAvailableStatus: ( id: string, type: "Carrier" | "Grocer" ) => void;
  onLogin: ( email: string, password: string ) => Promise<boolean>;
  onRegister: ( newUser: NewUserDTO ) => Promise<boolean>;
  onChangePassword: ( password: string, confirmPassword: string, token: string ) => Promise<boolean>;
  onLogout: () => void;
}
export const AuthContext = createContext({} as AuthProps);