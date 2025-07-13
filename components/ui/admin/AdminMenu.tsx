"use client";
import { usePathname, useRouter } from "next/navigation";
import NextLink from "next/link";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import { Image } from "@heroui/image";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { User } from "@heroui/user";
import { Divider } from "@heroui/divider";
import { Listbox, ListboxItem, ListboxSection } from "@heroui/listbox";
import { Tooltip } from "@heroui/tooltip";
import { CarrierDTO } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { ProfileContext } from "@/context/profile";

export const AdminMenu = () => {
  const router = useRouter();
  const { onLogout, roleExtraData, photo, email, roles, onAvailableStatus } = useAuth();
  const { personal } = useContext(ProfileContext);
  const pathname = usePathname();

  const handleLogout = () => {
    onLogout();
    router.replace("/auth/login");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="h-[100vh] w-[280px] p-4 flex flex-col gap-4 select-none animate__animated animate__fadeInLeft animate__slow overflow-auto">
      <div className="flex justify-center items-center animate__animated animate__fadeInDown animate__slow ">
        <Image
          src="/vercel.svg"
          alt="Creaciones joaquin"
          className="bg-default-500 px-4"
          width={140}
          height={80}
        />
        {/* <Button isIconOnly variant="light" radius="full">
          <Badge
            size="sm"
            content="5"
            color="danger"
            placement="top-right"
            isInvisible={false}
          >
            <i className="fa-solid fa-bell text-[20px]"></i>
          </Badge>
        </Button> */}
      </div>
      <div className="flex items-center gap-2 w-full">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                color: roleExtraData
                  ? roleExtraData.status === "DISPONIBLE"
                    ? "success"
                    : roleExtraData.status === "EN_ENTREGA" ||
                      roleExtraData.status === "EN_RUTA"
                    ? "warning"
                    : "danger"
                  : undefined,
                name: personal ? personal.firstName : "Cargando...",
                src: photo !== "" ? photo : undefined,
                size: "md",
              }}
              className="transition-transform w-full animate__animated animate__fadeInLeft animate__slow"
              description={
                <p className="text-xs">
                  {roles.includes("ROLE_ADMIN")
                    ? "Administrador"
                    : roles.includes("ROLE_WAREHOUSE")
                    ? `Almacenero`
                    : `Repartidor`}
                </p>
              }
              name={personal ? (personal.firstName + " " + personal.lastName) : "Cargando..."}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="Estado actual"
              isReadOnly
              className="text-center font-semibold "
            >
              <p className="font-semibold">
                {roleExtraData &&
                  roleExtraData.status.replaceAll("_", " ")}
              </p>
            </DropdownItem>
            <DropdownItem
              key="Estado"
              isReadOnly
              className={
                roleExtraData &&
                !!(roleExtraData as CarrierDTO).plateCode &&
                roleExtraData?.status === "EN_DESCANSO"
                  ? ""
                  : "hidden"
              }
            >
              <div className="flex gap-2">
                <p>Cambiar Estado:</p>
                <div className="flex gap-1">
                  <Tooltip 
                    color={"success"}
                    content={"Disponible"}
                    className="capitalize text-white"
                  >
                    <div
                      className="w-4 h-4 bg-success-400"
                      onClick={() => {
                        if (roleExtraData) {
                          onAvailableStatus(roleExtraData.id, "Carrier");
                        }
                      }}
                    ></div>
                  </Tooltip>
                </div>
              </div>
            </DropdownItem>
            <DropdownItem key="MiPerfil" onClick={handleProfile}>
              Mi perfil
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Cerrar Sesion
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Divider />
      <div>
        <div className="w-full max-w-[260px] px-1 rounded-small animate__animated animate__fadeInLeft animate__slow">
          <Listbox variant="flat" aria-label="Listbox menu with sections">
            <ListboxSection title="Tienda" showDivider>
              <ListboxItem
                key="Home"
                shouldHighlightOnFocus
                textValue="Home"
                className="text-default-500"
                startContent={<i className="fa-solid fa-shop"></i>}
              >
                <NextLink passHref legacyBehavior href={"/"}>
                  <Link href={"#"}>Home</Link>
                </NextLink>
              </ListboxItem>
            </ListboxSection>
            <ListboxSection title="Analiticas" showDivider>
              <ListboxItem
                key="Dashboard"
                shouldHighlightOnFocus
                textValue="Dashboard"
                className="text-default-500"
                startContent={<i className="fa-solid fa-chart-line"></i>}
              >
                <NextLink passHref legacyBehavior href={"/admin/dashboard"}>
                  <Link href={"#"}>Dashboard</Link>
                </NextLink>
              </ListboxItem>
            </ListboxSection>
            <ListboxSection title="Mantenimiento" showDivider>
              <ListboxItem
                key="Usuarios"
                shouldHighlightOnFocus
                textValue="Usuarios"
                className={`text-default-500 ${
                  roles.includes("ROLE_ADMIN") ? "" : "hidden"
                }`}
                startContent={<i className="fa-solid fa-users"></i>}
              >
                <NextLink passHref legacyBehavior href={"/admin/users"}>
                  <Link href={""}>
                    <p>Usuarios</p>
                  </Link>
                </NextLink>
              </ListboxItem>
              <ListboxItem
                key="Categorias"
                shouldHighlightOnFocus
                textValue="Categorias"
                className={`text-default-500 ${
                  roles.includes("ROLE_ADMIN") ? "" : "hidden"
                }`}
                startContent={<i className="fa-solid fa-layer-group"></i>}
              >
                <NextLink passHref legacyBehavior href={"/admin/category"}>
                  <Link href={"#"}>
                    <p>Categorias</p>
                  </Link>
                </NextLink>
              </ListboxItem>
              <ListboxItem
                key="SubCategorias"
                shouldHighlightOnFocus
                textValue="SubCategorias"
                className={`text-default-500 ${
                  roles.includes("ROLE_ADMIN") ? "" : "hidden"
                }`}
                startContent={<i className="fa-solid fa-list"></i>}
              >
                <NextLink passHref legacyBehavior href={"/admin/sub-category"}>
                  <Link href={"#"}>
                    <p>Sub Categorias</p>
                  </Link>
                </NextLink>
              </ListboxItem>
              <ListboxItem
                key="Productos"
                shouldHighlightOnFocus
                textValue="Productos"
                className="text-default-500"
                /* className={`text-slate-600 ${
                  user.roles.includes("ROLE_USER") ? "" : "hidden"
                }`} */
                startContent={<i className="fa-solid fa-couch"></i>}
              >
                <NextLink passHref legacyBehavior href={"/admin/product"}>
                  <Link href={""}>
                    <p>Productos</p>
                  </Link>
                </NextLink>
              </ListboxItem>
              <ListboxItem
                key="Pedidos"
                shouldHighlightOnFocus
                textValue="Pedidos"
                className="text-default-500"
                startContent={<i className="fa-solid fa-money-bill"></i>}
              >
                <NextLink passHref legacyBehavior href={"/admin/orders"}>
                  <Link href={""}>
                    <p>Pedidos</p>
                  </Link>
                </NextLink>
              </ListboxItem>
            </ListboxSection>
            <ListboxSection title="Empleados" showDivider>
              <ListboxItem
                key="Repartidores"
                shouldHighlightOnFocus
                textValue="Repartidores"
                className="text-default-500"
                startContent={<i className="fa-solid fa-truck"></i>}
              >
                <NextLink passHref legacyBehavior href={"/admin/carrier"}>
                  <Link href={""}>
                    <p>Repartidores</p>
                  </Link>
                </NextLink>
              </ListboxItem>
              <ListboxItem
                key="Almaceneros"
                shouldHighlightOnFocus
                textValue="Almaceneros"
                className={`text-default-500 ${
                  pathname == "/admin/grocer" ? "active" : ""
                }`}
                startContent={<i className=" fa-solid fa-boxes-stacked"></i>}
              >
                <NextLink passHref legacyBehavior href={"/admin/grocer"}>
                  <Link href={""}>
                    <p>Almaceneros</p>
                  </Link>
                </NextLink>
              </ListboxItem>
            </ListboxSection>
            <ListboxSection title="Compras" showDivider className={`text-slate-600 ${
                  roles.includes("ROLE_ADMIN") ? "" : roles.includes("ROLE_WAREHOUSE") ? "" : "hidden"
                }`}>
              <ListboxItem
                key="Proveedores"
                shouldHighlightOnFocus
                textValue="Proveedores"
                className="text-default-500"
                startContent={<i className="fa-solid fa-parachute-box"></i>}
              >
                <NextLink passHref legacyBehavior href={"/admin/supplier"}>
                  <Link href={""}>
                    <p>Proveedores</p>
                  </Link>
                </NextLink>
              </ListboxItem>
              <ListboxItem
                key="Materia Prima"
                shouldHighlightOnFocus
                textValue="Materia Prima"
                className="text-default-500"
                startContent={
                  <i className="fa-solid fa-screwdriver-wrench"></i>
                }
              >
                <NextLink passHref legacyBehavior href={"/admin/material"}>
                  <Link href={""}>
                    <p>Materiales</p>
                  </Link>
                </NextLink>
              </ListboxItem>
              <ListboxItem
                key="Ordenes de Compra"
                shouldHighlightOnFocus
                textValue="Ordenes de Compra"
                className="text-default-500"
                startContent={<i className="fa-solid fa-basket-shopping"></i>}
              >
                <NextLink passHref legacyBehavior href={"/admin/purchase"}>
                  <Link href={""}>
                    <p>Ordenes de Compra</p>
                  </Link>
                </NextLink>
              </ListboxItem>
            </ListboxSection>
            <ListboxSection title="Almacen" showDivider className={`text-slate-600 ${
                  roles.includes("ROLE_ADMIN") ? "" : roles.includes("ROLE_WAREHOUSE") ? "" : "hidden"
                }`}>
              <ListboxItem
                key="Almacenes"
                shouldHighlightOnFocus
                textValue="Almacenes"
                className="text-default-500"
                startContent={<i className="fa-solid fa-warehouse"></i>}
              >
                <NextLink passHref legacyBehavior href={"/admin/warehouse"}>
                  <Link href={""}>
                    <p>Almacenes</p>
                  </Link>
                </NextLink>
              </ListboxItem>
              <ListboxItem
                key="Movimientos"
                shouldHighlightOnFocus
                textValue="Movimientos"
                className="text-default-500"
                startContent={
                  <i className="fa-solid fa-cart-flatbed"></i>
                }
              >
                <NextLink passHref legacyBehavior href={"/admin/movements"}>
                  <Link href={""}>
                    <p>Movimientos</p>
                  </Link>
                </NextLink>
              </ListboxItem>
              <ListboxItem
                key="Guias de Entrada"
                shouldHighlightOnFocus
                textValue="Guias de Entrada"
                className="text-default-500"
                startContent={
                  <i className="fa-solid fa-plus"></i>
                }
              >
                <NextLink passHref legacyBehavior href={"/admin/entry-guide"}>
                  <Link href={""}>
                    <p>Guias de Entrada</p>
                  </Link>
                </NextLink>
              </ListboxItem>
              <ListboxItem
                key="Guias de Salida"
                shouldHighlightOnFocus
                textValue="Guias de Salida"
                className="text-default-500"
                startContent={
                  <i className="fa-solid fa-x"></i>
                }
              >
                <NextLink passHref legacyBehavior href={"/admin/exit-guide"}>
                  <Link href={""}>
                    <p>Guias de Salida</p>
                  </Link>
                </NextLink>
              </ListboxItem>
            </ListboxSection>
            <ListboxSection title="Ajustes">
              <ListboxItem
                key="CerrarSesion"
                className="text-default-500"
                color="danger"
                onClick={handleLogout}
                startContent={
                  <i className="fa-solid fa-right-from-bracket"></i>
                }
              >
                Cerrar Sesion
              </ListboxItem>
            </ListboxSection>
          </Listbox>
        </div>
      </div>
    </div>
  );
};
