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
import { useFormik, Field, FormikProvider } from "formik";
import React, { ChangeEvent } from "react";
import * as yup from "yup";
import { StoreContext } from "@/context";
//import { PurchaseContext } from "@/context/admin/purchase";
import { Tooltip } from "@heroui/tooltip";
import { CreateProductModal } from "@/types/admin/product";
import { InputImage } from "../commons/InputImage";
import { Radio, RadioGroup } from "@heroui/radio";
import { DefaultImagesSelector } from "./product/DefaultImagesSelector";
import { ColorImagesSelector } from "./product/ColorImagesSelector";

type Props = {
  handleOpenModal: (isOpen: boolean) => void;
  isOpen: boolean;
};

type ProductFormInputs = {
  name: string;
  description: string;
  subcategory: string;
  price: string;
  stock: number;
  defaultImages: File[];
  colorImages: { color: string, images: File[]}[];
};

const schema = yup.object().shape({
  name: yup.string().required("Campo requerido"),
  description: yup.string().required("Campo requerido"),
  subcategory: yup.string().required("Campo requerido"),
  price: yup.number().required("Campo requerido"),
  stock: yup.number().required("Campo requerido"),
  defaultImages: yup.mixed(),
  colorImages: yup.array().of(
    yup.object().shape({
      color: yup.string().required("Color requerido"),
      images: yup
        .array()
        .min(1, "Debe subir al menos una imagen")
        .required("Debe subir al menos una imagen"),
    })
  ),
}).test(
  'at-least-one-images-source',
  'Debes subir imágenes por defecto o por color',
  function (value) {
    const { defaultImages, colorImages } = value || {};
    const hasDefault = defaultImages && defaultImages.length > 0;
    const hasColor =
      Array.isArray(colorImages) &&
      colorImages.length > 0 &&
      colorImages.some(
        (ci) => ci.color?.trim() && Array.isArray(ci.images) && ci.images.length > 0
      );

    return hasDefault || hasColor;
  }
);

export function ProductModal({ handleOpenModal, isOpen }: Props) {
  const {
    subcategory: { subcategories },
    product: { selected, loading },
    onCreateOrEditProduct,
    onSelectProduct,
  } = React.useContext(StoreContext);

  React.useEffect(() => {
    if (!isOpen) {
      onSelectProduct(null);
    }
  }, [isOpen]);

  const [imagesType, setImagesType] = React.useState<'defaultImages' | 'colorImages'>("defaultImages");
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const formik = useFormik<ProductFormInputs>({
    validateOnChange: true,
    validateOnBlur: false,
    isInitialValid: false,
    initialValues: {
      name: "",
      description: "",
      subcategory: "",
      price: "",
      stock: 0,
      defaultImages: [],
      colorImages: []
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: schema,
  });

  console.log("VALUES", formik.values);

  React.useEffect(() => {
    formik.resetForm({
      values: {
        name: selected ? selected.name : "",
        description: selected ? selected.description : "",
        subcategory: selected ? selected.subcategory.id : "",
        price: selected ? selected.price : "",
        stock: selected ? selected.stock : 0,
        defaultImages: [],
        colorImages: []
      },
    });
  }, [selected]);

  React.useEffect(() => {
    setIsEditing(selected !== null ? true : false);
  }, [formik.values]);

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
          name: formik.values.name,
          subcategory_id: formik.values.subcategory,
          description: formik.values.description,
          price: formik.values.price,
          stock: formik.values.stock,
          files: formik.values.colorImages.length > 0
            ? formik.values.colorImages.reduce((acc: File[], item) => acc.concat(item.images), [])
            : formik.values.defaultImages,
          features: [],
          colorImages: formik.values.colorImages.map(ci => ({color: ci.color, fileNames: ci.images.map(f => f.name)}))
        } as CreateProductModal,
        () => {
          formik.resetForm();
          handleOpenModal(false);
          onSelectProduct( null );
        }
      );
    }
  };

  const handleClose = () => {
    console.log("closemmodal")
    formik.resetForm();
  };

  return (
    <FormikProvider value={formik}>
    <Modal
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
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                    value={formik.values.name}
                    label="Nombre"
                    isInvalid={!!formik.errors.name && formik.touched.name}
                    errorMessage={formik.touched.name && formik.errors.name}
                    variant="bordered"
                  />
                  <Textarea
                    isRequired
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    value={formik.values.description}
                    label="Descripcion"
                    minRows={1}
                    isMultiline
                    placeholder="Describe el Producto..."
                    isInvalid={!!formik.errors.description && formik.touched.description}
                    errorMessage={formik.touched.description && formik.errors.description}
                    variant="bordered"
                  />
                  <div className="flex gap-2">
                    <Select
                      isRequired
                      items={subcategories}
                      label="Sub Categoria"
                      variant="bordered"
                      onChange={formik.handleChange("subcategory")}
                      onBlur={formik.handleBlur("subcategory")}
                      value={formik.values.subcategory}
                      isInvalid={!!formik.errors.subcategory && formik.touched.subcategory}
                      errorMessage={formik.touched.subcategory && formik.errors.subcategory}
                      defaultSelectedKeys={
                        selected && ([selected.subcategory.id] as any)
                      }
                    >
                      {(subcategory) => (
                        <SelectItem key={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      )}
                    </Select>
                    <Input
                      isRequired
                      className="w-[140px]"
                      onChange={formik.handleChange("price")}
                      onBlur={formik.handleBlur("price")}
                      value={formik.values.price}
                      label="Precio"
                      isInvalid={!!formik.errors.price && formik.touched.price}
                      errorMessage={formik.touched.price && formik.errors.price}
                      variant="bordered"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <RadioGroup size="sm" label="Selecciona el modo de imagenes" value={imagesType} onValueChange={v => {
                    setImagesType(v as any);
                    formik.setFieldValue("defaultImages",[]);
                    formik.setFieldValue("colorImages",[]);
                    }}>
                      <Radio value="defaultImages">Imagenes por Defecto</Radio>
                      <Radio value="colorImages">Imagenes por Color</Radio>
                    </RadioGroup>
                    {
                      imagesType === 'defaultImages'
                      ? <DefaultImagesSelector name="defaultImages" />
                      : <ColorImagesSelector name="colorImages" />
                    }
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  formik.resetForm();
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
                 !formik.isValid /* && (formik.values.defaultImages.length > 0 || formik.values.colorImages.length > 0) */
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
    </FormikProvider>
  );
}
