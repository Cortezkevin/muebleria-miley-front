"use client";

import { PurchaseOrderReceptionAPI } from "@/api";
import {
  DetailedPurchaseOrderReceptionDTO,
  PurchaseOrderDetailDTO,
  SuccessResponseDTO,
} from "@/types";
import { Button, Chip, Select, SelectItem, Spinner, Tooltip } from "@heroui/react";
import { Input } from "@heroui/input";
import React, { useEffect } from "react";
import { AuthContext } from "@/context/auth";
import toast from "react-hot-toast";
import { Utils } from "@/utils";
import { PurchaseContext } from "@/context/admin/purchase";
import * as yup from "yup";
import { Table } from "@/components/ui/admin/Table";
import { useFormik } from "formik";
import { WarehouseContext } from "@/context/admin/warehouse";
import { Card } from "@heroui/card";

type PurchaseOrderFormInputs = {
  acceptConditions: string;
  acceptedItems: string[];
  rejectReason: string;
  rejectConditions: string;
  suggestions: string;
  warehouseLocation: string;
};

const schema = yup.object().shape({
  acceptConditions: yup.string(),
  rejectReason: yup.string(),
  rejectConditions: yup.string(),
  suggestions: yup.string(),
  warehouseLocation: yup.string(),
  acceptedItems: yup.array().of(yup.string()),
});

