import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import { StoreContext } from "@/context/admin";
import { InputImage } from "../commons/InputImage";

type Props = {
  handleOpenModal: (isOpen: boolean) => void;
  isOpen: boolean
};

type CategoryFormInputs = {
  name: string;
  description: string;
  file: any;
};

const schema = yup.object().shape({
  name: yup.string().required("Campo requerido"),
  description: yup.string().required("Campo requerido"),
  file: yup.mixed().required("Campo requerido"),
});

export function CategoryModal({ handleOpenModal, isOpen }: Props) {

  const { category: { selected, loading }, onCreateOrEditCategory, onSelectCategory } =  React.useContext( StoreContext );

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  useEffect(() => {
    if(!isOpen){
      onSelectCategory( null );
    }
  }, [isOpen]);

  const { handleChange, handleBlur, values, setFieldValue, isValid, resetForm, errors, touched } =
    useFormik<CategoryFormInputs>({
      validateOnChange: true,
      isInitialValid: false,
      initialValues: {
        name: selected ? selected.name : "",
        description: selected ? selected.description : "",
        file: selected ? "null" : null,
      },
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
      validationSchema: schema,
    });

  React.useEffect(() => {
    resetForm({
    values: { 
        name: selected ? selected.name : "", 
        description: selected ? selected.description : "",
        file: selected ? "null" : null 
    },
    });
  }, [selected]);

  React.useEffect(() => {
    setIsEditing(selected !== undefined ? true : false);
  }, [values]);

  const onSubmit = async () => {
    if( selected ){
      onCreateOrEditCategory("Edit", selected.id, {
        name: values.name,
        description: values.description,
        file: values.file
      }, () => {
        resetForm();
        handleOpenModal(false);
      });
    }else {
      onCreateOrEditCategory("Create", null, {
        name: values.name,
        description: values.description,
        file: values.file
      }, () => {
        resetForm();
        handleOpenModal(false);
      });
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
              { selected ? "Editar Categoria" : "Crear Categoria" }
            </ModalHeader>
            <ModalBody>
              <Input
                isRequired
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                label="Nombre"
                placeholder="Ingresa el nombre de la categoria"
                isInvalid={!!errors.name && touched.name }
                errorMessage={ touched.name && errors.name}
                variant="bordered"
              />
              <Input
                isRequired
                onChange={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                label="Descripcion"
                placeholder="Ingresa la descripcion de la categoria"
                isInvalid={!!errors.description && touched.description }
                errorMessage={ touched.description && errors.description}
                variant="bordered"
              />
              {selected && (
                <div>
                  <span>Imagen</span>
                  <Image
                    alt="asd"
                    src={selected.url_image}
                    width={100}
                    height={100}
                  />
                </div>
              )}
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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={() => {
                resetForm();
                onClose();
              }}>
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
