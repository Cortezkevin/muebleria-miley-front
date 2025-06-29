"use client";

import { DataTable, DataTableModalProps } from "@/components/ui";
import { SupplierModal } from "@/components/ui/admin/SupplierModal";
import { AuthContext } from "@/context";
import { PurchaseContext } from "@/context/admin/purchase";
import { Tooltip } from "@heroui/react";
import React from "react";

export type ISupplierTableCell = {
  id: string;
  name: string;
  ruc: string;
  phone: string;
  address: string;
}

export type ISupplierTableColumn = {
  key: keyof ISupplierTableCell | 'actions';
  title: string;
}

const columns: ISupplierTableColumn[] = [
  {
    key: "name",
    title: "Nombre",
  },
  {
    key: "ruc",
    title: "RUC",
  },
  {
    key: "phone",
    title: "Telefono",
  },
  {
    key: "address",
    title: "Direccion",
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function SupplierPage() {

  const { supplier: { suppliers }, loadingData, onSelectSupplier } = React.useContext( PurchaseContext );
  const { isAdmin } = React.useContext( AuthContext );

  const renderCell = React.useCallback(
    (
      item: ISupplierTableCell,
      columnKey: keyof ISupplierTableCell | "actions",
      modalProps: DataTableModalProps<ISupplierTableCell>
    ) => {
      let cellValue = "";
      if (columnKey != "actions") {
        cellValue = item[columnKey];
      }

      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "ruc":
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
        case "address":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "actions":
          return (
            isAdmin
            ? (
              <div className="relative flex justify-center items-center gap-2">
                <Tooltip color="warning" content="Edit">
                  <span className="text-lg text-warning cursor-pointer active:opacity-50">
                    <i className="fa-solid fa-pen-to-square" onClick={() => {
                      onSelectSupplier( item );
                      modalProps.openModal( true );
                    }}></i>
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <i className="fa-solid fa-trash"></i>
                  </span>
                </Tooltip>
              </div>
            ): (
              <div>No puedes realizar acciones</div>
            )
          );
        default:
          return <>{cellValue}</>;
      }
    }, [ isAdmin ]);

  return (
    <div className="w-full h-[100vh] flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Proveedores</h1>
      <DataTable
        isLoading={ loadingData }
        renderCell={renderCell}
        emptyMessage="No se encontraron proveedores"
        filterBy={{ key: "name", text: "Nombre" }}
        data={suppliers}
        columns={columns}
        modal={ SupplierModal }
        showCreateButton={ isAdmin }
      />
    </div>
  );
}