export default function PurchaseOrderReceptionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = React.use(params);
  const { user } = React.useContext(AuthContext);

  const { loadPurchaseOrders } = React.useContext(PurchaseContext);
  const { warehouse: { warehouses } } = React.useContext(WarehouseContext);

  const {
    values,
    isValid,
    handleBlur,
    handleChange,
    errors,
    setErrors,
    setFieldValue,
    resetForm,
    touched,
  } = useFormik<PurchaseOrderFormInputs>({
    validateOnChange: true,
    isInitialValid: false,
    initialValues: {
      acceptConditions: "",
      acceptedItems: [],
      rejectConditions: "",
      rejectReason: "",
      suggestions: "",
      warehouseLocation: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: schema,
  });

  const [isDisabled, setIsDisabled] = React.useState(true);

  const [items, setItems] = React.useState<PurchaseOrderDetailDTO[]>([]);
  const [rejectItems, setRejectItems] = React.useState<PurchaseOrderDetailDTO[]>(
    []
  );
  const [acceptItems, setAcceptItems] = React.useState<PurchaseOrderDetailDTO[]>(
    []
  );

  const [purchaseOrderReception, setPurchaseOrderReception] = React.useState<
    DetailedPurchaseOrderReceptionDTO | undefined
  >();

  React.useEffect(() => {
    (async () => {
      const response = await PurchaseOrderReceptionAPI.getById(param.id);
      if (response?.success) {
        const data = response as SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO>;
        setPurchaseOrderReception(data.content);
        setItems(data.content.purchaseOrderDetails);
        setFieldValue(
          "totalItems",
          data.content.purchaseOrderDetails.length
        );
      }
    })();
  }, []);

  React.useEffect(() => {
    if( purchaseOrderReception ){
      setIsDisabled(purchaseOrderReception!.status === "COMPLETADO" ||
        (purchaseOrderReception!.status === "EN_REVISION" 
          && ( rejectItems.length + acceptItems.length ) !== purchaseOrderReception!.purchaseOrderDetails.length )
            ? true
            : (rejectItems.length === purchaseOrderReception!.purchaseOrderDetails.length) && (values.rejectConditions === "" || values.rejectReason === "" || values.suggestions === "")
            ? true 
            : (acceptItems.length === purchaseOrderReception!.purchaseOrderDetails.length) && ( values.acceptConditions === "" || values.warehouseLocation === "")
            ? true
            : false);
    }
  }, [values]);

  if (!purchaseOrderReception) {
    return (
      <div className="w-[100vw] min-h-[450px] flex items-center justify-center">
        <Spinner label="Cargando..." size="lg" />
      </div>
    );
  }

  const handleContinueProccess = () => {
    switch (purchaseOrderReception.status) {
      case "RECIBIDO":
        (async () => {
          const response =
            await PurchaseOrderReceptionAPI.checkReviewOrderReception(
              param.id
            );
          if (response?.success) {
            const data = response as SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO>;
            toast.success(data.message);
            setPurchaseOrderReception({
              ...purchaseOrderReception,
              reviewDate: data.content.reviewDate,
              status: data.content.status,
            });
            loadPurchaseOrders();
          }
        })();
        return;
      case "EN_REVISION":
        (async () => {
          const response =
            await PurchaseOrderReceptionAPI.acceptOrRejectOrderMaterials(
              param.id,
              {
                acceptConditions: values.acceptConditions,
                acceptedOrderDetailIds: values.acceptedItems,
                rejectConditions: values.rejectConditions,
                rejectReason: values.rejectReason,
                suggestions: values.suggestions,
                warehouseLocation: values.warehouseLocation,
              }
            );
          if (response?.success) {
            const data = response as SuccessResponseDTO<DetailedPurchaseOrderReceptionDTO>;
            toast.success(data.message);
            setPurchaseOrderReception({
              ...purchaseOrderReception,
              purchaseOrderDetails: data.content.purchaseOrderDetails,
              completedDate: data.content.completedDate,
              status: data.content.status,
            });
            resetForm();
            setItems( data.content.purchaseOrderDetails );
            loadPurchaseOrders();
          }
        })();
        return;
      default: {
        return;
      }
    }
  };

  const handleAcceptItem = (item: PurchaseOrderDetailDTO) => {
    setItems(items.filter((i) => i.id !== item.id));
    setAcceptItems([...acceptItems, item]);
    setFieldValue("acceptedItems", [...values.acceptedItems, item.id]);
    // setear al listar
  };

  const handleRejectItem = (item: PurchaseOrderDetailDTO) => {
    setItems(items.filter((i) => i.id !== item.id));
    setRejectItems([...rejectItems, item]);
  };

  const handleRemoveAcceptedItem = (item: PurchaseOrderDetailDTO) => {
    setItems([...items, item]);
    setAcceptItems(acceptItems.filter((i) => i.id !== item.id));
    setFieldValue(
      "acceptedItems",
      values.acceptedItems.filter((id) => id !== item.id)
    );
  };

  const handleRemoveRejectedItem = (item: PurchaseOrderDetailDTO) => {
    setItems([...items, item]);
    setRejectItems(rejectItems.filter((i) => i.id !== item.id));
  };

  const getColumns = (columnsType: "reject" | "accept" | "items") => {
    return [
      {
        id: "name",
        text: "Nombre",
        selector: (i: PurchaseOrderDetailDTO) => (
          <div key={i.name + i.id}>{i.name}</div>
        ),
      },
      {
        id: "measurementUnit",
        text: "Unidad de Medida",
        selector: (i: PurchaseOrderDetailDTO) => (
          <div key={i.measurementUnit + i.id}>{i.measurementUnit}</div>
        ),
      },
      {
        id: "amount",
        text: "Cantidad",
        selector: (i: PurchaseOrderDetailDTO) => (
          <div key={i.amount + i.id}>{i.amount}</div>
        ),
      },
      {
        id: "total",
        text: "Total",
        selector: (i: PurchaseOrderDetailDTO) => (
          <div key={i.total + i.id}>S/. {i.total}</div>
        ),
      },
      {
        id: "actions",
        text:
          purchaseOrderReception.status === "COMPLETADO" ? "Estado" : "Actions",
        selector: (i: PurchaseOrderDetailDTO) =>
          columnsType === "items" ? (
            <div key={i.id} className="text-center flex gap-2">
              {i.status === "NO_RECEPCIONADO" ? (
                <>
                  <Button
                    size="sm"
                    color="success"
                    className="text-white"
                    onClick={() => handleAcceptItem(i)}
                    isDisabled={purchaseOrderReception.status !== "EN_REVISION"}
                  >
                    Aceptar
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => handleRejectItem(i)}
                    isDisabled={purchaseOrderReception.status !== "EN_REVISION"}
                  >
                    Rechazar
                  </Button>
                </>
              ) : i.status === "ACEPTADO" ? (
                <Chip variant="flat" color="success">
                  Aceptado
                </Chip>
              ) : (
                <Chip variant="flat" color="danger">
                  Rechazado
                </Chip>
              )}
            </div>
          ) : (
            <Tooltip
              key={i.id}
              color="danger"
              placement="top"
              content="Remove"
              size="sm"
            >
              <span
                className="text-center text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() =>
                  columnsType === "accept"
                    ? handleRemoveAcceptedItem(i)
                    : handleRemoveRejectedItem(i)
                }
              >
                <i className="fa-solid fa-trash"></i>
              </span>
            </Tooltip>
          ),
      },
    ];
  };

  return (
    <div className="w-full flex items-center justify-center overflow-auto">
      <div className="min-w-[300px] w-full flex flex-col gap-6 items-center justify-center">
        <div className="w-full flex justify-between items-center text-2xl font-semibold">
          <h1 className=" flex gap-2">
            Proceso de Recepcion de la Orden de Pedido:
            <p className="text-primary">#{purchaseOrderReception.id}</p>
          </h1>
          <div className="flex gap-4">
            <p>Estado:</p>
            <Chip
              variant="flat"
              size="lg"
              color={
                purchaseOrderReception.status === "EN_REVISION"
                  ? "warning"
                  : purchaseOrderReception.status === "COMPLETADO"
                  ? "success"
                  : "danger"
              }
            >
              {purchaseOrderReception.status}
            </Chip>
          </div>
        </div>
        <div className="flex gap-1">
          <h3>
            {purchaseOrderReception.status === "COMPLETADO"
              ? "Completado por:"
              : "A cargo del empleado: "}
          </h3>
          <p className="font-semibold">
            {purchaseOrderReception.grocer.fullName}
          </p>
        </div>
        <div className="w-full flex flex-col p-4 items-center justify-center gap-4 ">
          <h3 className="text-lg font-semibold">Control de Tiempos</h3>
          <div className="flex gap-4">
            <Card className="p-4 rounded-lg flex flex-col items-center">
              Fecha de Creacion
              <p className="text-lg font-semibold">
                {Utils.formatDate(purchaseOrderReception.createdDate)}
              </p>
            </Card>
            <Card className="p-4 rounded-lg flex flex-col items-center">
              Fecha de Inicio
              <p className="text-lg font-semibold">
                {Utils.formatDate(purchaseOrderReception.startDate)}
              </p>
            </Card>
            <Card className="p-4 rounded-lg flex flex-col items-center">
              Fecha de Revision
              <p className="text-lg font-semibold">
                {purchaseOrderReception.reviewDate
                  ? Utils.formatDate(purchaseOrderReception.reviewDate)
                  : "No Registrado"}
              </p>
            </Card>
            <Card className="p-4 rounded-lg flex flex-col items-center">
              Fecha de Finalizacion
              <p className="text-lg font-semibold">
                {purchaseOrderReception.completedDate
                  ? Utils.formatDate(purchaseOrderReception.completedDate)
                  : "No Registrado"}
              </p>
            </Card>
          </div>
        </div>
        <div className="min-w-[300px] flex xl:flex-row md:flex-col gap-6 justify-center">
          <Card className="flex flex-col gap-4 w-[300px] p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Informacion del Proveedor</h3>
            <div className="flex flex-col gap-2">
              <Input
                label="Nombre del Proveedor"
                value={purchaseOrderReception.supplier.name}
                isReadOnly
              />
              <Input
                label="RUC"
                value={purchaseOrderReception.supplier.ruc}
                isReadOnly
              />
              <Input
                label="Numero de Telefono"
                value={purchaseOrderReception.supplier.phone}
                isReadOnly
              />
            </div>
          </Card>
          <Card className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 p-4 shadow-lg rounded-lg w-[820px]">
              <h3 className="text-lg font-semibold">Productos a Revisar</h3>
              <Table
                columns={getColumns("items")}
                data={items}
                emptyMessage={"Se seleccionaron todos los items"}
              />
            </div>
          </Card>
        </div>
        {purchaseOrderReception.status === "EN_REVISION" && (
          <div className="flex flex-col gap-4">
            <Card className="flex flex-col gap-4 p-4 rounded-lg w-[650px] max-w-[700px]">
              <h3 className="text-lg font-semibold">Productos Aceptados</h3>
              <Table
                columns={getColumns("accept")}
                data={acceptItems}
                emptyMessage={
                  !!errors.acceptedItems ? (
                    <p className="text-danger">{errors.acceptedItems}</p>
                  ) : (
                    "Los items aceptados se veran aqui"
                  )
                }
              />
              <div className={"flex flex-col gap-4"}>
                <h3 className="text-lg font-semibold">Información adicional</h3>
                <div className="flex flex-col gap-2">
                  <Input
                    isRequired
                    isDisabled={acceptItems.length === 0}
                    onChange={handleChange("acceptConditions")}
                    onBlur={handleBlur("acceptConditions")}
                    value={values.acceptConditions}
                    label="Condicion de los Productos"
                    isInvalid={
                      !!errors.acceptConditions && touched.acceptConditions
                    }
                    errorMessage={
                      touched.acceptConditions && errors.acceptConditions
                    }
                    variant="bordered"
                  />
                  <Select
                    isRequired
                    items={warehouses}
                    label="Ubicacion de Almacen"
                    variant="bordered"
                    onChange={handleChange("warehouseLocation")}
                    onBlur={handleBlur("warehouseLocation")}
                    value={values.warehouseLocation}
                    isInvalid={!!errors.warehouseLocation && touched.warehouseLocation}
                    errorMessage={touched.warehouseLocation && errors.warehouseLocation}
                  >
                    {(warehouse) => (
                      <SelectItem /* value={warehouse.id} */ key={warehouse.id}>
                        {warehouse.location}
                      </SelectItem>
                    )}
                  </Select>
                </div>
              </div>
            </Card>
            <Card className="flex flex-col gap-4 p-4  rounded-lg w-[650px] max-w-[700px]">
              <h3 className="text-lg font-semibold">Productos Rechazados</h3>
              <Table
                columns={getColumns("reject")}
                data={rejectItems}
                emptyMessage={"Los items rechazados se veran aqui"}
              />
              <h3 className="text-lg font-semibold">Información de Rechazo</h3>
              <div className="flex flex-col gap-2">
                <Input
                  isRequired
                  isDisabled={rejectItems.length === 0}
                  onChange={handleChange("rejectReason")}
                  onBlur={handleBlur("rejectReason")}
                  value={values.rejectReason}
                  label="Razon de Rechazo"
                  isInvalid={!!errors.rejectReason && touched.rejectReason}
                  errorMessage={touched.rejectReason && errors.rejectReason}
                  variant="bordered"
                />
                <Input
                  isRequired
                  isDisabled={rejectItems.length === 0}
                  onChange={handleChange("rejectConditions")}
                  onBlur={handleBlur("rejectConditions")}
                  value={values.rejectConditions}
                  label="Condicion de los Productos"
                  isInvalid={
                    !!errors.rejectConditions && touched.rejectConditions
                  }
                  errorMessage={
                    touched.rejectConditions && errors.rejectConditions
                  }
                  variant="bordered"
                />
                <Input
                  isRequired
                  isDisabled={rejectItems.length === 0}
                  onChange={handleChange("suggestions")}
                  onBlur={handleBlur("suggestions")}
                  value={values.suggestions}
                  label="Sugerencias"
                  isInvalid={!!errors.suggestions && touched.suggestions}
                  errorMessage={touched.suggestions && errors.suggestions}
                  variant="bordered"
                />
              </div>
            </Card>
          </div>
        )}
        <Button
          isDisabled={
            isDisabled
            /* purchaseOrderReception.status === "COMPLETADO" ||
            (purchaseOrderReception.status === "EN_REVISION" 
              && ( rejectItems.length + acceptItems.length ) !== purchaseOrderReception.purchaseOrderDetails.length )
                ? true
                : (rejectItems.length === purchaseOrderReception.purchaseOrderDetails.length) && (values.rejectConditions === "" || values.rejectReason === "" || values.suggestions === "")
                ? true 
                : (acceptItems.length === purchaseOrderReception.purchaseOrderDetails.length) && ( values.acceptConditions === "" || values.warehouseLocation === "")
                ? true
                : false */
          }
          color="primary"
          size="lg"
          className="w-[400px] text-white"
          onClick={handleContinueProccess}
        >
          {purchaseOrderReception.status !== "COMPLETADO"
            ? purchaseOrderReception.status === "RECIBIDO"
              ? "Iniciar Revision"
              : "Completar"
            : "Proceso Completado"}
        </Button>
      </div>
    </div>
  );
}
