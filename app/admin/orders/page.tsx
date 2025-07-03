"use client";
import { DataTable, DataTableModalProps, UserModal } from "@/components/ui";
import { OrderContext } from "@/context/admin";
import { AuthContext } from "@/context/auth";
import {
  OrderStatus,
  PaymentMethod,
  PreparationStatus,
  ShippingStatus,
} from "@/types";
import { Utils } from "@/utils";
import { Button, Chip } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

export type IOrderTableCell = {
  id: string,
  total: string,
  user: string,
  shippingAddress: string,
  createdDate: string,
  cancelledDate: string,
  completedDate: string,
  paymentMethod: PaymentMethod,
  shippingStatus: ShippingStatus,
  preparationStatus: PreparationStatus,
  status: OrderStatus
}

export type IOrderTableColumn = {
  key: keyof IOrderTableCell | 'actions';
  title: string;
}

const columns: IOrderTableColumn[] = [
  {
    key: "user",
    title: "Cliente",
  },
  {
    key: "shippingAddress",
    title: "Direccion de Envio",
  },
  {
    key: "paymentMethod",
    title: "Metodo de Pago",
  },
  {
    key: "total",
    title: "Total",
  },
  {
    key: "createdDate",
    title: "Fecha de Creacion",
  },
  {
    key: "preparationStatus",
    title: "Estado de Preparacion"
  },
  {
    key: "shippingStatus",
    title: "Estado de Envio",
  },
  {
    key: "status",
    title: "Estado del Pedido",
  },
/*   {
    key: "actions",
    title: "Acciones",
  }, */
];

export default function OrdersPage() {
  const router = useRouter();

  const { user } = React.useContext(AuthContext);

  const {
    order: { orders },
    loadOrders
  } = React.useContext(OrderContext);

  const renderCell = React.useCallback(
    (
      item: IOrderTableCell,
      columnKey: keyof IOrderTableCell | "actions",
      modalProps: DataTableModalProps<IOrderTableCell>
    ) => {
      let cellValue = "";
      if (columnKey != "actions") {
        cellValue = item[columnKey];
      }
      switch (columnKey) {
        case "user":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "shippingAddress":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "paymentMethod":
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
        case "createdDate":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{Utils.formatDate(cellValue)}</p>
            </div>
          );
        case "preparationStatus":
          return (
            <Chip
              size="lg"
              variant="flat"
              title={cellValue}
              color={
                (cellValue as PreparationStatus) === "PENDIENTE"
                  ? "warning"
                  : (cellValue as PreparationStatus) === "EN_PREPARACION" || (cellValue as PreparationStatus) === "LISTO_PARA_RECOGER"
                  ? "success"
                  : "danger"
              }
            >
              {cellValue}
            </Chip>
          );
        case "shippingStatus":
          return (
            <Chip
              size="lg"
              variant="flat"
              title={cellValue}
              color={
                (cellValue as ShippingStatus) === "PENDIENTE"
                  ? "warning"
                  : (cellValue as ShippingStatus) === "EN_PREPARACION" || (cellValue as ShippingStatus) === "ENTREGADO"
                  ? "success"
                  : "danger"
              }
            >
              {cellValue}
            </Chip>
          );
        case "status":
          return (
            <Chip
              size="lg"
              variant="flat"
              title={cellValue}
              color={
                (cellValue as OrderStatus) === "PENDING" || (cellValue as OrderStatus) === "PREPARADO"
                  ? "warning"
                  : (cellValue as OrderStatus) === "IN_PROGRESS" || (cellValue as OrderStatus) === "ENTREGADO"
                  ? "success"
                  : "danger"
              }
            >
              {cellValue}
            </Chip>
          );
        /* case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip color="warning" content="Ver Detalles">
                <span className="text-lg text-warning cursor-pointer active:opacity-50">
                  <i className="fa-solid fa-eye"></i>
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Editar">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <i className="fa-solid fa-ban"></i>
                </span>
              </Tooltip>
            </div>
          ); */
        default:
          return <>{cellValue}</>;
      }
    },
    []
  );
  
  React.useEffect(() => {
    loadOrders();
  },[]);

  const handleShowPreparationPendingOrders = () => {
    router.push("/admin/orders/preparation");
  };

  const handleShowShippingPendingOrders = () => {
    router.push("/admin/orders/shipping");
  };

  const getAllStatus = () => {
    const statusArray: OrderStatus[] = ["ANULADO", "PENDING", "IN_PROGRESS", "ENTREGADO"];
    return statusArray;
  }

  return (
    <div className="w-full h-[100vh] flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <div className="flex justify-between items-center">
        <h1 className="text-large font-semibold">Pedidos</h1>
        {user.roles.includes("ROLE_WAREHOUSE") ? (
          <Button
            onClick={handleShowPreparationPendingOrders}
            color="primary"
            className="text-white"
          >
            Ver Pedidos a preparar
          </Button>
        ) : user.roles.includes("ROLE_TRANSPORT") ? (
          <Button
            onClick={handleShowShippingPendingOrders}
            color="primary"
            className="text-white"
          >
            Ver Pedidos a enviar
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={handleShowPreparationPendingOrders}
              color="primary"
              className="text-white"
            >
              Ver Pedidos a preparar
            </Button>
            <Button
              onClick={handleShowShippingPendingOrders}
              color="primary"
              className="text-white"
            >
              Ver Pedidos a enviar
            </Button>
          </div>
        )}
      </div>
      <DataTable
        columns={columns}
        data={orders}
        filterBy={{ key: "user", text: "Cliente" }}
        isLoading={false}
        emptyMessage="No se encontraron pedidos"
        modal={UserModal}
        renderCell={renderCell}
        showCreateButton={false}
        extraFilterOptions={{
          options: getAllStatus(),
          field: "status"
        }}
      />
    </div>
  );
}
