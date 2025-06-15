import React from "react";
import AuthProvider from "./auth/AuthProvider";
import ShopProvider from "./shop/ShopProvider";
import CartProvider from "./cart/CartProvider";
import AdminProviders from "./admin/AdminProvider";
/*
import AdminProviders from "./admin/AdminProvider"; */

export default function AppProviders({ children }: { children: React.ReactElement } ){
  return (
    <ShopProvider>
    <AuthProvider>
      <CartProvider>          
        <AdminProviders>
              { children }
        </AdminProviders>
{/*          </CartProvider> */}
      </CartProvider>
    </AuthProvider>
    </ShopProvider>
  );
}