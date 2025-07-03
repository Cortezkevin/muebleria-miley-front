"use client";

import { MovementsAPI } from "@/api";
import { AuthContext } from "@/context";
import { DetailedMovementsDTO, SuccessResponseDTO } from "@/types";
import { formatDate } from "@/utils/utils";
import {
  Button,
  Chip,
  Image,
  Input,
  Spinner,
  Textarea,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function MovementDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { isAdmin } = React.useContext(AuthContext);

  const [movement, setMovement] = React.useState<
    DetailedMovementsDTO | undefined
  >();

  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      const response = await MovementsAPI.getById(params.id);
      if (response?.success) {
        const data = response as SuccessResponseDTO<DetailedMovementsDTO>;
        setMovement(data.content);
      }
    })();
  }, []);

  if (!movement) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner label="Cargando..." size="lg" />
      </div>
    );
  }

  const handleShowGuide = async () => {
    router.push(
      `http://localhost:3000/admin/${
        movement.type === "ENTRADA" ? "entry" : "exit"
      }-guide/${movement.guide}`
    );
  };

  return (
    <div className="w-full p-8 flex flex-col items-center justify-center overflow-auto gap-8">
      <div className="w-full flex justify-between">
        <h1 className="font-semibold text-2xl text-start flex gap-2">
          Movimiento: <p className="text-primary">#{movement.id}</p>
        </h1>
        <div className="flex gap-2">
          <p className="font-semibold text-2xl">Tipo:</p>
          <Chip
            size="lg"
            color={
              movement.type === "ENTRADA"
                ? "success"
                : movement.type === "SALIDA"
                ? "danger"
                : "warning"
            }
            variant="flat"
          >
            {movement.type}
          </Chip>
        </div>
      </div>
      <div className="w-full flex text-lg justify-between items-center">
        <div className="flex gap-2 items-center">
          <h2 className="font-semibold">Responsable:</h2>
          <p>{movement.grocer.fullName}</p>
        </div>
        <div className="flex gap-2 items-center">
          <h2 className="font-semibold">Fecha:</h2>
          <p>{formatDate(movement.date)}</p>
        </div>
      </div>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg text-center">Stock</h2>
          <div className="flex gap-10">
            <div className="flex flex-col bg-white p-3 rounded-lg shadow-md items-center">
              <p className="font-bold text-[40px]">{movement.initialStock}</p>
              <p className="font-semibold text-slate-600">Stock inicial</p>
            </div>
            <div className="flex flex-col bg-white p-3 rounded-lg shadow-md items-center">
              <p className="font-bold text-[40px]">{movement.amount}</p>
              <p className="font-semibold text-slate-600">Cantidad</p>
            </div>
            <div className="flex flex-col bg-white p-3 rounded-lg shadow-md items-center">
              <p className="font-bold text-[40px]">{movement.newStock}</p>
              <p className="font-semibold text-slate-600">Nuevo Stock</p>
            </div>
          </div>
        </div>
        {movement.product ? (
          <div className="flex flex-col gap-4 text-center -mt-2 bg-white py-6 px-5 shadow-md rounded-lg">
            <h2 className="font-semibold text-lg mb-2">
              Detalles del Producto
            </h2>
            <div className="flex flex-col gap-3 min-w-[300px] max-w-[820px]">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 items-start">
                  <p className="font-semibold text-slate-700">Nombre:</p>
                  <p className="text-slate-600">{movement.product.name}</p>
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <p className="font-semibold text-slate-700">Categoria:</p>
                  <p className="text-slate-600">
                    {movement.product.subcategory.category.name}
                  </p>
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <p className="font-semibold text-slate-700">Sub Categoria:</p>
                  <p className="text-slate-600">
                    {movement.product.subcategory.name}
                  </p>
                </div>
                {movement.product.supplier && (
                  <div className="flex flex-col gap-2 items-start">
                    <p className="font-semibold text-slate-700">Proveedor:</p>
                    <p className="text-slate-600">
                      {movement.product.supplier.name}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 items-start">
                <p className="font-semibold text-slate-700">Descripcion:</p>
                <p className="text-justify text-slate-600">
                  {movement.product.description}
                </p>
              </div>
              <div className="flex w-full flex-col gap-3">
                <p className="font-semibold text-slate-700">Imagenes:</p>
                <div className="flex justify-around">
                  {movement.product.images.map((i) => (
                    <Image
                      className={`rounded-none border shadow-sm cursor-pointer`}
                      key={i}
                      src={i}
                      alt={movement.product?.name}
                      width={220}
                      height={220}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 text-center bg-white py-6 px-5 shadow-md rounded-lg">
            <h2 className="font-semibold">Detalles del Material</h2>
            <div className="flex flex-col gap-3 min-w-[700px] max-w-[820px]">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 items-start">
                  <p className="font-semibold text-slate-700">Nombre:</p>
                  <p className="text-slate-600">{movement.rawMaterial?.name}</p>
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <p className="font-semibold text-slate-700">Tipo de Medida:</p>
                  <p className="text-slate-600">{movement.rawMaterial?.measurementUnit}</p>
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <p className="font-semibold text-slate-700">Proveedor:</p>
                  <p className="text-slate-600">
                    {movement.rawMaterial?.supplier}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start">
                <p className="font-semibold text-slate-700">Descripcion:</p>
                <p className="text-slate-600">{movement.rawMaterial?.description}</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="font-semibold">Informacion Adicional</h2>
            <div className="flex flex-col gap-2 w-[400px]">
              <Textarea
                isReadOnly
                minRows={2}
                maxRows={4}
                label="Razon del movimiento"
                value={movement.reason}
                size="lg"
              />
              <Input
                isReadOnly
                label="Almacen"
                size="lg"
                value={movement.warehouse}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <h2 className="font-semibold">Acciones</h2>
          <Button
            endContent={<i className="fa-solid fa-file-pdf"></i>}
            color="warning"
            variant="ghost"
            onClick={handleShowGuide}
          >
            Ver Guia
          </Button>
        </div>
      </div>
    </div>
  );
}
