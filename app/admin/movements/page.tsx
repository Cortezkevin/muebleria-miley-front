"use client";

import { DataTable, DataTableModalProps } from "@/components/ui";
import { MovementModal } from "@/components/ui/admin/MovementModal";
import { WarehouseContext } from "@/context/admin/warehouse";
import {
  InventoryMovementType,
} from "@/types";
import { formatDate, passOneDay } from "@/utils/utils";
import { Chip, Tooltip } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

export type IMovementsTableCell = {
  id: string;
  type: InventoryMovementType;
  grocer: string;
  initialStock: number;
  amount: number;
  newStock: number;
  date: string;
  reason: string;
  productOrMaterial: string;
  warehouse: string;
}

export type IMovementsTableColumn = {
  key: keyof IMovementsTableCell | 'actions';
  title: string;
}

const columns: IMovementsTableColumn[] = [
  {
    key: "grocer",
    title: "Realizado por"
  },
  {
    key: "productOrMaterial",
    title: "Producto/Material",
  },
  {
    key: "type",
    title: "Tipo de Movimiento",
  },
  {
    key: "initialStock",
    title: "Stock Inicial"
  },
  {
    key: "amount",
    title: "Cantidad",
  },
  {
    key: "newStock",
    title: "Nuevo Stock"
  },
  {
    key: "reason",
    title: "Razon",
  },
  {
    key: "date",
    title: "Fecha",
  },
  {
    key: "warehouse",
    title: "Ubicacion",
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function MovementsPage() {
  const {
    movement: { movements },
    onSelectMovement,
    loadingData,
  } = React.useContext(WarehouseContext);

  const router = useRouter();

  const renderCell = React.useCallback(
    (
      item: IMovementsTableCell,
      columnKey: keyof IMovementsTableCell | "actions",
      modalProps: DataTableModalProps<IMovementsTableCell>
    ) => {
      let cellValue = "";
      if (columnKey === "amount") {
        cellValue = item[columnKey] + "";
      } else {
        if (columnKey != "actions") {
          cellValue = item[columnKey]+"";
        }
      }

      switch (columnKey) {
        case "grocer":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "productOrMaterial":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
          case "type":
          return (
            <div className="flex flex-col">
             <Chip
                variant="flat"
                color={
                  (cellValue as InventoryMovementType) === "ENTRADA"
                    ? "success"
                    : (cellValue as InventoryMovementType) === "SALIDA"
                    ? "danger"
                    : "warning"
                }
              >
                {cellValue}
              </Chip>
            </div>
          );
          case "initialStock":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "amount":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
          case "newStock":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{cellValue}</p>
              </div>
            );
        case "reason":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "date":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{ formatDate(cellValue) }</p>
            </div>
          );
        case "warehouse":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip color="warning" content="Ver Detalles">
                <span onClick={() => router.push("/admin/movements/"+item.id)} className="text-lg text-warning cursor-pointer active:opacity-50">
                  <i className="fa-solid fa-eye"></i>
                </span>
              </Tooltip>
              {/* <Tooltip color="warning" content="Editar">
                <span className={`text-lg text-warning cursor-pointer active:opacity-50`}>
                  <i className="fa-solid fa-pen-to-square" onClick={() => {
                    onSelectMovement( item )
                    modalProps.openModal( true );
                  }}></i>
                </span>
              </Tooltip> */}
            </div>
          );
        default:
          return <>{cellValue}</>;
      }
    },
    []
  );

  const getAllStatus = () => {
    const statusArray: InventoryMovementType[] = ["ENTRADA", "SALIDA","PRODUCCION"];
    return statusArray;
  }

  return (
    <div className="w-full h-[100vh] flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Movimientos</h1>
      <DataTable
        isLoading={loadingData}
        renderCell={renderCell}
        emptyMessage="No se encontraron mivimientos"
        filterBy={{ key: "productOrMaterial", text: "Producto o Material" }}
        data={movements}
        columns={columns}
        modal={MovementModal}
        extraFilterOptions={{
          options: getAllStatus(),
          field: "type"
        }}
      />
    </div>
  );
}
