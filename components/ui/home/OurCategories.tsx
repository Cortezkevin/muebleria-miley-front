"use client";
import { testCategoryData } from "@/utils/data";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import React from "react"

export const OurCategories = () => {
  return (
    <div className='flex flex-col gap-4 p-4 overflow-hidden h-[500px]'>
      <div className='flex items-center justify-between'>
        <h2 className='flex items-center gap-4 text-2xl font-semibold'>
          <i className="fa-solid fa-layer-group"></i>
          Nuestras Categorias
        </h2>
        <NextLink href={"/categories"} legacyBehavior passHref>
          <Link>Ver más</Link>
        </NextLink>
      </div>
      <div className='flex items-center gap-5'>
        <div className='w-[50%]'>
          <Accordion variant="light" className="w-full h-full overflow-hidden rounded-xl">
            { 
              testCategoryData.map((category) => (
                <AccordionItem
                  key={category.id}
                  aria-label={category.name}
                  /* subtitle="Press to expand" */
                  title={category.name}
                >
                  {category.description}
                </AccordionItem>
              ))
            }
          </Accordion>
        </div>
        <div className='w-[50%] rounded-xl overflow-hidden'>
          <img src="https://images.woodenstreet.de/image/data/Blog%20images/7thapril/2.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}
