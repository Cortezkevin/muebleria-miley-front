"use client";
import { DataTable, DataTableModalProps } from "@/components/ui/admin/DataTable";
import { UserModal } from "@/components/ui/admin/UserModal";
import { AuthContext, StoreContext } from "@/context";
import { ResourceStatus, UserStatus } from "@/types";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Tooltip } from "@heroui/tooltip";
import React, { useContext } from "react";

export type IUsersTableCell = {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  email: string;
  userStatus: UserStatus,
  resourceStatus: ResourceStatus,
  roles: string[];
}

export type IUsersTableColumn = {
  key: keyof IUsersTableCell | 'actions';
  title: string;
}

const columns: IUsersTableColumn[] = [
  {
    key: "photoUrl",
    title: "Foto"
  },
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
    key: "userStatus",
    title: "Estado del Usuario"
  },
  {
    key: "resourceStatus",
    title: "Estado General"
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function UsersPage() {
  const {
    user,
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
        case "photoUrl":
          return (
            <div className="flex flex-col">
              <Image className="object-cover" width={60} height={60} src={cellValue} alt={item.email+"_picture"} />
            </div>
          );
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
        case "userStatus":
          return (
            <Chip variant="flat" color={ cellValue as UserStatus === "ACTIVO" ? "success" : "danger" } >{ cellValue }</Chip>
          )
        case "resourceStatus":
          return (
            <Chip variant="flat" color={ cellValue as ResourceStatus === "ACTIVE" ? "success" : "danger" } >{ cellValue }</Chip>
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
              <Tooltip color="warning" content="Delete">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => {
                      alert("Eliminar usuario")
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
        data={user.users}
        filterBy={{ key: "firstName", text: "Nombre" }}
        isLoading={user.loading}
        emptyMessage="No se encontraron usuarios"
        modal={UserModal}
        renderCell={renderCell}
        showCreateButton={ isAdmin }
      />
    </div>
  );
}
