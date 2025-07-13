import { AuthContext, StoreContext } from "@/context";
import { PurchaseContext } from "@/context/admin/purchase";
import { useAuth } from "@/hooks/useAuth";
import {
  ProductDTO,
  RawMaterialDTO,
  SupplierDTO,
  NewPurchaseDetailDTO,
} from "@/types";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Tooltip } from "@heroui/react";
import { Select, SelectItem } from "@heroui/select";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

type Props = {
  handleOpenModal: (isOpen: boolean) => void;
  isOpen: boolean;
};

type PurchaseOrderFormInputs = {
  supplier: string;
  details: NewPurchaseDetailDTO[];
};

const newPurchaseDetailSchema = yup.object().shape({
  materialOrProductId: yup.string().required("Campo requerido"),
  amount: yup
    .number()
    .positive("Debe ser un número positivo")
    .required("Campo requerido"),
  unitPrice: yup.string().required("Campo requerido"),
});

const schema = yup.object().shape({
  supplier: yup.string().required("Campo requerido"),
  details: yup
    .array()
    .of(newPurchaseDetailSchema)
    .min(1, "Seleccione al menos un producto o material a comprar")
    .required("Campo requerido"),
});

export function PurchaseOrderModal({ handleOpenModal, isOpen }: Props) {
  const {
    purchaseOrder: { loading },
    rawMaterial: { rawMaterials },
    supplier: { suppliers },
    onCreatePurchaseOrder,
  } = React.useContext(PurchaseContext);

  const {
    product: { products },
  } = React.useContext(StoreContext);

  const { userId } = useAuth();

  const [selectedProduct, setSelectedProduct] = React.useState<
    ProductDTO | undefined
  >();
  const [selectedMaterial, setSelectedMaterial] = React.useState<
    RawMaterialDTO | undefined
  >();

  const [productAmount, setProductAmount] = React.useState(1);
  const [materialAmount, setMaterialAmount] = React.useState(1);

  const [selectedSupplier, setSelectedSupplier] = React.useState<
    SupplierDTO | undefined
  >();

  const {
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    setValues,
    isValid,
    resetForm,
    errors,
    touched,
  } = useFormik<PurchaseOrderFormInputs>({
    validateOnChange: true,
    isInitialValid: false,
    initialValues: {
      details: [],
      supplier: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: schema,
  });

  const onSubmit = async () => {
    onCreatePurchaseOrder(
      {
        details: values.details,
        supplierId: values.supplier,
        userId: userId!,
      },
      () => {
        handleOpenModal(false);
        resetForm();
      }
    );
  };

  const handleClose = () => {
    resetForm();
  };

  const handleSelectProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "") {
      setSelectedProduct(products.find((p) => p.id === e.target.value));
    } else {
      setSelectedProduct(undefined);
    }
  };

  const handleSelectMaterial = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "") {
      setSelectedMaterial(rawMaterials.find((p) => p.id === e.target.value));
    } else {
      setSelectedMaterial(undefined);
    }
  };

  const handleAddProduct = async () => {
    if (selectedProduct) {
      const actualItems = values.details;
      if (
        actualItems.find((i) => i.materialOrProductId === selectedProduct.id)
      ) {
        await setFieldValue("details", actualItems.map(i => {
          if(i.materialOrProductId === selectedProduct.id ){
            return {
              ...i,
              amount: i.amount + productAmount
            }
          }
          return i;
        }), true);
      } else {
        await setFieldValue("details", [
          ...(actualItems as any),
          {
            materialOrProductId: selectedProduct.id,
            unitPrice: selectedProduct.price,
            amount: productAmount,
            name: selectedProduct.name,
            measurementUnit: "CANTIDAD",
          },
        ] as NewPurchaseDetailDTO[], true);
      }

      setProductAmount(1);
    }
  };

  console.log("PRODUCTS IN MODAL ", products);

  const handleAddMaterial = async () => {
    if (selectedMaterial) {
      const actualItems = values.details;
      if (
        actualItems.find((i) => i.materialOrProductId === selectedMaterial.id)
      ) {
        await setFieldValue("details", actualItems.map(i => {
          if(i.materialOrProductId === selectedMaterial.id ){
            return {
              ...i,
              amount: i.amount + materialAmount
            }
          }
          return i;
        }), true);
      } else {
         await setFieldValue("details", [
          ...(actualItems as any),
          {
            materialOrProductId: selectedMaterial.id,
            unitPrice: selectedMaterial.unitPrice,
            amount: materialAmount,
            name: selectedMaterial.name,
            measurementUnit: selectedMaterial.measurementUnit,
          },
        ] as NewPurchaseDetailDTO[], true);
      }
      setMaterialAmount(1);
    }
  };

  const handleIncreaseProductAmount = () => {
    setProductAmount(productAmount + 1);
  };

  const handleDecreaseProductAmount = () => {
    if (productAmount == 1) {
      setProductAmount(1);
    } else {
      setProductAmount(productAmount - 1);
    }
  };

  const handleIncreaseMaterialAmount = () => {
    setMaterialAmount(materialAmount + 1);
  };

  const handleDecreaseMaterialAmount = () => {
    if (materialAmount == 1) {
      setMaterialAmount(1);
    } else {
      setMaterialAmount(materialAmount - 1);
    }
  };

  React.useEffect(() => {
    if (!selectedSupplier && values.supplier !== "") {
      setSelectedSupplier(suppliers.find((s) => s.id === values.supplier));
    } else {
      setFieldValue("details", []);
    }
  }, [values.supplier]);

  const handleRemoveItem = (itemId: string) =>  {
    setFieldValue("details", values.details.filter(d => d.materialOrProductId !== itemId ), true);
  }

  const stockStatus = (stock: number) => {
    if( stock === 0 ){
      return <p className="text-danger">Sin stock</p>
    }else {
      if( stock < 3 ){
        return <p className="text-warning">Bajo stock</p>
      }else {
        return <p className="text-success">Buen stock</p>
      }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleOpenModal}
      placement="center"
      size="2xl"
      onClose={handleClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Nueva Order de Compra
            </ModalHeader>
            <ModalBody>
              <Select
                isRequired
                items={suppliers}
                label="Proveedor"
                variant="bordered"
                onChange={handleChange("supplier")}
                onBlur={handleBlur("supplier")}
                value={values.supplier}
                isInvalid={!!errors.supplier && touched.supplier}
                errorMessage={touched.supplier && errors.supplier}
                description="Al seleccionar un proveedor, se mostraran los productos/materiales que este posee, si cambia de proveedor se perderan los cambios realizados previamente."
              >
                {(s) => <SelectItem key={s.id}>{s.name}</SelectItem>}
              </Select>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Detalle de Compra</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Select
                      size="sm"
                      items={products.filter(
                        (p) => p.supplier && p.supplier.id === values.supplier
                      )}
                      label="Producto"
                      onChange={handleSelectProduct}
                      variant="bordered"
                      isDisabled={values.supplier === ""}
                    >
                      {(s) => (
                        <SelectItem key={s.id}>
                          <div className="flex gap-1">
                            <p>{s.name + " - " + "CANTIDAD"}</p> - { stockStatus( s.stock ) }
                          </div>
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
                      isDisabled={selectedProduct === undefined}
                    >
                      Agregar
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Select
                      size="sm"
                      items={rawMaterials.filter(
                        (r) => r.supplierId === values.supplier
                      )}
                      label="Materiales"
                      onChange={handleSelectMaterial}
                      variant="bordered"
                      isDisabled={values.supplier === ""}
                    >
                      {(s) => (
                        <SelectItem key={s.id}>
                         {/* <div className="flex gap-1">
                          <p>{s.name + " - " + s.measurementUnit}</p> - { stockStatus( s.stock ) }
                         </div> */}
                         {s.name}
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
                      isDisabled={!selectedMaterial}
                    >
                      Agregar
                    </Button>
                  </div>
                </div>
                <div className="flex p-3 flex-col gap-2 w-full text-xs bg-default-100 shadow-md rounded-xl min-h-[200px]">
                  <div className="flex font-semibold text-default-500 bg-default-200/75 rounded-lg items-center py-3">
                    <div className="min-w-[150px] px-3">Nombre</div>
                    <div className="min-w-[90px] px-3">Precio Unitario</div>
                    <div className="min-w-[100px] px-3">Unidad de Medida</div>
                    <div className="min-w-[80px] px-3">Cantidad</div>
                    <div className="min-w-[90px] px-3">Total</div>
                    <div className="min-w-[80px] px-3">Acciones</div>
                  </div>
                  {
                    values.details.length === 0
                    ? <div className="text-[#91929a] w-full mt-[40px] text-[15px] flex justify-center">
                      Agregue productos/materiales
                    </div>
                    : values.details.map(i => (
                      <div className="flex items-center" key={i.materialOrProductId}>
                        <div className="min-w-[150px] max-w-[150px] px-3">{ i.name }</div>
                        <div className="min-w-[90px] max-w-[90px] px-3 text-center">S/. { i.unitPrice }</div>
                        <div className="min-w-[100px] max-w-[100px] px-3 text-center">{ i.measurementUnit }</div>
                        <div className="min-w-[80px] max-w-[80px] px-3 text-center">{ i.amount }</div>
                        <div className="min-w-[90px] max-w-[90px] px-3">{ "S/. " + (i.amount * parseFloat(i.unitPrice)).toFixed(2)}</div>
                        <div className="min-w-[80px] max-w-[80px] px-3 text-center">
                          <Tooltip color="danger" content="Remove" size="sm">
                            <span
                              className="text-lg text-danger cursor-pointer active:opacity-50"
                              onClick={ () => handleRemoveItem(i.materialOrProductId) }
                            >
                              <i className="fa-solid fa-trash"></i>
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                    ))
                  }
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
                className=" text-white"
                onPress={onSubmit}
                isDisabled={!isValid}
                isLoading={loading}
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
