import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
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
import { StoreContext } from "@/context";
import { CreateSubCategoryModal, UpdateSubCategoryModal } from "@/types/admin/subcategory";
import { InputImage } from "../commons/InputImage";

type Props = {
  handleOpenModal: (isOpen: boolean) => void;
  isOpen: boolean;
};

type CategoryFormInputs = {
  name: string;
  description: string;
  category: string;
  file: any;
};

const schema = yup.object().shape({
  name: yup.string().required("Campo requerido"),
  description: yup.string().required("Campo requerido"),
  category: yup.string().required("Campo requerido"),
  file: yup.mixed().required("Campo requerido"),
});

export function SubCategoryModal({ handleOpenModal, isOpen }: Props) {

  const {
    category: { categories },
    subcategory: { selected, loading },
    onCreateOrEditSubCategory,
    onSelectSubCategory
  } = React.useContext(StoreContext);

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  React.useEffect(() => {
    if(!isOpen){
      onSelectSubCategory( null );
    }
  }, [isOpen]);

  const { handleChange, handleBlur, touched, values, setFieldValue, isValid, resetForm, errors } =
    useFormik<CategoryFormInputs>({
      validateOnChange: true,
      isInitialValid: false,
      initialValues: {
        name: selected ? selected.name : "",
        description: selected ? selected.description : "",
        category: selected ? selected.category.id : "",
        file: selected ? "null" : null
      },
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
      validationSchema: schema,
    });

  React.useEffect(() => {
    resetForm({
      values: {
        name: selected ? selected?.name : "",
        description: selected ? selected?.description : "",
        category: selected ? selected.category.id : "",
        file: selected ? "null" : null,
      },
    });
  }, [selected]);

  React.useEffect(() => {
    setIsEditing(selected !== null ? true : false);
  }, [values]);

  const onSubmit = async () => {
    if (selected) {
      onCreateOrEditSubCategory(
        "Edit",
        {
          id: selected.id,
          newName: values.name,
          newDescription: values.description,
          newCategoryId: values.category,
          file: values.file,
        } as UpdateSubCategoryModal,
        () => {
          handleOpenModal(false);
          resetForm();
        }
      );
    } else {
      onCreateOrEditSubCategory(
        "Create",
        {
          name: values.name,
          description: values.description,
          category_id: values.category,
          file: values.file,
        } as CreateSubCategoryModal,
        () => {
          handleOpenModal(false);
          resetForm();
        }
      );
    }
  };

  const handleClose = () => {
    resetForm();
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenModal} placement="center" onClose={handleClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Crear Sub Categorias
            </ModalHeader>
            <ModalBody>
              <Input
                isRequired
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                label="Nombre"
                isInvalid={!!errors.name && touched.name }
                errorMessage={ touched.name && errors.name}
                variant="bordered"
              />
              <Textarea
                isRequired
                onChange={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                label="Descripcion"
                isInvalid={!!errors.description && touched.description}
                errorMessage={touched.description && errors.description}
                minRows={1}
                isMultiline
                placeholder="Describe la Sub Categoria..."
                variant="bordered"
              />
              <Select
                isRequired
                items={categories}
                label="Categoria"
                variant="bordered"
                onChange={handleChange("category")}
                onBlur={handleBlur("category")}
                value={values.category}
                isInvalid={!!errors.category && touched.category}
                errorMessage={touched.category && errors.category}
                defaultSelectedKeys={ selected && [selected.category] as any}
              >
                {(category) => (
                  <SelectItem key={category.id}>{category.name}</SelectItem>
                )}
              </Select>
              <InputImage
                accept=".jpg,.png,.webp"
                label="Imagen"
                multiple={false}
                onBlur={ handleBlur("file") }
                onChange={(event: any) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
                isInvalid={!!errors.file && touched.file}
                errorMessage={ touched.file && errors.file + ""}
              />
              {selected && (
                <Image
                  alt="asd"
                  src={selected.url_image}
                  width={100}
                  height={100}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={() => { resetForm(); onClose();}}>
                Cerrar
              </Button>
              <Button color="primary" className="text-white" onPress={onSubmit} isDisabled={!isValid} isLoading={ loading }>
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
