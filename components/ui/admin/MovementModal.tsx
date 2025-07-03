import {
  CreateInventoryMovementDTO,
  InventoryMovementType,
  ProductDTO,
  RawMaterialDTO,
  MaterialOrProductDTO,
} from "@/types";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { AuthContext, StoreContext } from "@/context";
import { PurchaseContext } from "@/context/admin/purchase";
import { Tooltip } from "@heroui/react";
import { Table } from "./Table";
import { WarehouseContext } from "@/context/admin/warehouse";
import toast from "react-hot-toast";

type Props = {
  handleOpenModal: (isOpen: boolean) => void;
  isOpen: boolean;
};

type ProductFormInputs = {
  materialOrProducts: MaterialOrProductDTO[];
  warehouse: string;
  conditions: string;
  type: InventoryMovementType;
  reason: string;
};

const materialOrProductSchema = yup.object().shape({
  id: yup.string().required("Campo requerido"),
  amount: yup
    .number()
    .positive("Debe ser un número positivo")
    .required("Campo requerido"),
});

const schema = yup.object().shape({
  reason: yup.string().required("Campo requerido"),
  type: yup.string().required("Seleccione un tipo de movimiento"),
  conditions: yup.string().required("Campo requerido"),
  warehouse: yup.string().required("Campo requerido"),
  materialOrProducts: yup
    .array()
    .of(materialOrProductSchema)
    .min(1, "Seleccione al menos un producto o material")
    .required("Campo requerido"),
});

