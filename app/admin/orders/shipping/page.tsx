"use client";
import { OrderAPI } from "@/api";
import { OrderContext } from "@/context/admin";
import { AuthContext } from "@/context/auth";
import {
  CarrierDTO,
  ShippingOrderDTO,
  ShippingStatus,
  SuccessResponseDTO,
} from "@/types";
import { Utils } from "@/utils";
import { Button, Chip } from "@heroui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export type IShippingOrderTableCell = {
  id: string;
  userIdFromCarrier: string;
  orderId: string;
  carrier: CarrierDTO;
  preparedBy: string;
  address: string;
  createdDate: string;
  startDate: string;
  preparedDate: string;
  shippingDate: string;
  completedDate: string;
  status: ShippingStatus;
}

export type IShippingOrderTableColumn = {
  key: keyof IShippingOrderTableCell | 'actions';
  title: string;
}

const columns: IShippingOrderTableColumn[] = [
  {
    key: "orderId",
    title: "ID del Pedido",
  },
  {
    key: "preparedBy",
    title: "Preparado por",
  },
  {
    key: "carrier",
    title: "A cargo de",
  },
  {
    key: "address",
    title: "Direccion de Entrega",
  },
  {
    key: "createdDate",
    title: "Fecha de Creacion",
  },
  {
    key: "startDate",
    title: "Fecha de Inicio",
  },
  {
    key: "preparedDate",
    title: "Fecha de Preparado",
  },
  {
    key: "shippingDate",
    title: "Fecha de Envio",
  },
  {
    key: "completedDate",
    title: "Fecha de Finalizacion",
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

export default function ShippingOrdersPage() {
  const router = useRouter();

  const { user, validateSession } = React.useContext(AuthContext);
  const { loadOrders } = React.useContext(OrderContext);

  const [shippingOrders, setShippingOrders] = React.useState<ShippingOrderDTO[]>(
    []
  );
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    validateSession();
  }, []);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await OrderAPI.getAllShippingOrders();
      if (response?.success) {
        const data = response as SuccessResponseDTO<ShippingOrderDTO[]>;
        setShippingOrders(data.content);
      } else {
        toast.error(response?.message || "Ocurrio un error");
      }
      setLoading(false);
    })();
  }, []);

  const renderCell = (
    item: IShippingOrderTableCell,
    columnKey: keyof IShippingOrderTableCell | "actions"
  ) => {
    let cellValue = "";
    if (columnKey === "carrier") {
      cellValue = item["carrier"] ? item["carrier"].fullName : "Nadie";
    } else {
      if (columnKey != "actions") {
        cellValue = item[columnKey];
      }
    }

    switch (columnKey) {
      case "orderId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "preparedBy":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "carrier":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue ? cellValue : "Nadie"}
            </p>
          </div>
        );
      case "address":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "createdDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {Utils.formatDate(cellValue)}
            </p>
          </div>
        );
      case "startDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue ? Utils.formatDate(cellValue) : "No registrado"}
            </p>
          </div>
        );
      case "preparedDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue ? Utils.formatDate(cellValue) : "No registrado"}
            </p>
          </div>
        );
      case "shippingDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue ? Utils.formatDate(cellValue) : "No registrado"}
            </p>
          </div>
        );
      case "completedDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue ? Utils.formatDate(cellValue) : "No registrado"}
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
              cellValue === "PENDIENTE"
                ? "warning"
                : cellValue === "EN_PROCESO"
                ? "danger"
                : "success"
            }
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return item.userIdFromCarrier === user.id &&
          item.status !== "PENDIENTE" ? (
          <Button
            className="text-white"
            color={item.status === "ENTREGADO" ? "success" : "danger"}
            onClick={() => router.push("/admin/orders/shipping/" + item.id)}
          >
            {item.status !== "ENTREGADO" ? "Continuar Proceso" : "Completado"}
          </Button>
        ) : item.status !== "PENDIENTE" && item.status !== "ENTREGADO" ?
          (
            <Button
              className="text-white"
              color="primary"
              onClick={() => router.push("/admin/orders/shipping/" + item.id)}
              isDisabled={
                true
              }
            >
              En Proceso
            </Button>
          )
          : (  
            <Button
              className="text-white"
              color={`${item.status === "ENTREGADO" ? "warning" : "primary"}`}
              onClick={() => {
                if( item.status !== "ENTREGADO"){
                  handleStartPreparation(item.id, item.orderId);
                }else{
                  router.push("/admin/orders/shipping/" + item.id);
                }
              }}
              isDisabled={
                (user.roleExtraData
                  ? (user.roleExtraData as CarrierDTO).status !== "DISPONIBLE"
                  : false)
              }
            >
              {item.status !== "ENTREGADO"
              ? "Iniciar Proceso"
              : "Completado"}
            </Button>
          );
      default:
        return <>{cellValue}</>;
    }
  };

  const handleStartPreparation = async (id: string, orderId: string) => {
    const response = await OrderAPI.startShippingOrder({
      orderId,
      userId: user.id,
    });
    if (response?.success) {
      toast.success(response.message);
      loadOrders();
      router.push("/admin/orders/shipping/" + id);
    } else {
      toast.error(response?.message);
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">
        Pedidos Pendientes para Entregar
      </h1>
      <Table
        aria-label="Example table with client side pagination"
        isStriped
        isCompact
        border={2}
        topContentPlacement="outside"
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          {columns.map((c) => (
            <TableColumn key={c.key}>{c.title}</TableColumn>
          ))}
        </TableHeader>
        <TableBody
          isLoading={loading}
          emptyContent={"Aun no haz realizado pedidos."}
          items={shippingOrders}
        >
          {(order) => (
            <TableRow key={order.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(
                    order,
                    columnKey as keyof IShippingOrderTableCell
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
