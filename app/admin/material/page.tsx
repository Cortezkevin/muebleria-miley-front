"use client";

import { DataTable, DataTableModalProps } from "@/components/ui";
import { RawMaterialModal } from "@/components/ui/admin/RawMaterialModal";
import { AuthContext } from "@/context";
import { PurchaseContext } from "@/context/admin/purchase";
import { MeasurementUnit } from "@/types";
import { Chip, Tooltip } from "@heroui/react";
import React from "react";

export type IRawMaterialTableCell = {
  id: string;
  name: string;
  description: string;
  measurementUnit: MeasurementUnit;
  stock: number;
  unitPrice: string;
  supplier: string;
  supplierId: string;
}

export type IRawMaterialTableColumn = {
  key: keyof IRawMaterialTableCell | 'actions';
  title: string;
}

const columns: IRawMaterialTableColumn[] = [
  {
    key: "name",
    title: "Nombre",
  },
  {
    key: "supplier",
    title: "Proveedor",
  },
  {
    key: "measurementUnit",
    title: "Unidad de Medida",
  },
  {
    key: "unitPrice",
    title: "Precio Unitario",
  },
  {
    key: "stock",
    title: "Stock",
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function SupplierPage() {

  const { rawMaterial: { rawMaterials }, loadingData, onSelectRawMaterial } = React.useContext( PurchaseContext );
  const { isAdmin } = React.useContext( AuthContext );

  const renderCell = React.useCallback(
    (
      item: IRawMaterialTableCell,
      columnKey: keyof IRawMaterialTableCell | "actions",
      modalProps: DataTableModalProps<IRawMaterialTableCell>
    ) => {
      let cellValue = "";
      if (columnKey != "actions") {
        cellValue = item[columnKey].toString();
      }

      switch (columnKey) {
        case "name":
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
        case "measurementUnit":
          return (
            <div className="flex flex-col">
              <Chip
                variant="flat"
                color={
                  cellValue === "PESO"
                    ? "warning"
                    : cellValue === "VOLUMEN"
                    ? "danger"
                    : cellValue === "LONGITUD"
                    ? "secondary"
                    : "success"
                }
              >
                {cellValue}
              </Chip>
            </div>
          );
        case "unitPrice":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{"S/." + cellValue}</p>
            </div>
          );
        case "stock":
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
                    onSelectRawMaterial( item );
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
              )
            : (
              <div>No puedes realizar acciones</div>
            )
          );
        default:
          return <>{cellValue}</>;
      }
    }, []);

  return (
    <div className="w-full h-[100vh] flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Materia Prima</h1>
      <DataTable
        isLoading={ loadingData }
        renderCell={renderCell}
        emptyMessage="No se encontraron materiales"
        filterBy={{ key: "name", text: "Nombre" }}
        data={rawMaterials}
        columns={columns}
        modal={ RawMaterialModal }
        showCreateButton={ isAdmin }
      />
    </div>
  );
}
