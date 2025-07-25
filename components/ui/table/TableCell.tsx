import React, { FC } from 'react'
import { DataTableModalProps } from '../admin/DataTable'

export type TableCellRendererProps<T> = {
  item: T
  columnKey: keyof T | 'actions'
  modalProps: DataTableModalProps<T>
  onSelectCell: (item: T) => void
}

export type ConditionalRender<T> = {
  render: (props: TableCellRendererProps<T>) => React.ReactNode
  condition?: {
    predicate: boolean
    alternateRender: React.ReactNode
  }
}

export type TableCellProps<T> = TableCellRendererProps<T> & {
  renderers: Partial<Record<keyof T | 'actions', ConditionalRender<T>>>
}

export type RenderersMap<T> = Partial<Record<keyof T | 'actions', ConditionalRender<T>>>

export const TableCell = <T extends Record<string, any>>({ 
    item,
    columnKey,
    modalProps,
    renderers,
    onSelectCell
}: TableCellProps<T>) => {
  const renderer = renderers[columnKey]

  if (renderer) {
    const props: TableCellRendererProps<T> = {
      item,
      columnKey,
      modalProps,
      onSelectCell
    }

    if (renderer.condition && !renderer.condition.predicate) {
      return <>{renderer.condition.alternateRender}</>
    }

    return <>{renderer.render(props)}</>
  }

  const fallback = item[columnKey]
  return <>{String(fallback)}</>
}
