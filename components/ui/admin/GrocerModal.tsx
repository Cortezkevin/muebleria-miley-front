import { Button } from "@heroui/button";
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
import { EmployeeContext, StoreContext } from "@/context/admin";

type Props = {
  handleOpenModal: (isOpen: boolean) => void;
  isOpen: boolean;
};

type GrocerFormInputs = {
  userId: string;
};

const schema = yup.object().shape({
  userId: yup.string().required("Campo requerido"),
});

export function GrocerModal({ handleOpenModal, isOpen }: Props) {

  const {
    grocer: { selected, loading },
    onCreateGrocer,
    onSelectGrocer
  } = React.useContext(EmployeeContext);

  const {
    user: { users }
  } = React.useContext(StoreContext);


  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  React.useEffect(() => {
    if(!isOpen){
      onSelectGrocer( null );
    }
  }, [isOpen]);

  const { handleChange, handleBlur, touched, values, setFieldValue, isValid, resetForm, errors } =
    useFormik<GrocerFormInputs>({
      validateOnChange: true,
      isInitialValid: false,
      initialValues: {
        userId: ""
      },
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
      validationSchema: schema,
    });

  React.useEffect(() => {
    resetForm({
      values: {
        userId: selected ? selected.userId : "",
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
      onCreateGrocer(
        {
          userId: values.userId
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
              { selected ? "Editar Almacenero" : "Crear Almacenero" }
            </ModalHeader>
            <ModalBody>
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
                  <SelectItem key={user.id}>{user.email + " - " + user.roles.filter((r,i,list) => {
                    if( list.length === 1){
                      return r
                    }else {
                      return r !== "ROLE_USER" && r;
                    }
                  }).map(r => {
                    if( r === "ROLE_USER") return "Cliente";
                    if( r === "ROLE_TRANSPORT") return "Repartidor";
                    if( r === "ROLE_WAREHOUSE") return "Almacenero";
                  }) }</SelectItem>
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
