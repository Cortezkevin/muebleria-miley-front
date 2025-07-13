"use client";
import { CarrierDTO, GrocerDTO } from '@/types';
import { AuthState } from './'

type AuthAction = 
{ 
  type: '[Auth] - Login',
  payload: {
    isAdmin: boolean;
    email: string;
    photo: string;
    roles: string[];
    id: string;
  }
} |
{
  type: "[Auth] - Load Extra Role Data",
  payload: GrocerDTO | CarrierDTO
} |
{
  type: "[Auth] - Logout"
} | {
  type: "[Auth] - Available Status"
};

export const AuthReducer = ( state: AuthState, action: AuthAction ): AuthState => {
  switch( action.type ) {
    case '[Auth] - Available Status':
      return {
        ...state,
        /* user: {
          ...state.user,
          roleExtraData: state.user.roleExtraData && undefined
        } */
      }
    case '[Auth] - Load Extra Role Data':
      return {
        ...state,
        roleExtraData: action.payload
      }
    case '[Auth] - Login':
      return {
        ...state,
        isLogged: true,
        isAdmin: action.payload.isAdmin,
        email: action.payload.email,
        photo: action.payload.photo,
        roles: action.payload.roles,
        userId: action.payload.id,
        isEmployee: action.payload.roles.length > 1
      };
    case '[Auth] - Logout':
      return {
        ...state,
        isAdmin: false,
        isLogged: false,
        email: '',
        photo: '',
        roles: []
      }
    default:
      return state;
  }
}