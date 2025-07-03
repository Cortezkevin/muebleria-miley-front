import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
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
import { CarrierStatus } from "@/types";
import { EmployeeContext, StoreContext } from "@/context/admin";

type Props = {
  handleOpenModal: (isOpen: boolean) => void;
  isOpen: boolean;
};

type CarrierFormInputs = {
  userId: string;
  plateCode: string;
  status: CarrierStatus
};

const schema = yup.object().shape({
  plateCode: yup.string().required("Campo requerido"),
  userId: yup.string().required("Campo requerido"),
  status: yup.string().required("Campo requerido")
});

const statusArray = [
  {
    id: "DISPONIBLE",
    value: "DISPONIBLE"
  },
  {
    id: "EN_DESCANSO",
    value: "EN_DESCANSO"
  },
  {
    id: "FUERA_DE_SERVICIO",
    value: "FUERA_DE_SERVICIO"
  }
]

export function CarrierModal({ handleOpenModal, isOpen }: Props) {

  const {
    carrier: { selected, loading },
    onCreateCarrier,
    onSelectCarrier
  } = React.useContext(EmployeeContext);

  const {
    user: { users }
  } = React.useContext(StoreContext);

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  React.useEffect(() => {
    if(!isOpen){
      onSelectCarrier( null );
    }
  }, [isOpen]);

  const { handleChange, handleBlur, touched, values, setFieldValue, isValid, resetForm, errors } =
    useFormik<CarrierFormInputs>({
      validateOnChange: true,
      isInitialValid: false,
      initialValues: {
        plateCode: "",
        userId: "",
        status: "DISPONIBLE"
      },
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
      validationSchema: schema,
    });

  React.useEffect(() => {
    resetForm({
      values: {
        plateCode: selected ? selected.plateCode : "",
        userId: selected ? selected.userId : "",
        status: selected ? selected.status : "DISPONIBLE"
      },
    });
  }, [selected]);

  React.useEffect(() => {
    setIsEditing(selected !== null ? true : false);
  }, [values]);

  const onSubmit = async () => {
    /* if (selected) {
      onCreateOrEditSubCategory(
        "Edit",
        {
          id: selected.id,
          newName: values.name,
          newDescription: values.description,
          newCategoryId: values.category,
          file: values.file,
        } as UpdateSubCategory,
        () => {
          handleOpenModal(false);
          resetForm();
        }
      );
    } else { */
      onCreateCarrier(
        {
          plateCode: values.plateCode,
          userId: values.userId,
          status: values.status
        },
        () => {
          handleOpenModal(false);
          resetForm();
        }
      );
    /* } */
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
              { selected ? "Editar Repartidor" : "Crear Repartidor" }
            </ModalHeader>
            <ModalBody>
              <Input
                isRequired
                onChange={handleChange("plateCode")}
                onBlur={handleBlur("plateCode")}
                value={values.plateCode}
                label="Codigo de Placa"
                isInvalid={!!errors.plateCode && touched.plateCode }
                errorMessage={ touched.plateCode && errors.plateCode}
                variant="bordered"
              />
              <Select
                isRequired
                items={users}
                label="Usuario"
                variant="bordered"
                onChange={handleChange("userId")}
                onBlur={handleBlur("userId")}
                value={values.userId}
                isInvalid={!!errors.userId && touched.userId}
                errorMessage={touched.userId && errors.userId}
                defaultSelectedKeys={ selected && [selected.userId] as any}
              >
                {(user) => (
                  <SelectItem key={user.id}>{user.email}</SelectItem>
                )}
              </Select>
              <Select
                isRequired
                items={statusArray}
                label="Estado"
                variant="bordered"
                onChange={handleChange("status")}
                onBlur={handleBlur("status")}
                value={values.status}
                isInvalid={!!errors.status && touched.status}
                errorMessage={touched.status && errors.status}
                defaultSelectedKeys={ selected && [selected.status] as any}
              >
                {(s) => (
                  <SelectItem key={s.id}>{s.value}</SelectItem>
                )}
              </Select>
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
