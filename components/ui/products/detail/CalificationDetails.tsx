import React from 'react'
import { CalificationStars } from '../CalificationStars'

export const CalificationDetails = () => {
  return (
    <div className='w-full flex gap-6 items-center justify-arround'>
      <div className='flex flex-col gap-1 items-center'>
          <div className='flex items-center gap-1'>
            <span className='text-[40px] font-semibold'>4.4</span>
            <span className='text-2xl text-default-500 mt-3'>/5</span>
          </div>
          <CalificationStars stars={5} />
          <span>350 comentarios</span>
      </div>
      <div className='text-md'>
        <div className='flex items-center gap-2'>
          <span>5 <i className={`text-xs fa-solid fa-star`}/></span>
          <div className='w-[300px] relative bg-default-400 h-1 rounded-xl'>
            <div className='absolute bg-default-700 w-[80%] h-full'> </div>
          </div>
          <span>200</span>
        </div>
        <div className='flex items-center gap-2'>
          <span>4 <i className={`text-xs fa-solid fa-star`}/></span>
          <div className='w-[300px] relative bg-default-400 h-1 rounded-xl'>
            <div className='absolute bg-default-700 w-[25%] h-full'> </div>
          </div>
          <span>10</span>
        </div>
        <div className='flex items-center gap-2'>
          <span>3 <i className={`text-xs fa-solid fa-star`}/></span>
          <div className='w-[300px] relative bg-default-400 h-1 rounded-xl'>
            <div className='absolute bg-default-700 w-[10%] h-full'> </div>
          </div>
          <span>50</span>
        </div>
        <div className='flex items-center gap-2'>
          <span>2 <i className={`text-xs fa-solid fa-star`}/></span>
          <div className='w-[300px] relative bg-default-400 h-1 rounded-xl'>
            <div className='absolute bg-default-700 w-[50%] h-full'> </div>
          </div>
          <span>5</span>
        </div>
        <div className='flex items-center gap-2'>
          <span>1 <i className={`text-xs fa-solid fa-star`}/></span>
          <div className='w-[300px] relative bg-default-400 h-1 rounded-xl'>
            <div className='absolute bg-default-700 w-[50%] h-full'> </div>
          </div>
          <span>100</span>
        </div>
      </div>
    </div>
  )
}
