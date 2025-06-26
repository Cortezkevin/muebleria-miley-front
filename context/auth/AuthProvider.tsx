"use client";

import { ReactElement, useEffect, useReducer, useState } from "react";
import { AuthContext, AuthReducer } from "./";
import { AddressDTO, CartDTO, UpdateProfileDTO, UserDTO, NewUserDTO, SuccessResponseDTO, JwtTokenDTO } from "@/types";
import { /* addressAPI, carrierAPI, */ AddressAPI, changePassword, login, ProfileAPI, /* profileAPI, */ register, validateToken } from "@/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface AuthState {
  isLogged: boolean;
  isAdmin: boolean;
  isSavingAddress: boolean;
  isSavingProfile: boolean;
  user: UserDTO;
}

const name_INITIAL_STATE: AuthState = {
  isAdmin: false,
  isLogged: false,
  isSavingAddress: false,
  isSavingProfile: false,
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
    },
    roleExtraData: null
  },
};

export default function AuthProvider({ children }: Props) {
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [state, dispatch] = useReducer(AuthReducer, name_INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(Cookies.get("user") || "null") as UserDTO;
    setIsLoadingUserData(true);
    const addressMemory = JSON.parse(Cookies.get("address") || "null") as AddressDTO ;
      if(addressMemory){
        dispatch({
          type: "[Auth] - Update Address",
          payload: addressMemory
        });
      }
    if( user ){
      if (user !== null && user !== undefined) {
        dispatch({
          type: "[Auth] - Login",
          payload: {
            isAdmin: user.roles.includes("ROLE_ADMIN"),
            user: user,
          },
        });
      } else {
        Cookies.remove("token");
        Cookies.remove("user");
        dispatch({
          type: "[Auth] - Logout",
        });
      }
    }
    const address = JSON.parse(Cookies.get("address") || "null") as AddressDTO;
    dispatch({
      type: "[Auth] - Update Address",
      payload: address
    })
    setIsLoadingUserData(false);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const data = await login(email, password);
    if (data && data.success) {
      const res = data as SuccessResponseDTO<JwtTokenDTO>;
      dispatch({
        type: "[Auth] - Login",
        payload: {
          isAdmin: res.content.user.roles.includes("ROLE_ADMIN"),
          user: res.content.user,
        },
      });
      toast.success(data.message);
      return true;
    }else {
      toast.error(data.message);
      return false;
    }
  };

  const handleUpdateAddress = async ( address: AddressDTO ) => {
    dispatch({
      type: "[Auth] - Saving Address",
      payload: true
    })
    const response = await AddressAPI.update(address);
    if( response?.success ){
      const data = response as SuccessResponseDTO<AddressDTO>;
      dispatch({
        type: "[Auth] - Update Address",
        payload: data.content
      })
      toast.success(data.message);
    }else {
      toast.error(response?.message || "Ocurrio un error");
      dispatch({
        type: "[Auth] - Saving Address",
        payload: false
      })
    }
  }
  
  const validateSession = async () => {
    const data = await validateToken(Cookies.get("token") || '');
    console.log(data);
    if( data && data.success){
      dispatch({
        type: "[Auth] - Login",
        payload: {
          isAdmin: data.content.roles.includes("ROLE_ADMIN"),
          user: data.content
        }
      })
    }else {
      /* handleLogout(); */
      if(Cookies.get("token")){
        toast.error("Sesion expirada");
      }
      dispatch({
        type: "[Auth] - Logout"
      });
      console.log("SESION CERRADA", state.isLogged);
    }
  }

  const handleRegister = async (newUser: NewUserDTO) => {
    const data = await register(newUser);
    console.log("REGISTER RESPONSE", data);
    if (data && data.success) {
      const res = data as SuccessResponseDTO<JwtTokenDTO>;
      dispatch({
        type: "[Auth] - Login",
        payload: {
          isAdmin: res.content.user.roles.includes("ROLE_ADMIN"),
          user: res.content.user,
        },
      });
      toast.success(data.message);
      return true;
    }
    toast.error(data!.message + "");
    return false;
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    const newMemoryCart: CartDTO = {
      id: "",
      user_id : "",
      cartItems: [],
      tax: "0.00",
      discount: "0.00",
      subtotal: "0.00",
      distance: 0.0,
      shippingCost: "0.00",
      total: "0.00"
    }
    Cookies.set("cart", JSON.stringify(newMemoryCart));
    Cookies.remove("address");
    dispatch({
      type: "[Auth] - Logout",
    });
    toast.success("Se cerro la sesion");
    router.replace("/auth/login");
  };

  const handleUpdateAddressMemory = (address: AddressDTO) => {
    Cookies.set("address", JSON.stringify( address ));
    dispatch({
      type: "[Auth] - Update Address",
      payload: address
    })
  }

  const handleChangePassword = async (password: string, confirmPassword: string, token: string) => {
    const response = await changePassword({ password, confirmPassword, tokenPassword: token });
    if( response?.success ){
      toast.success( response.message );
      return true;
    }else {
      toast.error( response?.message || "Ocurrio un error" );
      return false;
    }
  }

  const handleUpdateProfile = async ( profile: UpdateProfileDTO, file?: File ) => {
    dispatch({
      type: "[Auth] - Saving Profile",
      payload: true
    })
    const response = await ProfileAPI.update( profile, file );
    if( response?.success ){
      const data = response as SuccessResponseDTO<UserDTO>;
      dispatch({
        type: "[Auth] - Update Profile",
        payload: data.content
      })
      toast.success(data.message);
      dispatch({
        type: "[Auth] - Saving Profile",
        payload: true
      })
      return true;
    }else {
      toast.error(response?.message || "Ocurrio un error, vuelve a intentarlo");
      dispatch({
        type: "[Auth] - Saving Profile",
        payload: false
      })
      return false;
    }
  }

  /*const onAvailableStatus = async ( id: string, type: "Carrier" | "Grocer" ) => {
    if(type === "Carrier"){
      const response = await carrierAPI.availableStatus( id );
      if( response?.success ){
        toast.success( response.message );
        dispatch({
          type: "[Auth] - Available Status"
        });
      }else {
        toast.error(response?.message || "Ocurrio un error");
      }
    }
  }*/

  return (
    <AuthContext.Provider
      value={{
        ...state,
        validateSession,
        onLogin: handleLogin,
        onLogout: handleLogout,
        onRegister: handleRegister,
        onChangePassword: handleChangePassword,
        onUpdateAddress: handleUpdateAddress,
        onUpdateAddressMemory: handleUpdateAddressMemory,
        onUpdateProfile: handleUpdateProfile,
        isLoadingUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
