"use client";

import { PurchaseOrderAPI } from "@/api";
import { AuthContext } from "@/context";
import { PurchaseContext } from "@/context/admin/purchase";
import { DetailedPurchaseOrderDTO, SuccessResponseDTO } from "@/types";
import { formatDate } from "@/utils/utils";
import { Button, Card, Chip, Input, Spinner } from "@heroui/react";
import React from "react";
import toast from "react-hot-toast";

export default function PurchaseOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = React.use(params);
  const { loadPurchaseOrders } = React.useContext(PurchaseContext);
  const { isAdmin } = React.useContext(AuthContext);

  const [purchaseOrder, setPurchaseOrder] = React.useState<
    DetailedPurchaseOrderDTO | undefined
  >();

  React.useEffect(() => {
    (async () => {
      const response = await PurchaseOrderAPI.getById(param.id);
      if (response?.success) {
        const data = response as SuccessResponseDTO<DetailedPurchaseOrderDTO>;
        setPurchaseOrder(data.content);
      }
    })();
  }, []);

  if (!purchaseOrder) {
    return (
      <div className="w-[100vw] min-h-[450px] flex items-center justify-center">
        <Spinner label="Cargando..." size="lg" />
      </div>
    );
  }

  const handleCancelPurchaseOrder = async () => {
    const response = await PurchaseOrderAPI.cancel( param.id );
    if( response?.success ){
      const data = response as SuccessResponseDTO<DetailedPurchaseOrderDTO>;
      setPurchaseOrder(data.content);
      loadPurchaseOrders();
      toast.success(data.message);
    }else{
      toast.error(response.message);
    }
  }

  return (
    <div className="w-full p-8 flex flex-col items-center justify-center overflow-auto gap-8">
      <h1 className="w-full flex font-semibold gap-2 text-2xl text-start">
        Orden de Compra: <p className="text-primary">#{purchaseOrder.id}</p>
      </h1>
      <div className="w-full flex text-lg justify-between items-center">
        <div className="flex gap-2 items-center">
          <h2 className="font-semibold">Solicitante:</h2>
          <p>{purchaseOrder.requester}</p>
        </div>
        <div className="flex gap-2 items-center">
          <h2 className="font-semibold">Fecha de Creación:</h2>
          <p>{formatDate(purchaseOrder.date)}</p>
        </div>
        <div className="flex gap-2 items-center">
          <h2 className="font-semibold">Estado:</h2>
          <Chip variant="flat" color={ purchaseOrder.status === "PENDIENTE" || purchaseOrder.status === "EN_REVISION" ? "warning" : purchaseOrder.status === "CANCELADA" ? "danger" : "success" } size="lg">
            {purchaseOrder.status}
          </Chip>
        </div>
      </div>
      <div className="text-lg flex flex-col gap-4">
        <div className="flex flex-col gap-4 text-center ">
          <h2 className="font-semibold">Detalles de la Orden</h2>
          <Card className="flex flex-col gap-3 w-[820px]">
            <div className="flex p-3 flex-col gap-4 w-full text-sm shadow-md rounded-xl min-h-[200px]">
              <div className="flex font-semibold text-default-500 bg-default-200/75 rounded-lg items-center py-3">
                <div className="min-w-[280px] text-left px-3 ">Nombre</div>
                <div className="min-w-[120px] px-3">Precio Unitario</div>
                <div className="min-w-[130px] px-3">Unidad de Medida</div>
                <div className="min-w-[110px] px-3">Cantidad</div>
                <div className="min-w-[120px] px-3">Total</div>
              </div>
              {purchaseOrder.orderDetails.map((i) => (
                <div className="flex items-center gap-2" key={i.id}>
                  <div className="min-w-[280px] max-w-[280px] px-3 text-left">
                    {i.name}
                  </div>
                  <div className="min-w-[120px] max-w-[120px] px-3 text-center">
                    {"S/. " + i.unitPrice}
                  </div>
                  <div className="min-w-[130px] max-w-[130px] px-3 text-center">
                    {i.measurementUnit}
                  </div>
                  <div className="min-w-[110px] max-w-[110px] px-3 text-center">
                    {i.amount}
                  </div>
                  <div className="min-w-[120px] max-w-[120px] px-3 text-center">
                    {"S/. " + (i.amount * parseFloat(i.unitPrice)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <div className="w-full flex gap-2 justify-end px-3 -mt-2">
            <p className="font-semibold">Total: </p>
            <p>S/. { purchaseOrder.total }</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Card className="flex flex-col gap-2 w-[400px] p-4">
            <h2 className="font-semibold">Informacion del Proveedor</h2>
            <div className="flex flex-col gap-2">
            <Input
                isReadOnly
                variant="bordered"
                label="Nombre"
                value={purchaseOrder.supplier.name}
              />
              <Input variant="bordered" isReadOnly label="RUC" value={purchaseOrder.supplier.ruc} />
              <Input
                isReadOnly
                variant="bordered"
                label="Telefono"
                value={purchaseOrder.supplier.phone}
              />
            </div>
          </Card>
          <div className="flex flex-col gap-4 items-center w-[400px]">
            <h2 className="font-semibold">Acciones</h2>
            <Button isDisabled={ purchaseOrder.status === "CANCELADA" || purchaseOrder.status === "COMPLETADA" || !isAdmin } color="danger" onClick={handleCancelPurchaseOrder}>Cancelar Orden de Compra</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
