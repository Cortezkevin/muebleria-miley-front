import {
  //IRawMaterial,
  CreateProductDTO,
  //ProductMaterial,
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
import React, { ChangeEvent } from "react";
import * as yup from "yup";
import { StoreContext } from "@/context";
//import { PurchaseContext } from "@/context/admin/purchase";
import { Tooltip } from "@heroui/tooltip";
import { CreateProductModal } from "@/types/admin/product";
import { InputImage } from "../commons/InputImage";

type Props = {
  handleOpenModal: (isOpen: boolean) => void;
  isOpen: boolean;
};

type ProductFormInputs = {
  name: string;
  description: string;
  subCategory: string;
  //supplier?: string;
  price: string;
  stock: number;
  files: File[];
/*   materials: ProductMaterial[]; */
};

const schema = yup.object().shape({
  name: yup.string().required("Campo requerido"),
  description: yup.string().required("Campo requerido"),
  subCategory: yup.string().required("Campo requerido"),
  /* supplier: yup.string(), */
  price: yup.number().required("Campo requerido"),
  stock: yup.number().required("Campo requerido"),
  files: yup.mixed().required("Campo requerido"),
});

export function ProductModal({ handleOpenModal, isOpen }: Props) {
  const {
    subcategory: { subcategories },
    product: { selected, loading },
    onCreateOrEditProduct,
    onSelectProduct,
  } = React.useContext(StoreContext);

  /*const {
    supplier: { suppliers },
    rawMaterial: { rawMaterials },
  } = React.useContext(PurchaseContext);*/

  React.useEffect(() => {
    if (!isOpen) {
      onSelectProduct(null);
    }
  }, [isOpen]);

  /* const [materialAmount, setMaterialAmount] = React.useState(1);
  const [selectedMaterial, setSelectedMaterial] = React.useState<
    IRawMaterial | undefined
  >(); */
  const [disableButton, setDisableButton] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [files, setFiles] = React.useState<File[]>([]);

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
      name: "",
      description: "",
      subCategory: "",
      //supplier: undefined,
      price: "",
      stock: 0,
     /*  materials: [], */
      files: [],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: schema,
  });

  React.useEffect(() => {
    if (selected) {
      resetForm({
        values: {
          name: selected.name,
          description: selected.description,
          subCategory: selected.subcategory.id,
          //supplier: selected.supplierId,
          price: selected.price,
          stock: selected.stock,
          /* materials: selected.materials || [], */
          files: [],
        },
      });
    }else {
      resetForm({
        values: {
          name: "",
          description: "",
          subCategory: "",
          //supplier: undefined,
          price: "",
          stock: 0,
          /* materials: [], */
          files: [],
        }
      });
    }
  }, [selected]);

  React.useEffect(() => {
    setIsEditing(selected !== null ? true : false);
  }, [values]);

  const onSubmit = async () => {
    if (selected) {
      /*onCreateOrEditProduct(
        "Edit",
        {
          id: selected.id,
          newName: values.name,
          newSubCategoryId: values.subCategory,
          //newSupplierId: values.supplier,
          newDescription: values.description,
          newPrice: values.price,
          newStock: values.stock,
          files: values.files,
         /*  materials: values.materials */
/*} as UpdateProductModal,
        () => {
          resetForm();
          handleOpenModal(false);
          onSelectProduct( null );
        }
      );*/
    } else {
      onCreateOrEditProduct(
        "Create",
        {
          name: values.name,
          subcategory_id: values.subCategory,
          //supplierId: values.supplier,
          description: values.description,
          price: values.price,
          stock: values.stock,
          files: values.files,
          /* materials: values.materials */
        } as CreateProductModal,
        () => {
          resetForm();
          handleOpenModal(false);
          onSelectProduct( null );
        }
      );
    }
  };

  const handleClose = () => {
    resetForm();
  };

  /* const handleSelectMaterial = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "") {
      setSelectedMaterial(rawMaterials.find((p) => p.id === e.target.value));
    } else {
      setSelectedMaterial(undefined);
    }
  };

  const handleAddMaterial = async () => {
    if (selectedMaterial) {
      const actualItems = values.materials;
      if (actualItems.find((i) => i.materialId === selectedMaterial.id)) {
        await setFieldValue(
          "materials",
          actualItems.map((i) => {
            if (i.materialId === selectedMaterial.id) {
              return {
                ...i,
                amount: i.amount + materialAmount,
              };
            }
            return i;
          }),
          true
        );
      } else {
        await setFieldValue(
          "materials",
          [
            ...(actualItems as any),
            {
              materialId: selectedMaterial.id,
              amount: materialAmount,
              name: selectedMaterial.name,
              measurementUnit: selectedMaterial.measurementUnit,
            },
          ] as ProductMaterial[],
          true
        );
      }
      setMaterialAmount(1);
    }
  }; */

  /* const handleIncreaseMaterialAmount = () => {
    setMaterialAmount(materialAmount + 1);
  };

  const handleDecreaseMaterialAmount = () => {
    if (materialAmount == 1) {
      setMaterialAmount(1);
    } else {
      setMaterialAmount(materialAmount - 1);
    }
  }; */

  /* const handleRemoveItem = (itemId: string) => {
    setFieldValue(
      "materials",
      values.materials.filter((d) => d.materialId !== itemId),
      true
    );
  }; */

  /* const getColumns = () => {
    return [
      {
        id: "name",
        text: "Nombre",
        selector: (i: ProductMaterial) => (
          <div key={i.name + i.materialId}>{i.name}</div>
        ),
      },
      {
        id: "measurementUnit",
        text: "Unidad de Medida",
        selector: (i: ProductMaterial) => (
          <div key={i.measurementUnit + i.materialId}>{i.measurementUnit}</div>
        ),
      },
      {
        id: "amount",
        text: "Cantidad",
        selector: (i: ProductMaterial) => (
          <div key={i.amount + i.materialId}>{i.amount}</div>
        ),
      },
      {
        id: "actions",
        text: "Acciones",
        selector: (i: ProductMaterial) => (
          <Tooltip color="danger" content="Remove" size="sm">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => handleRemoveItem(i.materialId)}
            >
              <i className="fa-solid fa-trash"></i>
            </span>
          </Tooltip>
        ),
      },
    ];
  }; */

  return (
    <Modal
/*       size={values.supplier ? undefined : "4xl"} */
      isOpen={isOpen}
      onOpenChange={handleOpenModal}
      placement="center"
      onClose={handleClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Crear Productos
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-5 gap-4">
                <div
                  className={`flex flex-col gap-2 col-span-5`}
                >
                  <Input
                    isRequired
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    label="Nombre"
                    isInvalid={!!errors.name && touched.name}
                    errorMessage={touched.name && errors.name}
                    variant="bordered"
                  />
                  <Textarea
                    isRequired
                    onChange={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                    label="Descripcion"
                    minRows={1}
                    isMultiline
                    placeholder="Describe el Producto..."
                    isInvalid={!!errors.description && touched.description}
                    errorMessage={touched.description && errors.description}
                    variant="bordered"
                  />
                  {/* <Select
                    items={suppliers}
                    label="Proveedor"
                    variant="bordered"
                    onChange={handleChange("supplier")}
                    onBlur={handleBlur("supplier")}
                    value={values.supplier}
                    isInvalid={!!errors.supplier && touched.supplier}
                    errorMessage={touched.supplier && errors.supplier}
                    defaultSelectedKeys={
                      selected &&
                      ([
                        selected.supplierId ? selected.supplierId : undefined,
                      ] as any)
                    }
                    description="Seleecionar si es un producto externo"
                  >
                    {(supplier) => (
                      <SelectItem value={supplier.id} key={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    )}
                  </Select> */}
                  <Select
                    isRequired
                    items={subcategories}
                    label="Sub Categoria"
                    variant="bordered"
                    onChange={handleChange("subCategory")}
                    onBlur={handleBlur("subCategory")}
                    value={values.subCategory}
                    isInvalid={!!errors.subCategory && touched.subCategory}
                    errorMessage={touched.subCategory && errors.subCategory}
                    defaultSelectedKeys={
                      selected && ([selected.subcategory.id] as any)
                    }
                  >
                    {(subcategory) => (
                      <SelectItem /* value={subcategory.id} */ key={subcategory.id}>
                        {subcategory.name}
                      </SelectItem>
                    )}
                  </Select>
                  <Input
                    isRequired
                    onChange={handleChange("price")}
                    onBlur={handleBlur("price")}
                    value={values.price}
                    label="Precio"
                    isInvalid={!!errors.price && touched.price}
                    errorMessage={touched.price && errors.price}
                    variant="bordered"
                  />
                  {/* <Input
                    isRequired
                    onChange={handleChange("stock")}
                    onBlur={handleBlur("stock")}
                    type="number"
                    value={values.stock === 0 ? undefined : values.stock + ""}
                    label="Stock"
                    isInvalid={!!errors.stock && touched.stock}
                    errorMessage={touched.stock && errors.stock}
                    variant="bordered"
                  /> */}
                  <InputImage
                    label="Imagenes"
                    multiple={true}
                    accept=".jpg,.png,.webp"
                    onBlur={handleBlur("file")}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const fileList = event.currentTarget.files;
                      if (fileList) {
                        let filesToSave: File[] = [];
                        for (let i = 0; i < fileList.length; i++) {
                          filesToSave.push(fileList[i]);
                        }
                        setFieldValue("files", filesToSave);
                        setFiles(filesToSave);
                      }
                    }}
                    isInvalid={!!errors.files && touched.files}
                    errorMessage={touched.files && errors.files + ""}
                  />
                </div>
                {/* {!values.supplier && (
                  <div className="flex flex-col gap-3 col-span-3">
                    <h3 className="font-semibold">Materiales Necesarios</h3>
                    <div className="flex gap-1 items-center">
                      <Select
                        items={rawMaterials}
                        label="Materiales"
                        variant="bordered"
                        size="sm"
                        onChange={handleSelectMaterial}
                      >
                        {(material) => (
                          <SelectItem value={material.id} key={material.id}>
                            {material.name}
                          </SelectItem>
                        )}
                      </Select>
                      <div className="flex items-center">
                        <div className="border-y-[2px] border-l-[2px] min-w-10 h-12 border-[#e4e5e6] rounded-l-lg shadow-sm flex items-center justify-center max-h-full text-lg font-semibold text-center select-none">
                          {materialAmount}
                        </div>
                        <div className="flex flex-col">
                          <div
                            onClick={handleIncreaseMaterialAmount}
                            className="transition-all duration-200 border-x-[2px] border-t-[2px] border-b-[1px] border-[#e4e5e6] w-6 h-6 flex items-center justify-center text-slate-600 text-sm p-1 cursor-pointer hover:border-[#a0a1ab]"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </div>
                          <div
                            onClick={handleDecreaseMaterialAmount}
                            className="transition-all duration-200 border-x-[2px] border-t-[2px] border-b-[1px] border-[#e4e5e6] w-6 h-6 flex items-center justify-center text-slate-600 text-sm p-1 cursor-pointer hover:border-[#a0a1ab]"
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
                    <small className="text-gray-400 -mt-2 w-full px-2 text-xs">
                      Al seleccionar un proveedor el producto se reconoce como
                      externo y no se debera seleccionar materiales
                    </small>
                    <Table
                      columns={getColumns()}
                      data={values.materials}
                      emptyMessage={"No se seleccionaron materiales"}
                    />
                  </div>
                )} */}
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
                isDisabled={
                 !isValid
                }
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
