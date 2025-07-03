import { PurchaseContext } from "@/context/admin/purchase";
import { WarehouseContext } from "@/context/admin/warehouse";
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

type WarehouseFormInputs = {
  location: string;
};

const schema = yup.object().shape({
  location: yup.string().required("Campo requerido")
});

export function WarehouseModal({ handleOpenModal, isOpen }: Props) {
  const {
    warehouse: { selected, loading },
    onCreateOrEditWarehouse,
    onSelectWarehouse,
  } = React.useContext(WarehouseContext);

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isOpen) {
      onSelectWarehouse(null);
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
  } = useFormik<WarehouseFormInputs>({
    validateOnChange: true,
    isInitialValid: false,
    initialValues: {
      location: ""
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
      onCreateOrEditWarehouse("Edit", selected.id, { location: values.location, id: selected.id }, () => {
        resetForm();
        handleOpenModal(false);
      });
    }else {
      onCreateOrEditWarehouse("Create", null, values.location , () => {
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
              {selected ? "Editar Almacen" : "Crear Almacen"}
            </ModalHeader>
            <ModalBody>
              <Input
                isRequired
                onChange={handleChange("location")}
                onBlur={handleBlur("location")}
                value={values.location}
                label="Ubicacion"
                isInvalid={!!errors.location && touched.location}
                errorMessage={touched.location && errors.location}
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
