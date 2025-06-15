import React, { FC, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage: React.ReactNode;
  isInvalid: boolean | any;
  label: string;
}

export const InputImage: FC<Props> = ({ errorMessage, isInvalid, label, ...props }) => {
  return (
    <div className="flex flex-col gap-1 relative text-[#78787f]">
      <p className={`text-xs absolute left-3 top-2 ${ isInvalid && 'text-[#f31361]'}`}>{ label }</p>
      <input
        { ...props }
        className={`p-2 pt-7 rounded-xl border-2 ${
          isInvalid
            ? "border-[#f31361] text-[#f31361]"
            : "border-[#e4e4e7] hover:border-[#a0a0aa] focus:border-black"
        }`}
        type="file"
      />
      {isInvalid && (
        <small className="text-xs text-[#f31361]">
          {errorMessage}
        </small>
      )}
    </div>
  )
}
