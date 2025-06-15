"use client";

import { DataTable, DataTableModalProps } from "@/components/ui/admin/DataTable";
import { SubCategoryModal } from "@/components/ui/admin/SubCategoryModal";
import { AuthContext } from "@/context";
import { StoreContext } from "@/context/admin";
import { CategoryDTO } from "@/types";
import { Image } from "@heroui/image";
import { Tooltip } from "@heroui/tooltip";
import React from "react";

export type ISubCategoryTableCell = {
  id: string;
  name: string;
  description: string;
  category: CategoryDTO;
  url_image: string;
}

export type ISubCategoryTableColumn = {
  key: keyof ISubCategoryTableCell | 'actions';
  title: string;
}

const columns: ISubCategoryTableColumn[] = [
  {
    key: "name",
    title: "Nombre",
  },
  {
    key: "description",
    title: "Descripcion",
  },
  {
    key: "url_image",
    title: "Imagen",
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function SubCategoryPage() {

  const { isAdmin } = React.useContext( AuthContext );
  const { subcategory: { subcategories }, loadingData, onSelectSubCategory } = React.useContext(StoreContext);

  const renderCell = React.useCallback(
    (
      item: ISubCategoryTableCell,
      columnKey: keyof ISubCategoryTableCell | "actions",
      modalProps: DataTableModalProps<ISubCategoryTableCell>
    ) => {
      let cellValue = "";
      if (columnKey != "actions") {
        if( columnKey === "category" ){
          cellValue = item.category.name;
        }else {
          cellValue = item[columnKey];
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
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "category":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "url_image":
          return <Image src={cellValue} width={120} height={120} />;
        case "actions":
          return (
            isAdmin 
            ? (
              <div className="relative flex justify-center items-center gap-2">
              <Tooltip color="warning" content="Edit">
                <span className="text-lg text-warning cursor-pointer active:opacity-50">
                  <i className="fa-solid fa-pen-to-square" onClick={() => {
                    onSelectSubCategory( item );
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
            ) : (
              <div>No puede realizar acciones</div>
            )
          );
        default:
          return <>{cellValue}</>;
      }
    },
    [ isAdmin ]
  );

  return (
    <div className="w-full h-[100vh] flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Sub Categorias</h1>
      <DataTable
        isLoading={ loadingData }
        renderCell={renderCell}
        emptyMessage="No se encontraron sub categorias"
        filterBy={{ key: "name", text: "Nombre" }}
        data={subcategories}
        columns={columns}
        modal={SubCategoryModal}
      />
    </div>
  );
}
