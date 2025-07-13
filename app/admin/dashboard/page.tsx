"use client";

import { DashboardAPI } from "@/api";
import { salesTopByClient } from "@/api/dashboardAPI";
import { ExistsCard } from "@/components/ui/admin/dashboard/ExistsCard";
import { ProductTopOptionsDTO, SalesByMonthDTO, SalesByProductDTO, SalesByUserDTO, SalesDashboardDTO, SuccessResponseDTO } from "@/types";
import { formatDiasAHoras, getMonthName } from "@/utils/utils";
import { Select, SelectItem } from "@heroui/select";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


const orderArray = [{ id: "ASC", value: "Menos" }, { id: "DESC", value: "Mas" }];

const topArray = [
  {
    id: 3,
    value: 3,
  },
  {
    id: 5,
    value: 5,
  },
  {
    id: 10,
    value: 10,
  }
];

const yearArray = [
  {
    id: 2021,
    value: 2021,
  },
  {
    id: 2022,
    value: 2022,
  },
  {
    id: 2023,
    value: 2023,
  },
  {
    id: 2024,
    value: 2024,
  }
];

const monthArray = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 },
  { id: 6, value: 6 },
  { id: 7, value: 7 },
  { id: 8, value: 8 },
  { id: 9, value: 9 },
  { id: 10, value: 10 },
  { id: 11, value: 11 },
  { id: 12, value: 12 },
]


