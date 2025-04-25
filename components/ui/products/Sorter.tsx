"use client";
import { Card, CardBody } from '@heroui/card'
import { Pagination } from '@heroui/pagination'
import { Select, SelectItem } from '@heroui/select'
import React from 'react'

const sortOptions = [
  {
    key: "De menor a mayor",
    value: "De menor a mayor"
  },
  {
    key: "De mayor a menor",
    value: "De mayor a menor"
  },
  {
    key: "Recomendados",
    value: "Recomendados"
  },
  {
    key: "Más vendidos",
    value: "Más vendidos"
  },
  {
    key: "Nuevos",
    value: "Nuevos"
  },
  {
    key: "Más valorados",
    value: "Más valorados"
  }
]


export const Sorter = () => {
  return (
    <Card>
      <CardBody className='px-5 py-4'>
        <div className='flex items-center justify-between '>
          <Select
            isRequired
            size='sm'
            variant='underlined'
            className="max-w-xs"
            defaultSelectedKeys={["Recomendados"]}
            label="Ordernar por"
          >
            {sortOptions.map((option, index) => (
              <SelectItem key={option.key}>{option.value}</SelectItem>
            ))}
          </Select>
          <Pagination loop showControls radius="full" color="success" initialPage={1} total={5} />
        </div>
      </CardBody>
    </Card>
  )
}
