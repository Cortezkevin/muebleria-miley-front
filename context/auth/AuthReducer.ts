"use client";
import { AddressDTO, UpdateProfileDTO, UserDTO } from '@/types';
import { AuthState } from './'

type AuthAction = 
{ 
  type: '[Auth] - Login',
  payload: {
    isAdmin: boolean;
    user: UserDTO
  }
} |
{ 
  type: '[Auth] - Saving Address',
  payload: boolean
} | 
{ 
  type: '[Auth] - Saving Profile',
  payload: boolean
} | 
{ 
  type: '[Auth] - Update Address',
  payload: AddressDTO
} |
{
  type: '[Auth] - Update Profile',
  payload: UserDTO
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
        user: {
          ...state.user,
          roleExtraData: state.user.roleExtraData && {
            //...state.user.roleExtraData,
            status: "DISPONIBLE"
          }
        }
      }
    case '[Auth] - Login':
      return {
        ...state,
        isLogged: true,
        isAdmin: action.payload.isAdmin,
        user: action.payload.user
      };
    case '[Auth] - Saving Address':
      return {
        ...state,
        isSavingAddress: action.payload
      }
    case '[Auth] - Update Address':
      return {
        ...state,
        isSavingAddress: false,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            address: action.payload,
          }
        }
      }
    case '[Auth] - Saving Profile':
      return {
        ...state,
        isSavingProfile: action.payload
      }
    case '[Auth] - Update Profile':
      return {
        ...state,
        user: action.payload/* {
          ...state.user,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          photoUrl: action.payload.photoUrl,
          profile: {
            ...state.user.profile,
            phone: action.payload.profile.phone,
            birthDate: action.payload.profile.birthDate
          }
        } */
      }
    case '[Auth] - Logout':
      return {
        ...state,
        isAdmin: false,
        isLogged: false,
        user: {
          id: "",
          email: "",
          firstName: "",
          lastName: "",
          photoUrl: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
          roles: [],
          status: "ACTIVO",
          profile: {
            birthDate: "",
            address: undefined,
            phone: ""
          }
        }
      }
    default:
      return state;
  }
}