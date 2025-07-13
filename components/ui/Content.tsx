"use client";
import React, { FC, PropsWithChildren, useEffect } from 'react'
import { AdminMenu } from './admin/AdminMenu'
import { Toaster } from 'react-hot-toast'
import { Footer } from '../Footer'
import { usePathname } from 'next/navigation'
import { Navbar } from '../navbar';
import { useAuth } from '@/hooks/useAuth';

export const Content: FC<PropsWithChildren> = ({ children }) => {

  const { loadRoleExtraData, isLogged } = useAuth();
  const path = usePathname();

  useEffect(() => {
    if(!isLogged) return;
    loadRoleExtraData();
  },[isLogged]);

  return (
    <div className={`${path.split("/")[1] === "admin" ? 'flex overflow-hidden' : 'flex-col h-screen overflow-auto'} relative flex`}>
      {
        path.split("/")[1] !== "admin"
        ? <Navbar />
        : <AdminMenu />
      }
      <main className={`container flex-grow ${path.split("/")[1] !== "admin" ? "px-6 py-4" : ""} mx-auto max-w-7xl`}>
        
          {/* <NextUIProvider> */}
            <>
              {children}
              <Toaster />
            </>
          {/* </NextUIProvider> */}

      </main>
      {
        path.split("/")[1] !== "admin"
        && (
          <footer className="w-full flex flex-col items-center bg-default-100 justify-center py-3 mx-auto mt-40">
            <Footer /> 
          </footer>
        )
      }
    </div>
  )
}
