"use client";

import { DataTable, DataTableModalProps } from "@/components/ui/admin/DataTable";
import { ProductModal } from "@/components/ui/admin/ProductModal";
import { AuthContext } from "@/context";
import { StoreContext } from "@/context/admin";
import { SubCategoryDTO } from "@/types";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import React from "react";

export type IProductTableCell = {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: SubCategoryDTO;
  acquisitionType: 'BOUGHT' | 'MANUFACTURED';
  /*supplier?: string;
  supplierId?: string;*/
  price: string;
  stock: number;
  images: string[];
}

export type IProductTableColumn = {
  key: keyof IProductTableCell | 'actions';
  title: string;
}

const columns: IProductTableColumn[] = [
  {
    key: "name",
    title: "Nombre",
  },
  {
    key: "description",
    title: "Descripcion",
  },
  {
    key: "acquisitionType",
    title: "Tipo de Adquicision",
  },
  /*{
    key: "supplier",
    title: "Proveedor",
  },*/
  {
    key: "subcategory",
    title: "Sub Categoria",
  },
  {
    key: "price",
    title: "Price",
  },
  {
    key: "stock",
    title: "Stock",
  },
  {
    key: "images",
    title: "Imagenes",
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function ProductPage() {
  const {
    product: { products },
    loadingData,
    onSelectProduct,
  } = React.useContext(StoreContext);
  const { isAdmin } = React.useContext(AuthContext);

  const renderCell = React.useCallback(
    (
      item: IProductTableCell,
      columnKey: keyof IProductTableCell | "actions",
      modalProps: DataTableModalProps<IProductTableCell>
    ) => {
      let cellValue: any = "";
      if (columnKey != "actions") {
        cellValue = item[columnKey];
        if (columnKey === "subcategory") {
          console.log("dATA SUBCAETOGRY", item.subcategory)
          cellValue = item.subcategory.name;
        }
      }
      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "description":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize line-clamp-3">{cellValue}</p>
            </div>
          );
        case "acquisitionType":
          return (
            <Chip
              color={cellValue === "BOUGHT" ? "success" : "warning"}
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        /* case "supplier":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {!cellValue ? "No aplica" : cellValue}
              </p>
            </div>
          ); */
        case "subcategory":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "price":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "stock":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "images":
          return (
            <div className="flex gap-1">
              {/* {cellValue.map((url: any) => (
                <Image className="object-cover" key={url} src={url} width={120} height={80} />
              ))} */}
              {
                <Image className="object-cover" src={cellValue[0]} width={120} height={80} />
              }
            </div>
          );
        case "actions":
          return isAdmin ? (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip color="warning" content="Edit">
                <span className="text-lg text-warning cursor-pointer active:opacity-50">
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => {
                      onSelectProduct(item);
                      modalProps.openModal(true);
                    }}
                  ></i>
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <i className="fa-solid fa-trash"></i>
                </span>
              </Tooltip>
            </div>
          ) : (
            <div>No puede realizar acciones</div>
          );
        default:
          return <>{cellValue}</>;
      }
    },
    [isAdmin]
  );

  return (
    <div className="w-full h-[100vh] flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Productos</h1>
      <DataTable
        isLoading={loadingData}
        renderCell={renderCell}
        emptyMessage="No se encontraron productos"
        filterBy={{ key: "name", text: "Nombre" }}
        data={products}
        columns={columns}
        modal={ProductModal}
        showCreateButton={isAdmin}
        extraFilterOptions={{
          field: "acquisitionType",
          options: ["BOUGHT", "MANUFACTURED"],
        }}
      />
    </div>
  );
}
