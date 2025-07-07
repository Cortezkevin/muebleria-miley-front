import React from "react";
import AuthProvider from "./auth/AuthProvider";
import ShopProvider from "./shop/ShopProvider";
import CartProvider from "./cart/CartProvider";
import AdminProviders from "./admin/AdminProvider";
import ProfileProvider from "./profile/ProfileProvider";

export default function AppProviders({ children }: { children: React.ReactElement } ){
  return (
    <ShopProvider>
    <AuthProvider>
      <ProfileProvider>
        <CartProvider>          
          <AdminProviders>
            { children }
          </AdminProviders>
        </CartProvider>
      </ProfileProvider>
    </AuthProvider>
    </ShopProvider>
  );
}