import AdminProviders from "@/context/AppProviders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin page",
  description: "Portal web de tienda de muebles",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminProviders>
      <div className="flex h-[100vh]">
        <div className="w-[calc(100vw-240px)] h-full animate__animated animate__fadeIn animate__slower overflow-auto p-6">
          { children }
        </div>
      </div>
    </AdminProviders>
  );
}