"use client";
import { DataTable, DataTableModalProps } from "@/components/ui/admin/DataTable";
import { UserModal } from "@/components/ui/admin/UserModal";
import { RenderersMap, TableCell } from "@/components/ui/table/TableCell";
import { AuthContext, StoreContext } from "@/context";
import { MinimalUserDTO } from "@/types";
import { TableColumn } from "@/types/ui/table";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Tooltip } from "@heroui/tooltip";
import React, { useCallback, useContext } from "react";

const columns: TableColumn<MinimalUserDTO>[] = [
  { key: "photoUrl", title: "Foto" },
  { key: "firstName", title: "Nombre" },
  { key: "lastName", title: "Apellidos" },
  { key: "email", title: "Email" },
  { key: "roles", title: "Roles" },
  { key: "userStatus", title: "Estado del Usuario" },
  { key: "resourceStatus", title: "Estado General" },
  { key: "actions", title: "Acciones" },
];

export default function UsersPage() {
  const {
    user,
    loadUsers,
    onSelectUser,
  } = React.useContext( StoreContext );
  
  const { isAdmin } = useContext( AuthContext );

  const userCellRenderers: RenderersMap<MinimalUserDTO> = {
    photoUrl: {
      render: ({ item }) => (
        <div className="flex flex-col">
          <Image
            className="object-cover"
            width={60}
            height={60}
            src={item.photoUrl}
            alt={`${item.email}_picture`}
          />
        </div>
      ),
    },
    firstName: {
      render: ({ item }) => (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{item.firstName}</p>
        </div>
      ),
    },
    lastName: {
      render: ({ item }) => (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{item.lastName}</p>
        </div>
      ),
    },
    email: {
      render: ({ item }) => (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{item.email}</p>
        </div>
      ),
    },
    roles: {
      render: ({ item }) => (
        <div className="flex gap-2 flex-wrap">
          {item.roles.map((r) => (
            <Chip
              key={r}
              variant="flat"
              color={
                r === "ROLE_USER" ? "warning" : r === "ROLE_ADMIN" ? "danger" : "secondary"
              }
            >
              {r}
            </Chip>
          ))}
        </div>
      ),
    },
    userStatus: {
      render: ({ item }) => (
        <Chip
          variant="flat"
          color={item.userStatus === "ACTIVO" ? "success" : "danger"}
        >
          {item.userStatus}
        </Chip>
      ),
    },
    resourceStatus: {
      render: ({ item }) => (
        <Chip
          variant="flat"
          color={item.resourceStatus === "ACTIVE" ? "success" : "danger"}
        >
          {item.resourceStatus}
        </Chip>
      ),
    },
    actions: {
      render: ({ item, onSelectCell, modalProps }) => (
        <div className="relative flex justify-center items-center gap-2">
          <Tooltip color="warning" content="Edit">
            <span
              className="text-lg text-warning cursor-pointer active:opacity-50"
              onClick={() => {
                onSelectCell(item);
                modalProps.openModal(true);
              }}
            >
              <i className="fa-solid fa-pen-to-square" />
            </span>
          </Tooltip>
          <Tooltip color="warning" content="Delete">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => {
                alert("Eliminar usuario");
              }}
            >
              <i className="fa-solid fa-trash" />
            </span>
          </Tooltip>
        </div>
      ),
      condition: {
        predicate: isAdmin,
        alternateRender: <div>No puedes realizar acciones</div>,
      },
    },
  };

  const renderCell = useCallback(
  (item: MinimalUserDTO, columnKey: keyof MinimalUserDTO | "actions", modalProps: DataTableModalProps<MinimalUserDTO>) => (
    <TableCell
      item={item}
      columnKey={columnKey}
      modalProps={modalProps}
      onSelectCell={onSelectUser}
      renderers={userCellRenderers}
    />
  ),
  [onSelectUser, userCellRenderers]
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
