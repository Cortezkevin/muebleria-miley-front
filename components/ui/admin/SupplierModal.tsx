import { PurchaseContext } from "@/context/admin/purchase";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

type Props = {
  handleOpenModal: (isOpen: boolean) => void;
  isOpen: boolean;
};

type SupplierFormInputs = {
  name: string;
  ruc: string;
  phone: string;
  address: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Campo requerido"),
  ruc: yup
    .string()
    .matches(/^2\d{10}$/, "Ingrese un ruc valido")
    .required("Campo requerido"),
  phone: yup
    .string()
    .matches(/^9\d{8}$/, "Ingrese un numero valido")
    .required("Campo requerido"),
  address: yup.mixed().required("Campo requerido"),
});

export function SupplierModal({ handleOpenModal, isOpen }: Props) {
  const {
    supplier: { selected, loading },
    onCreateOrEditSupplier,
    onSelectSupplier,
  } = React.useContext(PurchaseContext);

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isOpen) {
      onSelectSupplier(null);
    }
  }, [isOpen]);

  const {
    handleChange,
    handleBlur,
    values,
    isValid,
    resetForm,
    errors,
    touched,
  } = useFormik<SupplierFormInputs>({
    validateOnChange: true,
    validateOnMount: false,
    initialValues: {
      name: "",
      address: "",
      phone: "",
      ruc: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: schema,
  });

  React.useEffect(() => {
    if( selected ){
      resetForm({
        values: { ...selected },
      });
    }
  }, [selected]);

  React.useEffect(() => {
    setIsEditing(selected !== undefined ? true : false);
  }, [values]);

  const onSubmit = async () => {
    if( selected ){
      onCreateOrEditSupplier("Edit", selected.id, values, () => {
        resetForm();
        handleOpenModal(false);
      });
    }else {
      onCreateOrEditSupplier("Create", null, values, () => {
        resetForm();
        handleOpenModal(false);
      });
    }
  };

  const handleClose = () => {
    resetForm();
  };

  return (
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
              {selected ? "Editar Proveedor" : "Crear Proveedor"}
            </ModalHeader>
            <ModalBody>
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
              <Input
                isRequired
                onChange={handleChange("ruc")}
                onBlur={handleBlur("ruc")}
                value={values.ruc}
                minLength={11}
                maxLength={11}
                label="RUC"
                isInvalid={!!errors.ruc && touched.ruc}
                errorMessage={touched.ruc && errors.ruc}
                variant="bordered"
              />
              <Input
                isRequired
                onChange={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                minLength={9}
                maxLength={9}
                label="Telefono"
                isInvalid={!!errors.phone && touched.phone}
                errorMessage={touched.phone && errors.phone}
                variant="bordered"
              />
              <Input
                isRequired
                onChange={handleChange("address")}
                onBlur={handleBlur("address")}
                value={values.address}
                label="Direccion"
                isInvalid={!!errors.address && touched.address}
                errorMessage={touched.address && errors.address}
                variant="bordered"
              />
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