export default function DashboardPage() {
  const [salesDashboard, setSalesDashboard] = React.useState<
    SalesDashboardDTO | undefined
  >();

  const [salesProductOptions, setSalesProductOptions] = React.useState<ProductTopOptionsDTO>({
    top: 5,
    year: 2024,
    month: 7,
    order: "DESC"
  });

  const [topSalesUser, setTopSalesUser] = React.useState(5);
  const [salesMonthYear, setSalesMonthYear] = React.useState(2024);

  React.useEffect(() => {
    (async () => {
      const response = await DashboardAPI.sales();
      if (response?.success) {
        const data = response as SuccessResponseDTO<SalesDashboardDTO>
        setSalesDashboard(data.content);
      }
    })();
  }, []);

  React.useEffect(() => {
    if( salesDashboard ){
      refreshProductSales();
    }
  }, [ salesProductOptions ]);

  if (!salesDashboard) {
    return <h1>Cargando...</h1>;
  }

  const refreshProductSales = async () => {
    const response = await DashboardAPI.salesTopByProduct( salesProductOptions );
    if( response?.success ){
      const data = response as SuccessResponseDTO<SalesByProductDTO[]>;
      setSalesDashboard({
        ...salesDashboard,
        topProductByYear: data.content
      });
    }
  }

  function truncateText(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  }

  const CustomizedAxisTick = ({
    x,
    y,
    payload,
  }: {
    x?: number;
    y?: number;
    payload?: any;
  }) => {
    const truncatedText = truncateText(payload.value, salesProductOptions.top > 5 ? 8 : 15);
    return (
      <g transform={`translate(${x},${y})`}>  
        <text x={-50} y={15} fill="#444">
          {truncatedText}
        </text>
      </g>
    );
  };

  const handleChangeProductOrder = async ( order: "DESC" | "ASC" ) => {
    setSalesProductOptions({
      ...salesProductOptions,
      order
    });
  }

  const handleChangeProductTop = async ( top: number ) => {
    setSalesProductOptions({
      ...salesProductOptions,
      top
    });
  }

  const handleChangeProductYear = async ( year: number ) => {
    setSalesProductOptions({
      ...salesProductOptions,
      year
    });
  }

  const handleChangeProductMonth = async ( month: number ) => {
    setSalesProductOptions({
      ...salesProductOptions,
      month
    });
  }

  const handleChangeUserTop = async ( top: number ) => {
    setTopSalesUser(top);
    const response = await DashboardAPI.salesTopByClient( top );
    if( response?.success ){
      const data = response as SuccessResponseDTO<SalesByUserDTO[]>;
      setSalesDashboard({
        ...salesDashboard,
        topUser: data.content
      });
    }
  }

  const handleChangeYear = async ( year: number ) => {
    setSalesMonthYear(year);
    const response = await DashboardAPI.salesMonthByYear( year );
    if( response?.success ){
      const data = response as SuccessResponseDTO<SalesByMonthDTO[]>;
      setSalesDashboard({
        ...salesDashboard,
        salesByMonth: data.content
      });
    }
  }
  
  const CustomAVGOrderDurationTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const formattedDuration = formatDiasAHoras(payload[0].value);
      return (
        <div className="custom-tooltip bg-white border-2 border-slate-300 p-2">
          <p className="label">{`Distancia: ${label}`}</p>
          <p className={`text-primary `}>{`Promedio de demora: ${formattedDuration}`}</p>
        </div>
      );
    }
  
    return null;
  };

  const CustomSalesMonthTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white border-2 border-slate-300 p-2">
          <p className="label">{`Mes: ${getMonthName(label)}`}</p>
          <p className="desc text-secondary">{`Ganancias: S/.${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };


  return (
    <div className="w-full h-[100vh] p-8 bg-slate-200 flex flex-col items-center gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="flex gap-4 justify-center">
        <ExistsCard
          className="text-success"
          icon={<i className="fa-solid fa-money-bill"></i>}
          title="Ganancias"
          value={salesDashboard.totalSales}
        />
        <ExistsCard
          className="text-slate-800"
          icon={<i className="fa-solid fa-cart-shopping"></i>}
          title="Pedidos"
          value={salesDashboard.orders}
        />
        <ExistsCard
          className="text-danger"
          icon={<i className="fa-solid fa-users"></i>}
          title="Usuarios"
          value={salesDashboard.users}
        />
        <ExistsCard
          className="text-primary"
          icon={<i className="fa-solid fa-couch"></i>}
          title="Productos"
          value={salesDashboard.products}
        />
      </div>
      <div className="flex gap-6 items-center justify-center">
        <div className="flex flex-col gap-4 items-center bg-white p-3 rounded-lg justify-center">
          <div className="flex flex-col gap-2 items-center justify-between w-full">
            <h3 className="text-lg font-semibold">Top { salesProductOptions.top } Productos con { salesProductOptions.order === "DESC" ? "mas" : "menos" } ventas - { salesProductOptions.month }/{ salesProductOptions.year }</h3>
            <div className="flex gap-1">
              <Select
                items={ orderArray }
                label="Orden"
                variant="bordered"
                className="w-[100px]"
                disallowEmptySelection
                size="sm"
                onChange={ e => handleChangeProductOrder(e.target.value as any) }
                defaultSelectedKeys={
                  ["DESC"]
                }
              >
                {(month) => (
                  <SelectItem /* value={month.value}  */key={month.id} textValue={month.value + ""}>
                    {month.value}
                  </SelectItem>
                )}
              </Select>
              <Select
                items={topArray}
                label="Top"
                variant="bordered"
                className="w-[70px]"
                disallowEmptySelection
                size="sm"
                onChange={ e => handleChangeProductTop(parseInt(e.target.value)) }
                defaultSelectedKeys={
                  [5]
                }
              >
                {(top) => (
                  <SelectItem /* value={top.value} */ key={top.id} textValue={top.value + ""}>
                    {top.value}
                  </SelectItem>
                )}
              </Select>
              <Select
                items={yearArray}
                label="Año"
                variant="bordered"
                className="w-[90px]"
                disallowEmptySelection
                size="sm"
                onChange={ e => handleChangeProductYear(parseInt(e.target.value)) }
                defaultSelectedKeys={
                  [2024]
                }
              >
                {(year) => (
                  <SelectItem /* value={year.value}  */key={year.id} textValue={year.value + ""}>
                    {year.value}
                  </SelectItem>
                )}
              </Select>
              <Select
                items={monthArray}
                label="Mes"
                variant="bordered"
                className="w-[70px]"
                disallowEmptySelection
                size="sm"
                onChange={ e => handleChangeProductMonth(parseInt(e.target.value)) }
                defaultSelectedKeys={
                  [7]
                }
              >
                {(month) => (
                  <SelectItem /* value={month.value}  */key={month.id} textValue={month.value + ""}>
                    {month.value}
                  </SelectItem>
                )}
              </Select>
            </div>
          </div>
          <ResponsiveContainer width={700} height={300} className={"-ml-10"}>
            <BarChart
              title="Ventas por producto"
              width={700}
              height={300}
              data={salesDashboard.topProductByYear}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                interval={0}
                dataKey="product"
                tick={<CustomizedAxisTick />}
                className="text-xs"
              />
              <YAxis className="text-xs" />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-4 items-center bg-white p-3 rounded-lg justify-center">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-semibold">Top { topSalesUser } Ventas por cliente</h3>
            <Select
              items={topArray}
              label="Top"
              variant="bordered"
              className="w-[80px]"
              size="sm"
              disallowEmptySelection
              onChange={ e => handleChangeUserTop(parseInt(e.target.value)) }
              defaultSelectedKeys={
                [5]
              }
            >
              {(top) => (
                <SelectItem /* value={top.value}  */key={top.id} textValue={top.value + ""}>
                  {top.value}
                </SelectItem>
              )}
            </Select>
          </div>
          <ResponsiveContainer width={700} height={300} className={"-ml-8"}>
            <BarChart
              title="Top Ventas por cliente"
              width={700}
              height={300}
              data={salesDashboard.topUser}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                interval={0}
                dataKey="client"
                tick={<CustomizedAxisTick />}
                className="text-xs"
              />
              <YAxis className="text-xs" />
              <Tooltip />
              <Legend />
              <Bar dataKey="salesTotal" fill="#b6770bc2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex gap-6 items-center justify-center">
        <div className="flex flex-col gap-4 items-center bg-white p-3 rounded-lg justify-center">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-semibold">Ventas por mes - { salesMonthYear }</h3>
            <Select
              items={yearArray}
              label="Año"
              variant="bordered"
              disallowEmptySelection
              className="w-[90px]"
              size="sm"
              onChange={ e => handleChangeYear(parseInt(e.target.value)) }
              defaultSelectedKeys={
                [2024]
              }
            >
              {(year) => (
                <SelectItem /* value={year.value}  */key={year.id} textValue={year.value + ""}>
                  {year.value}
                </SelectItem>
              )}
            </Select>
          </div>
          <ResponsiveContainer width={700} height={300} className={"-ml-5"}>
            <BarChart
              title="Ventas por cliente"
              width={700}
              height={300}
              data={salesDashboard.salesByMonth}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" includeHidden className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip content={ <CustomSalesMonthTooltip /> }/>
              <Legend  />
              <Bar dataKey="sales" fill="#dfa237e1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-4 items-center bg-white p-3 rounded-lg justify-center">
          <h3 className="text-xl font-semibold">Estado de los Pedidos</h3>
          <ResponsiveContainer width={700} height={300} className={"-ml-10"}>
            <PieChart title="Estado del pedido" width={700} height={300}>
              <Pie
                data={salesDashboard.ordersCountByStatus}
                dataKey="amount"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {salesDashboard.ordersCountByStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.status === "ANULADO"
                        ? "#ff0037"
                        : entry.status === "ENTREGADO"
                        ? "#249424"
                        : entry.status === "PENDING"
                        ? "#7f841e"
                        : "#716e6a"
                    }
                    color="black"
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center bg-white p-3 rounded-lg justify-center">
      <h3 className="text-xl font-semibold">Demora de entrega de Pedido por distancia</h3>
          <ResponsiveContainer width={700} height={300}>
            <BarChart
              title="Promedio de demora de entrega por distancia"
              width={700}
              height={300}
              data={salesDashboard.avgDurationByDistanceRange}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="distanceRange" includeHidden className="text-xs" />
              <YAxis className="text-xs"/>
              <Tooltip content={ <CustomAVGOrderDurationTooltip /> }/>
              <Legend />
              <Bar dataKey="avgDurationInDays" fill="#64430ae3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
    </div>
  );
}
