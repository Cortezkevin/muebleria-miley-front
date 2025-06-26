import { Chip, Divider } from '@heroui/react'
import React, { FC } from 'react'

interface Props {
  count: number,
  subtotal: string;
  tax: string;
  discount: string;
  shippingCost: string;
  total: string;
}

export const OrderDetailSummary:FC<Props> = ({ count, subtotal, tax, discount, total, shippingCost }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Resumen de la Compra</h2>
      <div className="flex flex-col px-4 py-6 gap-3">
        <div className="flex justify-between">
          <span className="font-[500] flex gap-3 items-center">
            <i className="fa-solid fa-money-bill"></i>
            <p>Subtotal ({count} items)</p>
          </span>
          <span>S/ {subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-[500] flex gap-3 items-center">
            <i className="fa-solid fa-truck-fast"></i>
            <p>Precio de Envio</p>
          </span>
          <span>{
            parseFloat(subtotal) > 2500 
            ? (
                <Chip color="success" variant="flat">
                  FREE
                </Chip>
            )
            : (
              <span>S/ { shippingCost }</span>
            )
          }</span>
        </div>
        <div className="flex justify-between">
          <span className="font-[500] flex gap-3 items-center">
            <i className="fa-solid fa-percent"></i>
            <p>Impuestos</p>
          </span>
          <span>S/ {tax}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-[500] flex gap-3 items-center">
            <i className="fa-solid fa-tag"></i>
            <p>Descuento</p>
          </span>
          <span>- S/ {discount}</span>
        </div>
        <Divider />
        <div className="flex justify-between">
          <span className="font-[500] flex gap-3 items-center">
            <i className="fa-solid fa-money-bill"></i>
            <p>Total</p>
          </span>
          <span>S/ {total}</span>
        </div>
      </div>
    </div>
  )
}
