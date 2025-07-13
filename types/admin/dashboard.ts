import { OrderStatus } from "../sales";

export type ProductTopOptionsDTO = {
  top: number;
  year: number;
  month: number;
  order: "ASC" | "DESC"
}

export type SalesByProductDTO = {
  product: string;
  amount: number;
}

export type SalesByUserDTO = {
  client: string;
  salesTotal: number;
}

export type SalesByMonthDTO = {
  month: number;
  sales: string;
}

export type OrdersCountByStatusDTO = { 
  status: OrderStatus,
  amount: number
}

export type OrderDurationPerDistanceAVGDTO = {
  distanceRange: string;
  avgDurationInDays: number;
}

export type SalesDashboardDTO = {
  products: number;
  categories: number;
  subcategories: number;
  users: number;
  orders: number;
  totalSales: string;
  avgDurationByDistanceRange: OrderDurationPerDistanceAVGDTO[];
  ordersCountByStatus: OrdersCountByStatusDTO[];
  topProductByYear: SalesByProductDTO[];
  topUser: SalesByUserDTO[];
  salesByMonth: SalesByMonthDTO[];
}