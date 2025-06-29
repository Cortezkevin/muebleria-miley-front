import {
  MeasurementUnit,
  UpdateRawMaterialDTO,
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
import { PurchaseContext } from "@/context/admin/purchase";
import { Chip } from "@heroui/react";

type Props = {
  handleOpenModal: (isOpen: boolean) => void;
  isOpen: boolean;
};

type RawMaterialFormInputs = {
  name: string;
  description: string;
  supplier: string;
  unitPrice: string;
  measurementUnit: MeasurementUnit;
};

const schema = yup.object().shape({
  name: yup.string().required("Campo requerido"),
  description: yup.string().required("Campo requerido"),
  supplier: yup.string().required("Campo requerido"),
  unitPrice: yup.string().required("Campo requerido"),
  measurementUnit: yup.string().required("Campo requerido"),
});

const unitArray = [
  {
    id: "PESO",
    value: "PESO",
  },
  {
    id: "VOLUMEN",
    value: "VOLUMEN",
  },
  {
    id: "CANTIDAD",
    value: "CANTIDAD",
  },
  {
    id: "LONGITUD",
    value: "LONGITUD",
  },
];

export function RawMaterialModal({ handleOpenModal, isOpen }: Props) {
  const {
    supplier: { suppliers },
    rawMaterial: { selected, loading },
    onCreateOrEditRawMaterial,
    onSelectRawMaterial,
  } = React.useContext(PurchaseContext);

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isOpen) {
      onSelectRawMaterial(null);
    }
  }, [isOpen]);

  const {
    handleChange,
    handleBlur,
    touched,
    values,
    setFieldValue,
    isValid,
    resetForm,
    errors,
  } = useFormik<RawMaterialFormInputs>({
    validateOnChange: true,
    isInitialValid: false,
    initialValues: {
      name: "",
      description: "",
      supplier: "",
      unitPrice: "",
      measurementUnit: "CANTIDAD",
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
          measurementUnit: selected.measurementUnit,
          unitPrice: selected.unitPrice,
          supplier: selected.supplierId,
        },
      });
    }
  }, [selected]);

  React.useEffect(() => {
    setIsEditing(selected !== null ? true : false);
  }, [values]);

  const onSubmit = async () => {
    if (selected) {
      onCreateOrEditRawMaterial(
        "Edit",
        selected.id,
        {
          id: selected.id,
          description: values.description,
          measurementUnit: values.measurementUnit,
          name: values.name,
          unitPrice: values.unitPrice,
          supplierId: values.supplier,
        } as UpdateRawMaterialDTO,
        () => {
          handleOpenModal(false);
          resetForm();
        }
      );
    } else {
      onCreateOrEditRawMaterial(
        "Create",
        null,
        {
          description: values.description,
          measurementUnit: values.measurementUnit,
          name: values.name,
          unitPrice: values.unitPrice,
          supplierId: values.supplier,
        } as UpdateRawMaterialDTO,
        () => {
          handleOpenModal(false);
          resetForm();
        }
      );
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
              Crear Materia Prima
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
                variant="bordered"
              />
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
                defaultSelectedKeys={selected && ([selected.supplierId] as any)}
              >
                {(s) => <SelectItem key={s.id}>{s.name}</SelectItem>}
              </Select>
              <Select
                label="Unidad de Medida"
                items={unitArray}
                onChange={handleChange("measurementUnit")}
                onBlur={handleBlur("measurementUnit")}
                value={values.measurementUnit}
                isInvalid={!!errors.measurementUnit && touched.measurementUnit}
                errorMessage={touched.measurementUnit && errors.measurementUnit}
                defaultSelectedKeys={
                  selected && ([selected.measurementUnit] as any)
                }
                variant="bordered"
              >
                {(unit) => (
                  <SelectItem key={unit.id} textValue={unit.value}>
                    <Chip
                      variant="flat"
                      color={
                        unit.id === "PESO"
                          ? "warning"
                          : unit.id === "VOLUMEN"
                          ? "danger"
                          : unit.id === "LONGITUD"
                          ? "secondary"
                          : "success"
                      }
                    >
                      {unit.value}
                    </Chip>
                  </SelectItem>
                )}
              </Select>
              <Input
                isRequired
                onChange={handleChange("unitPrice")}
                onBlur={handleBlur("unitPrice")}
                value={values.unitPrice}
                label="Precio unitario"
                isInvalid={!!errors.unitPrice && touched.unitPrice}
                errorMessage={touched.unitPrice && errors.unitPrice}
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
                className="text-white"
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
