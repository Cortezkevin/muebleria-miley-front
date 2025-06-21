import { Button } from '@heroui/button';
import React, { FC, InputHTMLAttributes, useRef, useState } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: React.ReactNode;
  isInvalid?: boolean | any;
  label: string;
  sizeInput?: 'sm' | 'md' | 'lg';
}

export const InputImage: FC<Props> = ({ errorMessage, isInvalid, label, multiple, sizeInput = "md", ...props }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>('Seleccionar archivo');

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedLabel(
        multiple
          ? `${files.length} archivo(s) seleccionado(s)`
          : files[0]?.name || 'Seleccionar archivo'
      );

      // Ejecutar callback si se pasó
      if (props.onChange) {
        props.onChange(e);
      }
    }
  };

  return (
    <div className="flex flex-col gap-[1px] relative text-default-600">
      {/* Label flotante */}
      {
        sizeInput !== "sm" && <p className={`text-xs absolute left-3 top-2 ${isInvalid ? 'text-[#f31361]' : ''}`}>
          {label}
        </p>
      }

      {/* Contenedor con borde */}
      <div
        style={ props.style }
        className={`rounded-xl border-2 ${sizeInput === "sm" ? "text-xs py-2" : "text-md pt-6"} p-2 cursor-pointer transition-all duration-150 ${
          isInvalid
            ? 'border-[#f31361] text-[#f31361]'
            : 'border-default-200 hover:border-default-400 focus-within:border-black'
        }`}
        onClick={handleClick}
      >
        <Button size={sizeInput} className={`text-left w-full ${sizeInput === "sm" ? "h-[30px]" : "h-8"}`} onPress={handleClick}>
          {selectedLabel}
        </Button>
      </div>

      {/* Input oculto */}
      <input
        {...props}
        ref={fileInputRef}
        onChange={handleChange}
        type="file"
        multiple={multiple}
        className="hidden"
      />

      {/* Mensaje de error */}
      {isInvalid && errorMessage && (
        <small className="text-xs text-[#f31361] mt-1">{errorMessage}</small>
      )}
    </div>
  );
};
