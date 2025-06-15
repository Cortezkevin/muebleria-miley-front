import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection
} from "@heroui/table";
import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";

export type DataTableModalProps<T> = {
  openModal: (isOpen: boolean) => void;
  openModalWithData: (selectedData: T | undefined) => void;
};

type Props<T> = {
  data: T[];
  extraFilterOptions?: { options: string[], field: keyof T };
  emptyMessage: string;
  isLoading: boolean;
  filterBy: { key: keyof T, text: string };
  columns: { key: string; title: string }[];
  showCreateButton?: boolean;
  renderCell: (
    item: T,
    columnKey: keyof T | "actions",
    modal: DataTableModalProps<T>
  ) => React.ReactNode;

  modal: (props: {
    handleOpenModal: (isOpen: boolean) => void;
    isOpen: boolean;
    data: T | undefined;
  }) => React.ReactNode;
};

export function DataTable<T>({
  data,
  extraFilterOptions,
  emptyMessage,
  filterBy,
  renderCell,
  columns,
  modal,
  isLoading,
  showCreateButton = true,
}: Props<T>) {
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [itemSelected, setItemSelected] = useState<T | undefined>(undefined);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterValue, setFilterValue] = React.useState("");

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredData = [...data];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((d) =>
        (d[filterBy.key] + "").toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if( extraFilterOptions ){
      if (statusFilter !== "all" && Array.from(statusFilter).length !== extraFilterOptions.options.length) {
        filteredData = filteredData.filter((d) =>
          Array.from(statusFilter).includes((d as any)[extraFilterOptions.field]),
        );
      }
    }
   
    return filteredData;
  }, [data, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, data, rowsPerPage]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const handleOpenModalWithData = (data: T | undefined) => {
    handleOpenModal(true);
    setItemSelected(data);
  };

  const handleOpenModal = (isOpen: boolean) => {
    setItemSelected(undefined);
    setModalOpen(isOpen);
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-2 w-full">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder={`Buscar por ${filterBy.text.toString()}...`}
              startContent={<i className="fa-solid fa-magnifying-glass"></i>}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            {
              extraFilterOptions && (
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button endContent={<i className="fa-solid fa-caret-down"></i>} variant="flat" className="capitalize">
                      { (extraFilterOptions.field as string) }
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={statusFilter}
                    selectionMode="multiple"
                    onSelectionChange={setStatusFilter}
                  >
                    {extraFilterOptions.options.map((status) => (
                      <DropdownItem key={status} className="capitalize">
                        { status }
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              )
            }
          </div>
          {showCreateButton && (
            <div className="flex gap-3">
              <Button
                color="primary"
                variant="solid"
                className="text-white"
                onPress={() => handleOpenModal(true)}
                endContent={<i className="fa-solid fa-plus"></i>}
              >
                Add New
              </Button>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total: {data.length}
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por pagina:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onRowsPerPageChange, hasSearchFilter, statusFilter, showCreateButton]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex w-full justify-between">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          variant="light"
          page={page}
          total={pages}
          onChange={(page: any) => setPage(page)}
        ></Pagination>
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <Table
        aria-label="Example table with client side pagination"
        isStriped
        isCompact
        border={2}
        topContent={topContent}
        topContentPlacement="outside"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "min-h-[222px] max-h-[550px]",
        }}
      >
        <TableHeader>
          {columns.map((c) => (
            <TableColumn key={c.key}>{c.title}</TableColumn>
          ))}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          emptyContent={emptyMessage}
          items={items}
        >
          {(item) => (
            <TableRow key={item["id" as keyof T] + ""} >
              {(columnKey) => (
                <TableCell width={400}>
                  {renderCell(item, columnKey as keyof T, {
                    openModalWithData: handleOpenModalWithData,
                    openModal: handleOpenModal,
                  })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {modal({ handleOpenModal, isOpen: modalOpen, data: itemSelected })}
    </div>
  );
}
