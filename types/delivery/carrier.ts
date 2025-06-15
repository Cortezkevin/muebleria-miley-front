export type CarrierStatus = "DISPONIBLE" | "PROCESANDO_PEDIDO" | "EN_RUTA" | "EN_ENTREGA" | "EN_DESCANSO" | "FUERA_DE_SERVICIO";

export type CarrierDTO = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  plateCode: string;
  userId: string;
  status: CarrierStatus;
}