"use client";

import { DataTable, DataTableModalProps } from "@/components/ui";
import { PurchaseOrderModal } from "@/components/ui/admin/PurchaseOrderModal";
import { AuthContext } from "@/context";
import { PurchaseContext } from "@/context/admin/purchase";
import {
  PurchaseOrderDTO,
  PurchaseOrderStatus,
} from "@/types";
import { formatDate } from "@/utils/utils";
import { Button, Chip, Tooltip } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

export type IPurchaseOrderTableCell = {
  id: string;
  date: string;
  status: PurchaseOrderStatus;
  total: string;
  requester: string;
  supplier: string;
  purchaseOrderReceptionId: string;
  supplierId: string;
  userId: string;
  guide: string;
}

export type IPurchaseOrderTableColumn = {
  key: keyof IPurchaseOrderTableCell | 'actions';
  title: string;
}

const columns: IPurchaseOrderTableColumn[] = [
  {
    key: "requester",
    title: "Solicitante",
  },
  {
    key: "supplier",
    title: "Proveedor",
  },
  {
    key: "total",
    title: "Total",
  },
  {
    key: "date",
    title: "Fecha",
  },
  {
    key: "status",
    title: "Estado",
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function SupplierPage() {
  const {
    purchaseOrder: { purchaseOrders },
    supplier,
    loadingData,
    onSelectPurchaseOrder,
  } = React.useContext(PurchaseContext);
  const { isAdmin, user } = React.useContext(AuthContext);
  const router = useRouter();

  console.log("DATA: ", supplier, purchaseOrders);

  const renderCell = React.useCallback(
    (
      item: IPurchaseOrderTableCell,
      columnKey: keyof IPurchaseOrderTableCell | "actions",
      modalProps: DataTableModalProps<IPurchaseOrderTableCell>
    ) => {
      let cellValue = "";
      if (columnKey != "actions") {
        cellValue = item[columnKey];
      }

      switch (columnKey) {
        case "requester":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "supplier":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "total":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "date":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {formatDate(cellValue)}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              size="lg"
              variant="flat"
              title={cellValue}
              color={
                (cellValue as PurchaseOrderStatus) === "PENDIENTE"
                  ? "warning"
                  : (cellValue as PurchaseOrderStatus) === "RECIBIDA" || (cellValue as PurchaseOrderStatus) === "COMPLETADA"
                  ? "success"
                  : "danger"
              }
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip color="warning" content="Ver Detalles">
                <span
                  className="text-lg text-warning cursor-pointer active:opacity-50"
                  onClick={() => {
                    handleShowDetails(item.id);
                  }}
                >
                  <i className="fa-solid fa-eye"></i>
                </span>
              </Tooltip>
            </div>
          );
        default:
          return <>{cellValue}</>;
      }
    },
    []
  );

  const handleShowDetails = (id: string) => {
    router.push("/admin/purchase/" + id);
  };

  const handleShowReceptionPendingOrders = () => {
    router.push("/admin/purchase/reception");
  };

  return (
    <div className="w-full h-[100vh] flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <div className="flex justify-between">
        <h1 className="text-large font-semibold">Ordenes de Compra</h1>
        <div>
          {user.roles.includes("ROLE_WAREHOUSE") ? (
            <Button
              onClick={handleShowReceptionPendingOrders}
              color="primary"
              variant="bordered"
            >
              Ver Pedidos a recepcionar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleShowReceptionPendingOrders}
                color="primary"
                variant="bordered"
              >
                Ver Pedidos a preparar
              </Button>
            </div>
          )}
        </div>
      </div>
      <DataTable
        showCreateButton={isAdmin}
        isLoading={loadingData}
        renderCell={renderCell}
        emptyMessage="No se encontraron ordenes de compra"
        filterBy={{ key: "supplier", text: "Proveedor" }}
        data={purchaseOrders}
        columns={columns}
        modal={PurchaseOrderModal}
      />
    </div>
  );
}
