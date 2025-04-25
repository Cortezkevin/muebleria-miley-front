import React from 'react'

export const SaleSteps = () => {
  return (
    <div className='flex justify-between w-full'>
      <div className='flex items-center gap-5'>
        <i className="text-[50px] text-red-600 fa-solid fa-truck"></i>
        <div className='flex flex-col'>
          <b className='text-xl'>Envio Gratis</b>
          <small className='text-sm'>Pedidos desde los S/1000</small>
        </div>
      </div>
      <div className='flex items-center gap-5'>
        <i className="text-[50px] text-red-600 fa-solid fa-couch"></i>
        <div className='flex flex-col'>
          <b className='text-xl'>Devolución de 90 dias</b>
          <small className='text-sm'>Pedidos desde los S/1000</small>
        </div>
      </div>
      <div className='flex items-center gap-5'>
        <i className="text-[50px] text-red-600 fa-solid fa-wallet"></i>
        <div className='flex flex-col'>
          <b className='text-xl'>Pagos Seguros</b>
          <small className='text-sm'>100% Seguro y </small>
        </div>
      </div>
      <div className='flex items-center gap-5'> 
        <i className="text-[50px] text-red-600 fa-solid fa-headphones"></i>
        <div className='flex flex-col'>
          <b className='text-xl'>Soporte 24/7</b>
          <small className='text-sm'>Soporte dedicado</small>
        </div>
      </div>
    </div>
  )
}
