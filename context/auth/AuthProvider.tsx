"use client";

import { ReactElement, useEffect, useReducer, useState } from "react";
import { AuthContext, AuthReducer } from "./";
import { CartDTO, UserDTO, NewUserDTO, SuccessResponseDTO, SessionDTO, GrocerDTO, CarrierDTO } from "@/types";
import { CarrierAPI, AuthAPI, validateToken, UserAPI } from "@/api";
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
  isEmployee: boolean;
  roleExtraData?: GrocerDTO | CarrierDTO;
  email: string;
  photo: string;
  roles: string[];
  userId?: string;
}

const name_INITIAL_STATE: AuthState = {
  userId: undefined,
  isAdmin: false,
  isLogged: false,
  isSavingAddress: false,
  isSavingProfile: false,
  isEmployee: false,
  roleExtraData: undefined,
  email: '',
  photo: '',
  roles: []
};

export default function AuthProvider({ children }: Props) {
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [state, dispatch] = useReducer(AuthReducer, name_INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    setIsLoadingUserData(true);
    ( async() => {
      await validateSession();
    })();
    setIsLoadingUserData(false);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const response = await AuthAPI.login(email, password);
    if (response && response.success) {
      const data = response as SuccessResponseDTO<SessionDTO>;
      dispatch({
        type: "[Auth] - Login",
        payload: {
          isAdmin: data.content.roles.includes("ROLE_ADMIN"),
          ...data.content
        },
      });
      toast.success(data.message);
      return true;
    }else {
      toast.error(response.message);
      return false;
    }
  };

  const validateSession = async () => {
    const token = Cookies.get("token") || '';
    const response = await validateToken(token);
    if( response.success ){
      const data = response as SuccessResponseDTO<UserDTO>;
      dispatch({
        type: "[Auth] - Login",
        payload: {
          isAdmin: data.content.roles.includes("ROLE_ADMIN"),
          email: data.content.email,
          photo: data.content.photoUrl,
          roles: data.content.roles,
          id: data.content.id
        }
      })
    }else {
      if(token){
        toast.error("Sesion expirada");
      }
      dispatch({
        type: "[Auth] - Logout"
      });
    }
  }

  const handleLoadRoleExtraData = async () => {
    const response = await UserAPI.getExtraRoleData();
    if (response && response.success) {
      const data = response as SuccessResponseDTO<GrocerDTO | CarrierDTO>;
      dispatch({
        type: "[Auth] - Load Extra Role Data",
        payload: data.content,
      });
      toast.success(data.message);
      return true;
    }
    toast.error(response.message + "");
    return false;
  }

  const handleRegister = async (newUser: NewUserDTO) => {
    const response = await AuthAPI.register(newUser);
    if (response && response.success) {
      const data = response as SuccessResponseDTO<SessionDTO>;
      dispatch({
        type: "[Auth] - Login",
        payload: {
          isAdmin: data.content.roles.includes("ROLE_ADMIN"),
          ...data.content
        },
      });
      toast.success(data.message);
      return true;
    }
    toast.error(response.message + "");
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

  const handleChangePassword = async (password: string, confirmPassword: string, token: string) => {
    const response = await AuthAPI.changePassword({ password, confirmPassword, tokenPassword: token });
    if( response?.success ){
      toast.success( response.message );
      return true;
    }else {
      toast.error( response?.message || "Ocurrio un error" );
      return false;
    }
  }

  const handleAvailableStatus = async ( id: string, type: "Carrier" | "Grocer" ) => {
    if(type === "Carrier"){
      const response = await CarrierAPI.availableStatus( id );
      if( response?.success ){
        toast.success( response.message );
        dispatch({
          type: "[Auth] - Available Status"
        });
      }else {
        toast.error(response?.message || "Ocurrio un error");
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        validateSession,
        onLogin: handleLogin,
        onLogout: handleLogout,
        onRegister: handleRegister,
        onChangePassword: handleChangePassword,
        onAvailableStatus: handleAvailableStatus,
        loadRoleExtraData: handleLoadRoleExtraData,
        isLoadingUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
