"use client";
import React, { FC } from 'react'

interface Props {
  selectable?: boolean;
  stars?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const CalificationStars: FC<Props> = ({ selectable = false, stars = 0, size = 'md' }) => {
  
  const [starsCount, setStarsCount] = React.useState<number>(stars);
  
  const handleSelectStar = ( star: number ) => {
    if(selectable){
      setStarsCount(star); 
    }
  }

  return (
    <div className={`flex items-center gap-2 ${selectable ? "cursor-pointer" : ""} text-${size}`}>
      <div className="flex items-center gap-2 text-default-400">
        { 
          [...Array(5)].map((_, index) => (
            <i
              key={index}
              onClick={() => handleSelectStar(index + 1)}
              className={`fa-solid fa-star ${starsCount > index ? "text-default-800" : "text-default-400"}`}
              ></i>
          ))
        }
      </div>
      {
        selectable && (
          <span>{ starsCount === 0 ? `todos` : starsCount > 0 && starsCount < 5 ? `${starsCount} y más` : `5` } </span>
        )
      }
    </div>
  )
}
