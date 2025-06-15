"use client";

import { Button } from "@heroui/button"
import React, { FC } from "react";

interface Props {
  initialValue?: number;
  maxValue?: number;
  minValue?: number;
  onChange?: (newAmout: number) => void;
  onIncreaseCounter?: () => void;
  onDecreaseCounter?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const AmountCounter: FC<Props> = ({ initialValue = 0, maxValue, minValue = 0, size = 'md', onChange, onDecreaseCounter, onIncreaseCounter })  => {

  const [value, setValue] = React.useState( minValue ? minValue : initialValue );

  const handleDecrease = () => {
    const newValue = value - 1;
    const isNotMin = newValue >= minValue;
    if( isNotMin ){
      setValue(newValue);
      onDecreaseCounter && onDecreaseCounter();
    }
  }

  const handleIncrease = () => {
    const newValue = value + 1;
    if( maxValue ){
      const isNotMax = newValue <= maxValue;
      if( isNotMax ){
        setValue(newValue);
        onIncreaseCounter && onIncreaseCounter();
      }
    }else {
      setValue(newValue);
      onIncreaseCounter && onIncreaseCounter();
    }
  }

  React.useEffect(() => {
    onChange && onChange(value);
  }, [value])
  

  return (
    <div className='flex items-center gap-2'>
      <Button onPress={ handleDecrease } size={size} isIconOnly>
        <i className="fa-solid fa-minus"></i>
      </Button>
      <span className={`${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-md'
      }`}>{value}</span>
      <Button onPress={ handleIncrease } size={size} isIconOnly>
        <i className="fa-solid fa-plus"></i>
      </Button>
    </div>
  )
}