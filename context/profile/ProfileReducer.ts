"use client";
import { AddressDTO, PersonalDataDTO, UpdateProfileDTO, UserDTO } from '@/types';
import { ProfileState } from './'

type ProfileAction = 
{ 
  type: '[Profile] - Loading Address',
  payload: boolean
} | 
{ 
  type: '[Profile] - Loading Personal Data',
  payload: boolean
} |
{ 
  type: '[Profile] - Saving Address',
  payload: boolean
} | 
{ 
  type: '[Profile] - Saving Personal Data',
  payload: boolean
} |
{
  type: '[Profile] - Load Address',
  payload: AddressDTO
} |
{
  type: '[Profile] - Load Personal Data',
  payload: PersonalDataDTO
} |
{ 
  type: '[Profile] - Update Address',
  payload: AddressDTO
} |
{
  type: '[Profile] - Update Personal Data',
  payload: PersonalDataDTO
};

export const ProfileReducer = ( state: ProfileState, action: ProfileAction ): ProfileState => {
  switch( action.type ) {
    case '[Profile] - Saving Address':
      return {
        ...state,
        isSavingAddress: action.payload
      }
    case '[Profile] - Update Address':
      return {
        ...state,
        isSavingAddress: false,
        address: action.payload
      }
    case '[Profile] - Load Address':
      return {
        ...state,
        isSavingAddress: false,
        address: action.payload
      }
    case '[Profile] - Loading Address':
      return {
        ...state,
        loadingAddress: action.payload
      }
    case '[Profile] - Loading Personal Data':
      return {
        ...state,
        loadingPersonalData: action.payload
      }
    case '[Profile] - Load Personal Data':
      return {
        ...state,
        loadingPersonalData: false,
        personal: action.payload
      }
    case '[Profile] - Saving Personal Data':
      return {
        ...state,
        isSavingPersonalData: action.payload
      }
    case '[Profile] - Update Personal Data':
      return {
        ...state,
        isSavingPersonalData: false,
        personal: action.payload
      }
    default:
      return state;
  }
}