"use client";

import { OrderAPI } from "@/api";
import { AuthContext } from "@/context/auth";
import { DetailedOrderDTO, OrderDTO, SuccessResponseDTO } from "@/types";
import { Button, Chip, Spinner } from "@heroui/react";
import { Input, Textarea } from "@heroui/input";
import React from "react";
import { useRouter } from "next/navigation";
import { OrderDetail, OrderDetailSummary } from "@/components/ui";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = React.use(params);
  const { isLogged } = React.useContext(AuthContext);
  const [order, setOrder] = React.useState<DetailedOrderDTO | undefined>();

  const router = useRouter();

  React.useEffect(() => {
    const token = Cookies.get("token");
    if (!token || token.length < 0) {
      router.push("/auth/login?prevPage=/orders/" + param.id);
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      const response = await OrderAPI.getDetailedOrder(param.id);
      if (response?.success) {
        const data = response as SuccessResponseDTO<DetailedOrderDTO>;
        setOrder(data.content);
      }
    })();
  }, []);

  if (!order){
    return (
      <div className="w-[100vw] min-h-[450px] flex items-center justify-center">
        <Spinner label="Cargando..." size="lg" />
      </div>
    );
  }

  const handleCancelOrder = async () => {
    const response = await OrderAPI.cancel( order.id );
    if( response?.success ){
      const data = response as SuccessResponseDTO<OrderDTO>;
      toast.success( data.message );
      setOrder({ ...order, status: data.content.status });
    }
  }

  return (
    <div className="min-h-[450px] flex items-center justify-center">
      <div className="w-[1200px] flex flex-col gap-8">
        <div className="w-full flex justify-between items-center text-2xl font-semibold">
          <h1>Detalle del Pedido</h1>
          <div className="flex gap-4">
            <p>Estado:</p>
            <Chip
              variant="flat"
              size="lg"
              color={
                order.status === "PENDING"
                  ? "warning"
                  : order.status === "IN_PROGRESS" || order.status === "ENTREGADO"
                  ? "success"
                  : "danger"
              }
            >
              {order.status}
            </Chip>
          </div>
        </div>
        <div className="flex gap-6  justify-center min-h-[300px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 p-4 shadow-lg rounded-lg w-[800px]">
              <h3 className="text-lg font-semibold">Productos Comprados</h3>
              {order.orderDetails.map((od) => (
                <OrderDetail key={od.id} {...od} modeSoloImage={true} />
              ))}
            </div>
            <div className="w-full min-h-[200px] p-4 shadow-lg rounded-lg">
              <OrderDetailSummary
                count={order.orderDetails.length}
                subtotal={order.subtotal}
                tax={order.tax}
                discount={order.discount}
                total={order.total}
                shippingCost={order.shippingCost}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 w-[400px] p-4 shadow-lg rounded-lg ">
              <h3 className="text-lg font-semibold">
                Informacion de la Entrega
              </h3>
              <div className="flex flex-col gap-2">
                <Input
                  label="Nombre del Transportador"
                  value={ (order.shipping && order.shipping.carrier ) ? order.shipping.carrier.fullName : "Aun no empieza el envio" }
                  isReadOnly
                />
                {
                  order.shipping && order.shipping.carrier &&
                  <Input
                    label="Telefono de Contacto"
                    value={ order.shipping.carrier.phone }
                    isReadOnly
                  />
                }
                <Input
                  label="Direccion de Entrega"
                  value={ order.shippingAddress }
                  isReadOnly
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-[400px] p-4 shadow-lg rounded-lg ">
              <h3 className="text-lg font-semibold">Informacion Adicional</h3>
              <div className="flex flex-col gap-2">
                <Textarea
                  label="Nota"
                  value={ order.note }
                  isReadOnly
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4 shadow-lg rounded-lg ">
              <h3 className="text-lg font-semibold">Acciones</h3>
              <div className="flex flex-col gap-2">
                <a
                  href={order.invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    color="primary"
                    size="lg"
                    className="w-full "
                  >
                    Ver Factura
                  </Button>
                </a>
                <Button
                  color="danger"
                  size="lg"
                  className="w-full"
                  onPress={ handleCancelOrder }
                  isDisabled={
                    order.shipping ? (order.shipping.status === "EN_TRANSITO" || order.shipping.status === "ENTREGADO") : false ||
                    order.status !== "PENDING"
                  }
                >
                  Anular Pedido
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
