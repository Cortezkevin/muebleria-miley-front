export type GrocerStatus = "DISPONIBLE" | "PROCESANDO_PEDIDO" | "EMPAQUETANDO" | "EN_DESCANSO";

export type GrocerDTO = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  userId: string;
  status: GrocerStatus;
}

export type NewGrocerDTO = {
  userId: string;
}