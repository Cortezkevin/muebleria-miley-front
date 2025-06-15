"use client";

import { CategoryModal } from "@/components/ui/admin/CategoryModal";
import { DataTable, DataTableModalProps } from "@/components/ui/admin/DataTable";
import { AuthContext, StoreContext } from "@/context";
import { Image } from "@heroui/image";
import { Tooltip } from "@heroui/tooltip";
import React from "react";

export type ICategoryTableCell = {
  id: string;
  name: string;
  description: string;
  url_image: string;
}

export type ICategoryTableColumn = {
  key: keyof ICategoryTableCell | 'actions';
  title: string;
}

const columns: ICategoryTableColumn[] = [
  {
    key: "name",
    title: "Nombre",
  },
  {
    key: "description",
    title: "Descripcion"
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

export default function CategoryPage() {

  const { category: { categories }, loadingData, onSelectCategory } = React.useContext( StoreContext );
  const { isAdmin } = React.useContext(AuthContext);

  const renderCell = React.useCallback(
    (
      item: ICategoryTableCell,
      columnKey: keyof ICategoryTableCell | "actions",
      modalProps: DataTableModalProps<ICategoryTableCell>
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
        case "description":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize line-clamp-2">{cellValue}</p>
            </div>
          );
        case "url_image":
          return <Image src={cellValue} width={120} height={120} />;
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip color="warning" content="Edit">
                <span className="text-lg text-warning cursor-pointer active:opacity-50">
                  <i className="fa-solid fa-pen-to-square" onClick={() => {
                    onSelectCategory( item );
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
          );
        default:
          return <>{cellValue}</>;
      }
    }, []);

  return (
    <div className="w-full h-[100vh] flex flex-col gap-6 overflow-hidden animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Categorias</h1>
      <DataTable
        isLoading={ loadingData }
        renderCell={renderCell}
        emptyMessage="No se encontraron categorias"
        filterBy={{ key: "name", text: "Nombre" }}
        data={categories}
        columns={columns}
        modal={ CategoryModal }
        showCreateButton={ isAdmin }
      />
    </div>
  );
}
