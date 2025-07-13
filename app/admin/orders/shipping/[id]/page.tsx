"use client";

import { OrderAPI } from "@/api";
import {
  DetailedShippingOrderDTO,
  ShippingOrderDTO,
  SuccessResponseDTO,
} from "@/types";
import { Button, Card, Chip, Spinner } from "@heroui/react";
import { Input, Textarea } from "@heroui/input";
import React from "react";
import { AuthContext } from "@/context/auth";
import toast from "react-hot-toast";
import { OrderContext } from "@/context/admin";
import { Utils } from "@/utils";
import { useRouter } from "next/navigation";
import { OrderDetail } from "@/components/ui";
import { RxStomp, RxStompConfig } from "@stomp/rx-stomp";
import { map } from 'rxjs'

const rxStompConfig: RxStompConfig = {
  brokerURL: 'ws://localhost:4000/socket',
  debug: (msg: string) => {
    console.log(new Date(), msg)
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  reconnectDelay: 200,
}

export default function OrderShippingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = React.use(params);
  const { validateSession } = React.useContext(AuthContext);
  const { loadOrders } = React.useContext(OrderContext);
  const router = useRouter();

  const rxStompRef = React.useRef(new RxStomp());
  const rxStomp = rxStompRef.current;

  const [orderShipping, setOrderShipping] = React.useState<
    DetailedShippingOrderDTO | undefined
  >();

  React.useEffect(() => {
    validateSession();
  },[]);
/* PASO REALIZADO POR EL APLICATIVO MOVIL
  React.useEffect(() => {
    rxStomp.configure(rxStompConfig)
    rxStomp.activate()
    let interval: any;
    if(orderShipping && orderShipping.status === 'EN_TRANSITO'){
      interval = setInterval(() => {
      rxStomp.publish({ destination: "/app/location", body: JSON.stringify({
          lta: 145124.02153,
          lng: 2246.12468,
          carrier: "Jose Perez"
        })})
      }, 5000)
    }

    return () => { 
      rxStomp.deactivate() 
      clearInterval(interval);
    }
  })
*/
  React.useEffect(() => {
    (async () => {
      const response = await OrderAPI.getShippingOrder(param.id);
      if (response?.success) {
        const data = response as SuccessResponseDTO<DetailedShippingOrderDTO>;
        setOrderShipping(data.content);
      }
    })();
  }, []);

  if (!orderShipping) {
    return (
      <div className="w-[100vw] min-h-[450px] flex items-center justify-center">
        <Spinner label="Cargando..." size="lg" />
      </div>
    );
  }

  const handleShowGuide = async () => {
    router.push(
      `http://localhost:3000/admin/exit-guide/${orderShipping.exitGuideId}`
    );
  };

  const handleContinueProccess = () => {
    switch (orderShipping.status) {
      case "EN_PREPARACION":
        (async () => {
          const response = await OrderAPI.checkPrepareShippingOrder({
            orderShippingId: orderShipping.id,
          });
          if (response?.success) {
            const data = response as SuccessResponseDTO<ShippingOrderDTO>;
            toast.success(data.message);
            setOrderShipping({
              ...orderShipping,
              preparedDate: data.content.preparedDate,
              status: data.content.status,
            });
            loadOrders();
          }
        })();
        return;
      case "PREPARADO":
        (async () => {
          const response = await OrderAPI.checkTransitShippingOrder({
            orderShippingId: orderShipping.id,
          });
          if (response?.success) {
            const data = response as SuccessResponseDTO<ShippingOrderDTO>;
            toast.success(data.message);
            setOrderShipping({
              ...orderShipping,
              shippingDate: data.content.shippingDate,
              status: data.content.status,
            });
            loadOrders();
          }
        })();
        return;
      /*case "EN_TRANSITO":
        (async () => {
          const response = await OrderAPI.completeShippingOrder({
            orderShippingId: orderShipping.id,
          });
          if (response?.success) {
            const data = response as SuccessResponseDTO<ShippingOrderDTO>;
            toast.success(data.message);
            setOrderShipping({
              ...orderShipping,
              completedDate: data.content.completedDate,
              status: data.content.status,
            });
            loadOrders();
          } else {
            toast.error(response?.message || "Ocurrio un error");
          }
        })();
        return;*/
      default: {
        return;
      }
    }
  };

  return (
    <div className="w-full p-8 flex items-center justify-center overflow-auto">
      <div className="min-w-[300px] w-full flex flex-col gap-6 items-center justify-center">
        <div className="w-full flex justify-between items-center text-2xl font-semibold">
          <h1 className=" flex gap-2">
            Proceso de Entrega del Pedido:
            <p className="text-primary">#{orderShipping.order.id}</p>
          </h1>
          <div className="flex gap-4">
            <p>Estado:</p>
            <Chip
              variant="flat"
              size="lg"
              color={
                orderShipping.status === "EN_PREPARACION"
                  ? "warning"
                  : orderShipping.status === "ENTREGADO"
                  ? "success"
                  : "danger"
              }
            >
              {orderShipping.status}
            </Chip>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex gap-1">
            <h3>Preparado por: </h3>
            <p className="font-semibold">{orderShipping.preparedBy}</p>
          </div>
          <div className="flex gap-1">
            <h3>
              {orderShipping.status === "ENTREGADO"
                ? "Completado por:"
                : "A cargo del empleado: "}
            </h3>
            <p className="font-semibold">
              {orderShipping.order.shipping.carrier.fullName}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col p-4 items-center justify-center gap-4 ">
          <h3 className="text-lg font-semibold">Control de Tiempos</h3>
          <div className="flex gap-4">
            <Card className="p-4 rounded-lg flex flex-col items-center">
              Fecha de Creacion
              <p className="text-lg font-semibold">
                {Utils.formatDate(orderShipping.createdDate)}
              </p>
            </Card>
            <Card className="p-4 rounded-lg flex flex-col items-center">
              Fecha de Inicio
              <p className="text-lg font-semibold">
                {Utils.formatDate(orderShipping.startDate)}
              </p>
            </Card>
            <Card className="p-4 rounded-lg flex flex-col items-center">
              Fecha de Preparacion
              <p className="text-lg font-semibold">
                {orderShipping.preparedDate
                  ? Utils.formatDate(orderShipping.preparedDate)
                  : "No Registrado"}
              </p>
            </Card>
            <Card className="p-4 rounded-lg flex flex-col items-center">
              Fecha de Envio
              <p className="text-lg font-semibold">
                {orderShipping.shippingDate
                  ? Utils.formatDate(orderShipping.shippingDate)
                  : "No Registrado"}
              </p>
            </Card>
            <Card className="p-4 rounded-lg flex flex-col items-center">
              Fecha de Finalizacion
              <p className="text-lg font-semibold">
                {orderShipping.completedDate
                  ? Utils.formatDate(orderShipping.completedDate)
                  : "No Registrado"}
              </p>
            </Card>
          </div>
        </div>
        <div className="min-w-[300px] flex flex-col gap-6 justify-center min-h-[300px]">
          <div className="flex gap-6">
            <Card className="flex flex-col gap-4 w-[350px] p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Informacion del Cliente</h3>
            <div className="flex flex-col gap-2">
              <Input
                label="Nombre del Cliente"
                value={orderShipping.order.user.fullName}
                isReadOnly
              />
              <Input
                label="Email"
                value={orderShipping.order.user.email}
                isReadOnly
              />
              <Input
                label="Numero de Telefono"
                value={orderShipping.order.user.phone}
                isReadOnly
              />
            </div>
            </Card>
            <Card className="flex flex-col gap-4 w-[350px] p-4  rounded-lg">
              <h3 className="text-lg font-semibold">Informacion del Envio</h3>
              <div className="flex flex-col gap-2">
                <Input
                  label="Direccion de Entrega"
                  value={orderShipping.order.shippingAddress}
                  isReadOnly
                />
                <Input
                  label="Direccion Especifica"
                  value={orderShipping.order.specificAddress}
                  isReadOnly
                />
              </div>
            </Card>
          </div>
          <div className="flex gap-6">
            <Card className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 p-4 rounded-lg w-[350px]">
                <h3 className="text-lg font-semibold">
                  Productos listos para recoger
                </h3>
                {orderShipping.order.orderDetails.map((od) => (
                  <OrderDetail key={od.id} {...od} />
                ))}
              </div>
            </Card>
            <Card className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 w-[350px] p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Informacion Adicional</h3>
                <div className="flex flex-col gap-2">
                  <Textarea
                    label="Nota"
                    value={orderShipping.order.note}
                    isReadOnly
                  />
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
            </Card>
          </div>
        </div>
        <Button
          isDisabled={
            orderShipping.order.status === "ANULADO" ||
            orderShipping.status === "ENTREGADO" ||
            orderShipping.status === "PREPARADO"
          }
          color="primary"
          size="lg"
          className="w-[400px] text-white"
          onClick={handleContinueProccess}
        >
          {orderShipping.status !== "ENTREGADO"
            ? orderShipping.status === "EN_PREPARACION"
              ? "Preparado"
              : orderShipping.status === "PREPARADO" 
              ? "Iniciar Recorrido"
              : "Completar"
            : "Proceso Completado"}
        </Button>

        {
          orderShipping.status === "PREPARADO"
          && <span className="font-semibold">
            Continua el proceso desde el aplicativo movil.
          </span>
        }
      </div>
    </div>
  );
}
