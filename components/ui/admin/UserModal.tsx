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
import React from "react";
import * as yup from "yup";
import { Select, SelectItem } from "@heroui/select";
import { UserAPI } from "@/api";
import { RoleDTO, Status, SuccessResponseDTO } from "@/types";
import { Chip } from "@heroui/react";
import { StoreContext } from "@/context";

type Props = {
  handleOpenModal: (isOpen: boolean) => void;
  isOpen: boolean;
};

type UserFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  status: Status;
  roles: string[];
};

const statusArray = [
  {
    id: "ACTIVO",
    value: "ACTIVO",
  },
  {
    id: "INACTIVO",
    value: "INACTIVO",
  },
];

const schema = yup.object().shape({
  firstName: yup.string().required("Campo requerido"),
  lastName: yup.string().required("Campo requerido"),
  email: yup
    .string()
    .email("Ingrese un email valido")
    .required("Campo requerido"),
  status: yup.string().required("Campo requerido"),
  roles: yup
    .array()
    .of(yup.string())
    .min(1, "Seleccione al menos un rol")
    .required("Campo requerido"),
});

export function UserModal({ handleOpenModal, isOpen }: Props) {
  const {
    user: { selected, loading },
    onSelectUser,
    onCreateOrEditUser,
  } = React.useContext(StoreContext);
  
  const [roles, setRoles] = React.useState<RoleDTO[]>([]);

  React.useEffect(() => {
    (async () => {
      const response = await UserAPI.getRoles();
      if (response && response.success) {
        const data = response as SuccessResponseDTO<RoleDTO[]>;
        setRoles(data.content);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (!isOpen) {
      onSelectUser(null);
    }
  }, [isOpen]);

  const {
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    isValid,
    resetForm,
    errors,
    touched,
  } = useFormik<UserFormInputs>({
    validateOnChange: true,
    isInitialValid: false,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      roles: [""],
      status: "ACTIVO",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: schema,
  });

  React.useEffect(() => {
    resetForm({
      values: {
        firstName: selected ? selected?.firstName : "",
        lastName: selected ? selected?.lastName : "",
        roles: selected ? selected.roles : [],
        email: selected ? selected.email : "",
        status: selected ? selected.status : "ACTIVO",
      },
    });
  }, [selected]);

  const onSubmit = async () => {
    if (selected) {
      onCreateOrEditUser(
        "Edit",
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          roles: values.roles,
          status: values.status,
          userId: selected.id,
        },
        () => {
          resetForm();
          handleOpenModal(false);
        }
      );
    }else {
      onCreateOrEditUser(
        "Create",
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          roles: values.roles,
          status: values.status,
          password: values.email
        },
        () => {
          resetForm();
          handleOpenModal(false);
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
              { selected ? "Editar Usuario" : "Crear Usuario" }
            </ModalHeader>
            <ModalBody>
              <Input
                isRequired
                onChange={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                label="Nombre"
                isInvalid={!!errors.firstName && touched.firstName}
                errorMessage={touched.firstName && errors.firstName}
                variant="bordered"
              />
              <Input
                isRequired
                onChange={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                label="Apellidos"
                isInvalid={!!errors.lastName && touched.lastName}
                errorMessage={touched.lastName && errors.lastName}
                variant="bordered"
              />
              <Input
                isRequired
                type="email"
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                label="Email"
                isInvalid={!!errors.email && touched.email}
                errorMessage={touched.email && errors.email}
                variant="bordered"
              />
              <Select
                label="Roles"
                selectionMode="multiple"
                placeholder="Selecciona los roles"
                selectedKeys={values.roles}
                onBlur={handleBlur("roles")}
                value={values.roles}
                isInvalid={!!errors.roles && touched.roles}
                errorMessage={touched.roles && errors.roles}
                variant="bordered"
                onSelectionChange={(e: any) => {
                  setFieldValue("roles", [...e]);
                }}
              >
                {roles.map((role) => (
                  <SelectItem key={role.key} textValue={role.value}>
                    <Chip
                      variant="flat"
                      color={
                        role.key === "ROLE_USER"
                          ? "warning"
                          : role.key === "ROLE_ADMIN"
                          ? "danger"
                          : "secondary"
                      }
                    >
                      {role.value}
                    </Chip>
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                items={ statusArray }
                label="Estado"
                variant="bordered"
                onChange={handleChange("status")}
                onBlur={handleBlur("status")}
                value={values.status}
                isInvalid={!!errors.status && touched.status}
                errorMessage={touched.status && errors.status}
                defaultSelectedKeys={selected && ([selected.status] as any)}
              >
                {(s) => (
                  <SelectItem key={s.id} textValue={s.value}>
                    <Chip
                      variant="flat"
                      color={s.value === "ACTIVO" ? "success" : "danger"}
                    >
                      {s.value}
                    </Chip>
                  </SelectItem>
                )}
              </Select>
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
