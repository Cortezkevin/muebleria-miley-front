import React, { FC, JSX } from 'react'

type Props = {
  className?: string;
  title: string;
  value: string | number;
  icon: JSX.Element;
}

export const ExistsCard: FC<Props> = ({ title, value, icon, className = "" }) => {
  return (
    <div className={"flex items-center rounded-2xl bg-white gap-6 py-3 px-6 shadow-sm min-w-[200px] text-[#232322] " + className}>
      <div className='text-[40px]'>
        { icon }
      </div>
      <div className="flex flex-col text-center">
        <p className="text-[50px] font-semibold">{ value }</p>
        <span className="text-semibold">{ title }</span>
      </div>
    </div>
  )
}
