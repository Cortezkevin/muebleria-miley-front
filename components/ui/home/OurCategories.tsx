"use client";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import React, { useEffect, useState } from "react"
import { ShopContext } from "@/context/shop";
import { useContext } from "react";
import { Image } from "@heroui/image";
import { CategoryDTO } from "@/types";

export const OurCategories = () => {
  const { categories } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDTO | undefined>(undefined);
  console.log(categories)

  useEffect(() => {
    if(categories.data){
      setSelectedCategory(categories.data[0]);

    }
  }, [categories.data])
  

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
          {
            categories.data
            ?  <Accordion variant="light" className="w-full h-full overflow-hidden rounded-xl">
                {
                  categories.data.slice(0,5).map((category) => (
                    <AccordionItem
                      key={category.id}
                      aria-label={category.name}
                      /* subtitle="Press to expand" */
                      onPress={() => setSelectedCategory(category)}
                      title={category.name}
                    >
                      {category.description}
                    </AccordionItem>
                  ))
                }
              </Accordion>
            : <span>Loading...</span>
          }
        </div>
        <div className='w-[50%] rounded-xl overflow-hidden'>
          { selectedCategory !== undefined && <Image className="object-cover" width={550} height={350} src={selectedCategory.url_image} alt={selectedCategory.name} /> }
        </div>
      </div>
    </div>
  )
}
