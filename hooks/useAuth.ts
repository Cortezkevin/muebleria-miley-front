"use client";

import { AuthContext, AuthProps } from "@/context";
import React from "react";

interface Props extends AuthProps {
  accessType: 'ADMIN' | 'WAREHOUSE' | 'TRANSPORT' | 'CLIENT'
}

export const useAuth  = (): Props => {
  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return {
    ...authContext,
    accessType: authContext.user.roles.includes("ROLE_ADMIN") 
                ? "ADMIN" 
                : authContext.user.roles.includes("ROLE_WAREHOUSE")
                  ? "WAREHOUSE"
                  : authContext.user.roles.includes("ROLE_TRANSPORT")
                    ? "TRANSPORT"
                    : "CLIENT"
  };
};