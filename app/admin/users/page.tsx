"use client";
import { UserAPI } from "@/api";
import { DataTable, DataTableModalProps } from "@/components/ui/admin/DataTable";
import { LogicalDeleteModal } from "@/components/ui/admin/LogicalDeleteModal";
import { UserActions } from "@/components/ui/admin/UserActions";
import { UserModal } from "@/components/ui/admin/UserModal";
import { RenderersMap, TableCell } from "@/components/ui/table/TableCell";
import { AuthContext, StoreContext } from "@/context";
import { MinimalUserDTO, SuccessResponseDTO } from "@/types";
import { TableColumn } from "@/types/ui/table";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Tooltip } from "@heroui/tooltip";
import React, { useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
        <UserActions 
          isDeleted={ item.resourceStatus === 'DELETED' }
          isEnabled={ item.userStatus === 'ACTIVO' }
          onClickDelete={ () => {
            onSelectCell(item);
            setDeleteModalOpen(true);
          }}
          onClickDisable={ () => {} }
          onClickEdit={ () => { 
            onSelectCell(item);
            modalProps.openModal(true);
          } }
          onClickEnable={ () => handleEnableAction(item.id) }
          onClickRestore={ () => handleRestoreAction(item.id) }
        />
      ),
      condition: {
        predicate: isAdmin,
        alternateRender: <div>No puedes realizar acciones</div>,
      },
    },
  };

  const handleEnableAction = async (id: string) => {
    const res = await UserAPI.enableUser(id);
    if(res.success){
      const data = res as SuccessResponseDTO<any>;
      toast.success(data.message);
      loadUsers();
      return;
    }
    toast.error(res.message);
  }

  const handleRestoreAction = async (id: string) => {
    const res = await UserAPI.restoreUser(id);
    if(res.success){
      const data = res as SuccessResponseDTO<any>;
      toast.success(data.message);
      loadUsers();
      return;
    }
    toast.error(res.message);
  }

  const handleSuccessDelete = () => {
    setDeleteModalOpen(false);
    loadUsers();
  }

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

  return (
    <div className="w-full h-[100vh] flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Usuarios</h1>
      <DataTable
        columns={columns}
        data={user.users}
        filterBy={{ key: "firstName", text: "Nombre" }}
        extraFilterOptions={{ field: 'userStatus', options: ["ACTIVO","INACTIVO"] }}
        isLoading={user.loading}
        emptyMessage="No se encontraron usuarios"
        modal={UserModal}
        renderCell={renderCell}
        showCreateButton={ isAdmin }
      />
      {
        user.selected
        && (
          <LogicalDeleteModal 
            confirmationText={user.selected.firstName}
            handleOpenModal={(isOpen) => setDeleteModalOpen(isOpen)}
            idToDelete={user.selected.id}
            isOpen={deleteModalOpen}
            onSuccessDelete={handleSuccessDelete}
          />
        )
      }
    </div>
  );
}


        {/* <div className="relative flex justify-center items-center gap-2">
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
          {
            item.resourceStatus == "ACTIVE"
            ? (
              <Tooltip color="danger" content="Delete">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => {
                    onSelectCell(item);
                    setDeleteModalOpen(true);
                  }}
                >
                  <i className="fa-solid fa-trash" />
                </span>
              </Tooltip>
            )
            : (
              <Tooltip color="primary" content="Restore">
                <span
                  className="text-lg text-primary cursor-pointer active:opacity-50"
                  onClick={() => {
                    onSelectCell(item);
                    setDeleteModalOpen(true);
                  }}
                >
                  <i className="fa-solid fa-trash-arrow-up"></i>
                </span>
              </Tooltip>
            )
          }
        </div> */}