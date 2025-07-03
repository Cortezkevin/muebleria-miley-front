"use client";

import { DataTable, DataTableModalProps } from "@/components/ui";
import { CarrierModal } from "@/components/ui/admin/CarrierModal";
import { EmployeeContext } from "@/context/admin";
import { AuthContext } from "@/context/auth";
import { CarrierStatus } from "@/types";
import { Chip, Tooltip } from "@heroui/react";
import React from "react";

export type ICarrierTableCell = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  plateCode: string;
  userId: string;
  status: CarrierStatus;
}

export type ICarrierTableColumn = {
  key: keyof ICarrierTableCell | 'actions';
  title: string;
}

const columns: ICarrierTableColumn[] = [
  {
    key: "fullName",
    title: "Nombre Completo",
  },
  {
    key: "email",
    title: "Email"
  },
  {
    key: "phone",
    title: "Telefono",
  },
  {
    key: "plateCode",
    title: "Codigo de Placa",
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

export default function SubCategoryPage() {

  const { carrier: { carriers }, loadingData, onSelectCarrier, loadCarriers } = React.useContext(EmployeeContext);
  const { isAdmin } = React.useContext( AuthContext );

  const renderCell = React.useCallback(
    (
      item: ICarrierTableCell,
      columnKey: keyof ICarrierTableCell | "actions",
      modalProps: DataTableModalProps<ICarrierTableCell>
    ) => {
      let cellValue = "";
      if (columnKey != "actions") {
        cellValue = item[columnKey];
      }
      switch (columnKey) {
        case "fullName":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "email":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "phone":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "plateCode":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "status":
          return (
            <Chip
              size="lg"
              variant="flat"
              title={cellValue}
              color={
                cellValue as CarrierStatus === "EN_RUTA" || cellValue as CarrierStatus === "EN_ENTREGA" 
                  ? "warning"
                  : cellValue as CarrierStatus === "FUERA_DE_SERVICIO"
                  ? "danger"
                  : "success"
              }
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            isAdmin ?
            (<div className="relative flex justify-center items-center gap-2">
              <Tooltip color="warning" content="Edit">
                <span className="text-lg text-warning cursor-pointer active:opacity-50">
                  <i className="fa-solid fa-pen-to-square" onClick={() => {
                    onSelectCarrier( item );
                    modalProps.openModal( true );
                  }}></i>
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <i className="fa-solid fa-trash"></i>
                </span>
              </Tooltip>
            </div>)
            : (
              <div>No puedes realizar acciones</div>
            )
          );
        default:
          return <>{cellValue}</>;
      }
    },
    [ isAdmin ]
  );

  React.useEffect(() => {
    loadCarriers();
  },[]);

  return (
    <div className="w-full h-[100vh] flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Repartidores</h1>
      <DataTable
        isLoading={ loadingData }
        renderCell={renderCell}
        emptyMessage="No se encontraron repartidores"
        filterBy={{ key: "fullName", text: "Nombre" }}
        data={carriers}
        columns={columns}
        modal={CarrierModal}
        showCreateButton={ isAdmin }
      />
    </div>
  );
}
