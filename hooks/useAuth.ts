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
    accessType: authContext.roles.includes("ROLE_ADMIN") 
                ? "ADMIN" 
                : authContext.roles.includes("ROLE_WAREHOUSE")
                  ? "WAREHOUSE"
                  : authContext.roles.includes("ROLE_TRANSPORT")
                    ? "TRANSPORT"
                    : "CLIENT"
  };
};