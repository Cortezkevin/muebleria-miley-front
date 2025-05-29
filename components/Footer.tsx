import React from 'react'

export const Footer = () => {
  return (
    <div className='flex flex-col items-center gap-6 w-full max-w-7xl p-8'>
      <div className='w-full flex justify-around'>
        <div className='flex flex-col gap-4'>
          <span className='font-bold'>Tienda</span>
          <ul className='flex flex-col gap-3 text-sm'>
            <li>Pagina Principal</li>
            <li>Catalogo</li>
            <li>Categorias</li>
            <li>Carrito</li>
          </ul>
        </div>
        <div className='flex flex-col gap-4' >
          <span className='font-bold'>Soporte</span>
          <ul className='flex flex-col gap-3 text-sm'>
            <li>Pedir Ayuda</li>
            <li>Reportar un Problema</li>
          </ul>
        </div>
        <div className='flex flex-col gap-4' >
          <span className='font-bold'>Sobre Nosotros</span>
          <ul className='flex flex-col gap-3 text-sm'>
            <li>Contactanos</li>
            <li>Mas Informacion</li>
          </ul>
        </div>
      </div>
      <div className=''>
        <div className='flex flex-col gap-4'>
          <span className='font-bold'>Redes Sociales</span>
          <ul className='flex gap-4 items-center justify-center'>
            <li><i className="fa-brands fa-facebook cursor-pointer"></i></li>
            <li><i className="fa-brands fa-square-instagram cursor-pointer"></i></li>
            <li><i className="fa-brands fa-tiktok cursor-pointer"></i></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
