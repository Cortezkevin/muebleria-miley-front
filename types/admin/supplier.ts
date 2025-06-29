export type CreateSupplierDTO = {
  name: string;
  ruc: string;
  phone: string;
  address: string;
}

export type SupplierDTO = {
  id: string;
  name: string;
  ruc: string;
  phone: string;
  address: string;
}

export type SimpleSupplierDTO = {
  id: string;
  name: string;
}