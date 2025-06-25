"use client";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function CompletionPage() {

  const router = useRouter();

  const handleShowOrders = () => {
    router.replace("/orders")
  }

  return (
    <div className="bg-red-200 h-full flex items-center justify-center">
      <div className="flex flex-col gap-4 w-[300px] min-h-[435px] justify-center">
        <h1 className="text-lg font-semibold text-center">¡GRACIAS POR TU COMPRA!</h1>
        <div className="flex flex-col gap-2 items-center">
          <p>Puedes ver tu pedido aqui</p>
          <Button onPress={handleShowOrders} color="primary" className="hover:text-white" variant="ghost">Ver mis Pedidos</Button>
        </div>
      </div>
    </div>
  )
}