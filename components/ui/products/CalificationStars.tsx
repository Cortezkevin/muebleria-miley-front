"use client";
import React, { FC } from 'react'

interface Props {
  stars?: number;
}

export const CalificationStars: FC<Props> = ({ stars = 0 }) => {
  
  const [starsCount, setStarsCount] = React.useState<number>(stars);
  
  return (
    <div className='flex items-center gap-2 -mt-4'>
      <div className="flex items-center gap-2 text-default-400">
        { 
          [...Array(5)].map((_, index) => (
            <i
              key={index}
              onClick={() => setStarsCount(index + 1)}
              className={`fa-solid fa-star ${starsCount > index ? "text-default-800" : "text-default-400"}`}
              ></i>
          ))
        }
      </div>
      <span>{ starsCount === 0 ? `todos` : starsCount > 0 && starsCount < 5 ? `${starsCount} y más` : `5` } </span>
    </div>
  )
}