export function MovementModal({ handleOpenModal, isOpen }: Props) {
  const {
    product: { products },
  } = React.useContext(StoreContext);

  const {
    rawMaterial: { rawMaterials },
  } = React.useContext(PurchaseContext);

  const {
    user: { roleExtraData, roles },
  } = React.useContext(AuthContext);

  const {
    warehouse: { warehouses },
    movement: { selected },
    onSelectMovement,
    onCreateOrEditMovement,
  } = React.useContext(WarehouseContext);

  React.useEffect(() => {
    if (!isOpen) {
      onSelectMovement(null);
    }
  }, [isOpen]);

  const [productAmount, setProductAmount] = React.useState(1);
  const [materialAmount, setMaterialAmount] = React.useState(1);
  const [selectedProduct, setSelectedProduct] = React.useState<
    ProductDTO | undefined
  >();
  const [selectedMaterial, setSelectedMaterial] = React.useState<
    RawMaterialDTO | undefined
  >();

  const {
    handleChange,
    handleBlur,
    touched,
    values,
    setFieldValue,
    isValid,
    resetForm,
    errors,
  } = useFormik<ProductFormInputs>({
    validateOnChange: true,
    isInitialValid: false,
    initialValues: {
      materialOrProducts: [],
      reason: "",
      conditions: "",
      type: "ENTRADA",
      warehouse: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: schema,
  });

  const onSubmit = async () => {
    if (roles.includes("ROLE_WAREHOUSE") && roleExtraData) {
      onCreateOrEditMovement(
        "Create",
        null,
        {
          materialOrProducts: values.materialOrProducts,
          reason: values.reason,
          type: values.type,
          grocerId: roleExtraData.id,
          conditions: values.conditions,
          warehouse: values.warehouse,
        } as CreateInventoryMovementDTO,
        () => {
          resetForm();
          handleOpenModal(false);
        }
      );
    }
  };

  React.useEffect(() => {
    setFieldValue("materialOrProducts", []);
    setProductAmount(1);
    setMaterialAmount(1);
    setSelectedProduct(undefined);
    setSelectedMaterial(undefined);
  }, [values.type]);

  const handleClose = () => {
    resetForm();
  };

  const handleSelectMaterial = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "") {
      setSelectedMaterial(rawMaterials.find((p) => p.id === e.target.value));
    } else {
      setSelectedMaterial(undefined);
    }
    setMaterialAmount(1);
  };

  const handleSelectProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "") {
      setSelectedProduct(products.find((p) => p.id === e.target.value));
    } else {
      setSelectedProduct(undefined);
    }
    setProductAmount(1);
  };

  const handleAddProduct = async () => {
    if (selectedProduct) {
      const actualItems = values.materialOrProducts;
      const productToAdd = actualItems.find((i) => i.id === selectedProduct.id);
      if (productToAdd) {
        if (
          values.type === "ENTRADA" ||
          !(productToAdd.amount + productAmount > selectedProduct.stock)
        ) {
          await setFieldValue(
            "materialOrProducts",
            actualItems.map((i) => {
              if (i.id === selectedProduct.id) {
                return {
                  ...i,
                  amount: i.amount + productAmount,
                };
              } else {
                return i;
              }
            }),
            true
          );
        } else {
          toast.error("La cantidad a ingresar supera el stock del producto");
        }
      } else {
        await setFieldValue(
          "materialOrProducts",
          [
            ...(actualItems as any),
            {
              id: selectedProduct.id,
              unitPrice: selectedProduct.price,
              amount: productAmount,
              name: selectedProduct.name,
              measurementUnit: "CANTIDAD",
            },
          ] as MaterialOrProductDTO[],
          true
        );
      }

      setProductAmount(1);
    }
  };

  const handleIncreaseProductAmount = () => {
    if (selectedProduct) {
      const newAmount = productAmount + 1;
      if (values.type === "PRODUCCION" || values.type === "SALIDA") {
        if (newAmount > selectedProduct.stock) {
          toast.error("No hay mas stock de " + selectedProduct.name);
        } else {
          setProductAmount(productAmount + 1);
        }
      } else {
        setProductAmount(productAmount + 1);
      }
    }
  };

  const handleDecreaseProductAmount = () => {
    if (productAmount == 1) {
      setProductAmount(1);
    } else {
      setProductAmount(productAmount - 1);
    }
  };

  const handleAddMaterial = async () => {
    if (selectedMaterial) {
      const actualItems = values.materialOrProducts;
      const materialToAdd = actualItems.find(
        (i) => i.id === selectedMaterial.id
      );
      if (materialToAdd) {
        if (
          values.type === "ENTRADA" ||
          !(materialToAdd.amount + materialAmount > selectedMaterial.stock)
        ) {
          await setFieldValue(
            "materialOrProducts",
            actualItems.map((i) => {
              if (i.id === selectedMaterial.id) {
                return {
                  ...i,
                  amount: i.amount + materialAmount,
                };
              } else {
                return i;
              }
            }),
            true
          );
        } else {
          toast.error("La cantidad a ingresar supera el stock del material");
        }
      } else {
        await setFieldValue(
          "materialOrProducts",
          [
            ...(actualItems as any),
            {
              id: selectedMaterial.id,
              amount: materialAmount,
              name: selectedMaterial.name,
              measurementUnit: selectedMaterial.measurementUnit,
            },
          ] as MaterialOrProductDTO[],
          true
        );
      }
      setMaterialAmount(1);
    }
  };

  const handleIncreaseMaterialAmount = () => {
    if (selectedMaterial) {
      const newAmount = materialAmount + 1;
      if (values.type === "PRODUCCION" || values.type === "SALIDA") {
        if (newAmount > selectedMaterial.stock) {
          toast.error("No hay mas stock de " + selectedMaterial.name);
        } else {
          setMaterialAmount(materialAmount + 1);
        }
      } else {
        setMaterialAmount(materialAmount + 1);
      }
    }
  };

  const handleDecreaseMaterialAmount = () => {
    if (materialAmount == 1) {
      setMaterialAmount(1);
    } else {
      setMaterialAmount(materialAmount - 1);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setFieldValue(
      "materialOrProducts",
      values.materialOrProducts.filter((d) => d.id !== itemId),
      true
    );
  };

  const getColumns = () => {
    return [
      {
        id: "name",
        text: "Nombre",
        selector: (i: MaterialOrProductDTO) => (
          <div key={i.name + i.id}>{i.name}</div>
        ),
      },
      {
        id: "measurementUnit",
        text: "Unidad de Medida",
        selector: (i: MaterialOrProductDTO) => (
          <div key={i.measurementUnit + i.id}>{i.measurementUnit}</div>
        ),
      },
      {
        id: "amount",
        text: "Cantidad",
        selector: (i: MaterialOrProductDTO) => (
          <div key={i.amount + i.id}>{i.amount}</div>
        ),
      },
      {
        id: "actions",
        text: "Acciones",
        selector: (i: MaterialOrProductDTO) => (
          <Tooltip color="danger" content="Remove" size="sm">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => handleRemoveItem(i.id)}
            >
              <i className="fa-solid fa-trash"></i>
            </span>
          </Tooltip>
        ),
      },
    ];
  };

  return (
    <Modal
      size={"xl"}
      isOpen={isOpen}
      onOpenChange={handleOpenModal}
      placement="center"
      onClose={handleClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Realizar Movimientos
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div className={`flex flex-col gap-2 `}>
                  <Select
                    items={[
                      { id: "ENTRADA", name: "ENTRADA" },
                      { id: "SALIDA", name: "SALIDA" },
                      { id: "PRODUCCION", name: "PRODUCCION" },
                    ]}
                    label="Tipo de Movimiento"
                    variant="bordered"
                    onChange={handleChange("type")}
                    onBlur={handleBlur("type")}
                    description={
                      "Al cambiar el tipo de movimiento se reseteara la lista previamente seleccionada"
                    }
                    value={values.type}
                    defaultSelectedKeys={["ENTRADA"]}
                    isInvalid={!!errors.type && touched.type}
                    errorMessage={touched.type && errors.type}
                  >
                    {(t) => (
                      <SelectItem key={t.id}>
                        {t.name}
                      </SelectItem>
                    )}
                  </Select>
                  <div className="flex flex-col gap-2 col-span-3">
                    <h3 className="text-sm font-semibold">
                      {`Materiales / Productos ${
                        values.type === "ENTRADA"
                          ? "a ingresar"
                          : values.type === "SALIDA"
                          ? "a retirar"
                          : ""
                      }`}
                    </h3>
                    <div className="flex gap-1 items-center">
                      <Select
                        items={rawMaterials.filter((p) => {
                          if (values.type !== "ENTRADA" && p.stock === 0) {
                            return null;
                          }
                          return p;
                        })}
                        label="Materiales"
                        variant="bordered"
                        size="sm"
                        onChange={handleSelectMaterial}
                        isDisabled={(values.type as any) === ""}
                      >
                        {(material) => (
                          <SelectItem
                            /* value={material.id} */
                            key={material.id}
                            textValue={material.name}
                          >
                            <span>
                              {`${material.name} - `}
                              <strong>Stock:</strong>
                              {` ${material.stock}`}
                            </span>
                          </SelectItem>
                        )}
                      </Select>
                      <div className="flex items-center">
                        <div className="border-y-[2px] border-l-[2px] min-w-10 border-default-200 rounded-l-lg shadow-sm p-2 h-full text-lg font-semibold text-center select-none">
                          {materialAmount}
                        </div>
                        <div className="flex flex-col">
                          <div
                            onClick={handleIncreaseMaterialAmount}
                            className="transition-all duration-200 border-x-[2px] border-t-[2px] border-b-[1px] border-default-200 w-6 h-6 flex items-center justify-center text-default-400 text-sm p-1 cursor-pointer hover:border-default-400"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </div>
                          <div
                            onClick={handleDecreaseMaterialAmount}
                            className="transition-all duration-200 border-x-[2px] border-t-[2px] border-b-[1px] border-default-200 w-6 h-6 flex items-center justify-center text-default-400 text-sm p-1 cursor-pointer hover:border-default-400"
                          >
                            <i className="fa-solid fa-minus"></i>
                          </div>
                        </div>
                      </div>
                    

                      <Button
                        onClick={handleAddMaterial}
                        size="lg"
                        color="primary"
                        className="text-white"
                        isIconOnly
                        isDisabled={!selectedMaterial}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </Button>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Select
                        items={products.filter((p) => {
                          if (values.type !== "ENTRADA" && p.stock === 0) {
                            return null;
                          }
                          if( values.type === "PRODUCCION"){
                            return null;
                          }
                          return p;
                        })}
                        label="Productos"
                        variant="bordered"
                        size="sm"
                        isDisabled={(values.type as any) === ""}
                        onChange={handleSelectProduct}
                      >
                        {(product) => (
                          <SelectItem
                            //value={product.id}
                            key={product.id}
                            textValue={product.name}
                          >
                            <span>
                              {`${product.name} - `}
                              <strong>Stock:</strong>
                              {` ${product.stock}`}
                            </span>
                          </SelectItem>
                        )}
                      </Select>
                      <div className="flex items-center">
                        <div className="border-y-[2px] border-l-[2px] min-w-10 border-default-200 rounded-l-lg shadow-sm p-2 h-full text-lg font-semibold text-center select-none">
                          {productAmount}
                        </div>
                        <div className="flex flex-col">
                          <div
                            onClick={handleIncreaseProductAmount}
                            className="transition-all duration-200 border-x-[2px] border-t-[2px] border-b-[1px] border-default-200 w-6 h-6 flex items-center justify-center text-default-400 text-sm p-1 cursor-pointer hover:border-default-400"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </div>
                          <div
                            onClick={handleDecreaseProductAmount}
                            className="transition-all duration-200 border-x-[2px] border-t-[2px] border-b-[1px] border-default-200 w-6 h-6 flex items-center justify-center text-default-400 text-sm p-1 cursor-pointer hover:border-default-400"
                          >
                            <i className="fa-solid fa-minus"></i>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={handleAddProduct}
                        size="lg"
                        color="primary"
                        className="text-white"
                        isIconOnly
                        isDisabled={!selectedProduct}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </Button>
                    </div>
                    {values.type.toString() !== "" && (
                      <small className="text-default-500/75 w-full px-2 text-xs">
                        {`Seleccione los productos o materiales ${
                          values.type === "ENTRADA"
                            ? "que ingresaran"
                            : " que saldran"
                        }`}
                      </small>
                    )}
                    <Table
                      columns={getColumns()}
                      data={values.materialOrProducts}
                      emptyMessage={"No se seleccionaron materiales"}
                    />
                  </div>
                  <Input
                    isRequired
                    onChange={handleChange("reason")}
                    onBlur={handleBlur("reason")}
                    value={values.reason}
                    label="Razon de Movimiento"
                    isInvalid={!!errors.reason && touched.reason}
                    errorMessage={touched.reason && errors.reason}
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    onChange={handleChange("conditions")}
                    onBlur={handleBlur("conditions")}
                    value={values.conditions}
                    label="Condiciones de los Productos/Materiales"
                    isInvalid={!!errors.conditions && touched.conditions}
                    errorMessage={touched.conditions && errors.conditions}
                    variant="bordered"
                  />
                  <Select
                    isRequired
                    items={warehouses}
                    label="Almacen"
                    variant="bordered"
                    onChange={handleChange("warehouse")}
                    onBlur={handleBlur("warehouse")}
                    value={values.warehouse}
                    isInvalid={!!errors.warehouse && touched.warehouse}
                    errorMessage={touched.warehouse && errors.warehouse}
                  >
                    {(warehouse) => (
                      <SelectItem /* value={warehouse.id} */ key={warehouse.id}>
                        {warehouse.location}
                      </SelectItem>
                    )}
                  </Select>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  resetForm();
                  onClose();
                }}
              >
                Cerrar
              </Button>
              <Button
                color="primary"
                className="text-white"
                onPress={onSubmit}
                isDisabled={!isValid}
              >
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
