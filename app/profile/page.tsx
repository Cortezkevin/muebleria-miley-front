"use client";

import { AuthContext } from "@/context/auth";
import { Image } from "@heroui/image";
import { Button, Input, Tooltip } from "@heroui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type InformationFormInputs = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthdate: string;
  file?: File;
};

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "El nombre debe tener 2 caracteres como minimo")
    .required("Campo requerido"),
  lastName: yup
    .string()
    .min(8, "El apellido debe tener 8 caracteres como minimo")
    .required("Campo requerido"),
  phone: yup
    .string()
    .matches(/^9\d{8}$/, "Ingrese un numero valido")
    .required("Ingrese un numero de telefono"),
  email: yup
    .string()
    .email("Ingrese un email valido")
    .required("Campo requerido"),
  birthdate: yup.string().required("Campo requerido"),
});

export default function ProfilePage() {

  const router = useRouter();

  const { user, onUpdateProfile } = React.useContext(AuthContext);

  const inputPhotoRef = React.useRef<HTMLInputElement>(null);

  const [image, setImage] = React.useState(user.photoUrl);
  console.log(user,image)

  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    isValid,
    errors,
    setValues,
    resetForm,
  } = useFormik<InformationFormInputs>({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      birthdate: "",
      email: "",
      file: undefined,
    },
    validateOnChange: true,
    isInitialValid: true,
    onSubmit: async ({ firstName, lastName, phone }) => { },
    validationSchema: schema,
  });

  React.useEffect(() => {
    setImage(user.photoUrl);
    resetForm({
      values: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.profile.phone,
        email: user.email,
        birthdate: user.profile.birthDate,
        file: undefined,
      },
    });
  }, [user]);

  const handleSelectPhoto = () => {
    inputPhotoRef.current?.click();
  };

  const handleInputPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.nativeEvent.target as any).files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        const imgUrl = e.target?.result;
        setImage(imgUrl as string);
      };

      setValues({
        ...values,
        file,
      });
    }
  };

  const handleEditInformation = async () => {
    if (isEditing) {
      if (
        user.firstName !== values.firstName ||
        user.lastName !== values.lastName ||
        user.email !== values.email ||
        user.profile.phone !== values.phone ||
        user.profile.birthDate !== values.birthdate ||
        image !== user.photoUrl
      ) {
        setIsLoading(true);
        await onUpdateProfile(
          {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            email: values.email,
            userId: user.id,
            birthdate: values.birthdate,
            photoUrl: ""
          },
          values.file
        );
        setIsLoading(false);
        if (user.email !== values.email) {
          toast.success("Se actualizo su correo, por favor vuelva a iniciar sesion");
          router.push("/auth/login?prevPage=/profile");
        }
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="w-full min-h-[400px] flex items-center justify-center gap-14 p-12">
      <div className="w-[300px] h-[300px] relative rounded-full bg-white-200 flex items-center justify-center">
        <Image
          className="rounded-full shadow-lg border border-slate-300 object-cover object-center max-h-[300px]"
          src={image}
          width={300}
          height={300}
          alt="Usuario"
        />
        {isEditing && (
          <Tooltip
            color="primary"
            content="Subir Foto"
            className="text-white"
            placement="bottom"
            size="sm"
          >
            <div
              onClick={handleSelectPhoto}
              className="absolute bottom-6 right-8 shadow-lg rounded-full border border-primary text-primary transition-all duration-300 bg-white cursor-pointer hover:bg-slate-200  h-[40px] w-[40px] z-50 flex items-center justify-center text-lg"
            >
              <i className="fa-solid fa-camera"></i>
            </div>
          </Tooltip>
        )}
      </div>
      <div className="w-[500px] flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Informacion Personal</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 animate__animated animate__fadeIn">
          <Input
            isReadOnly={!isEditing}
            
            variant={"bordered"}
            label="Nombre"
            value={values.firstName}
            onChange={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
            isInvalid={!!errors.firstName && touched.firstName}
            errorMessage={touched.firstName && errors.firstName}
          />
          <Input
            isReadOnly={!isEditing}
            isRequired
            variant={"bordered"}
            label="Apellidos"
            value={values.lastName}
            onChange={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
            isInvalid={!!errors.lastName && touched.lastName}
            errorMessage={touched.lastName && errors.lastName}
          />
          <Input
            isReadOnly={!isEditing}
            isRequired
            variant={"bordered"}
            type="email"
            label="Correo"
            value={values.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            isInvalid={!!errors.email && touched.email}
            errorMessage={touched.email && errors.email}
          />
          <Input
            isReadOnly={!isEditing}
            isRequired
            variant={"bordered"}
            type="text"
            maxLength={9}
            label="Numero de Telefono"
            value={values.phone}
            onChange={handleChange("phone")}
            onBlur={handleBlur("phone")}
            isInvalid={!!errors.phone && touched.phone}
            errorMessage={touched.phone && errors.phone}
          />
          <Input
            isReadOnly={!isEditing}
            isRequired
            variant={"bordered"}
            type="date"
            label="Fecha de Nacimiento"
            value={values.birthdate}
            onChange={handleChange("birthdate")}
            onBlur={handleBlur("phone")}
            isInvalid={!!errors.birthdate && touched.birthdate}
            errorMessage={touched.birthdate && errors.birthdate}
          />
          <input
            onChange={handleInputPhotoChange}
            className="hidden"
            type="file"
            multiple={false}
            ref={inputPhotoRef}
          />
          <Button
            className="text-white"
            color={isEditing ? "success" : "primary"}
            isLoading={isLoading}
            isDisabled={!isValid || (isEditing && values.phone === "")}
            onClick={handleEditInformation}
          >
            {isEditing ? "Guardar Cambios" : "Editar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
