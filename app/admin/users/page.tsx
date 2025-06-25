"use client";
import { DataTable, DataTableModalProps } from "@/components/ui/admin/DataTable";
import { UserModal } from "@/components/ui/admin/UserModal";
import { AuthContext, StoreContext } from "@/context";
import { Status } from "@/types";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import React, { useContext } from "react";

export type IUsersTableCell = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: Status,
  roles: string[];
}

export type IUsersTableColumn = {
  key: keyof IUsersTableCell | 'actions';
  title: string;
}

const columns: IUsersTableColumn[] = [
  {
    key: "firstName",
    title: "Nombre",
  },
  {
    key: "lastName",
    title: "Apellidos",
  },
  {
    key: "email",
    title: "Email",
  },
  {
    key: "roles",
    title: "Roles",
  },
  {
    key: "status",
    title: "Estado"
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function UsersPage() {
  const {
    user: { users },
    loadingData,
    loadUsers,
    onSelectUser,
  } = React.useContext( StoreContext );
  
  const { isAdmin } = useContext( AuthContext );
  const renderCell = React.useCallback(
    (
      item: IUsersTableCell,
      columnKey: keyof IUsersTableCell | "actions",
      modalProps: DataTableModalProps<IUsersTableCell>
    ) => {
      let cellValue = "";
      let roles: string[] = [];
      if (columnKey === "roles") {
        roles = item[columnKey];
      }
      if (columnKey != "actions" && columnKey != "roles") {
        cellValue = item[columnKey];
      }

      switch (columnKey) {
        case "firstName":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "lastName":
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
        case "roles":
          return (
            <div className="flex gap-2 flex-wrap">
              {roles.map((r) => (
                <Chip
                  key={ r }
                  variant="flat"
                  color={
                    r === "ROLE_USER"
                      ? "warning"
                      : r === "ROLE_ADMIN"
                      ? "danger"
                      : "secondary"
                  }
                >
                  {r}
                </Chip>
              ))}
            </div>
          );
        case "status":
          return (
            <Chip variant="flat" color={ cellValue as Status === "ACTIVO" ? "success" : "danger" } >{ cellValue }</Chip>
          )
        case "actions":
          return (
            isAdmin
            ? (
              <div className="relative flex justify-center items-center gap-2">
              <Tooltip color="warning" content="Edit">
                <span className="text-lg text-warning cursor-pointer active:opacity-50">
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => {
                      onSelectUser(item);
                      modalProps.openModal(true);
                    }}
                  ></i>
                </span>
              </Tooltip>
            </div>
            ) : (
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
    loadUsers();
  }, [])

  return (
    <div className="w-full h-[100vh] flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Usuarios</h1>
      <DataTable
        columns={columns}
        data={users}
        filterBy={{ key: "firstName", text: "Nombre" }}
        isLoading={loadingData}
        emptyMessage="No se encontraron usuarios"
        modal={UserModal}
        renderCell={renderCell}
        showCreateButton={ isAdmin }
      />
    </div>
  );
}
