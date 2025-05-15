"use client";

import { Button } from "@heroui/button"
import React, { FC } from "react";

interface Props {
  initialValue?: number;
  maxValue?: number;
  minValue?: number;
}

export const AmountCounter: FC<Props> = ({ initialValue = 0, maxValue, minValue = 0 })  => {

  const [value, setValue] = React.useState( minValue ? minValue : initialValue );

  const handleDecrease = () => {
    const newValue = value - 1;
    if(newValue >= minValue ){
      setValue(newValue);
    }
  }

  const handleIncrease = () => {
    const newValue = value + 1;
    if( maxValue ){
      if(newValue <= maxValue ){
        setValue(newValue);
      }
    }else {
      setValue(newValue);
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <Button onPress={ handleDecrease } size='sm' isIconOnly>
        <i className="fa-solid fa-minus"></i>
      </Button>
      {value}
      <Button onPress={ handleIncrease }  size='sm' isIconOnly>
        <i className="fa-solid fa-plus"></i>
      </Button>
    </div>
  )
}