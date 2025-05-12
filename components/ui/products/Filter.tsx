import { testCategoryData } from '@/utils/data';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { Card, CardBody, CardHeader } from '@heroui/card'
import { CheckboxGroup, Checkbox } from '@heroui/checkbox';
import { Chip } from '@heroui/chip';
import { Divider } from '@heroui/divider';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { CalificationStars } from './CalificationStars';

export const Filter = () => {

  const params = useSearchParams();

  return (
    <Card className="w-full h-full">
      { params.get("category") && 
        <CardHeader>
          <div className='flex flex-col w-full gap-1 px-5 py-4'>
            <h1 className='text-2xl capitalize text-default-500'>{ params.get("category")}</h1>
            { params.get("subcategory") &&
              <h2 className='text-lg font-semibold capitalize'>{ params.get("subcategory")}</h2>
            }
          </div>
        </CardHeader>
      }
      <CardBody className={`flex flex-col gap-4 px-5 ${params.get("category") ? "-mt-2" : "mt-2"}`}>
        <div className='flex flex-col px-4 py-2 border rounded-lg border-slate-400'>
          <div className='flex items-center gap-2 text-lg'>
            <i className="fa-solid fa-truck"></i>
            <p>Envio gratis</p>
          </div>
          <div className='-mt-1'>
            <small className='text-xs'>En productos pequeños desde S/ 99</small>
          </div>
        </div>
        <Divider className='mt-2' />
        <div>
          <Accordion selectionMode="multiple" variant='splitted'>
            {
              params.get("category") 
              ? !params.get("subcategory") 
                ? (
                  <AccordionItem key="3" aria-label="Accordion 3" title="Sub Categoria">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quasi minima facere voluptas perferendis molestias laudantium, sit veniam similique velit? Ipsa tempora iure odio officia doloribus iste dolorem esse ea.
                  </AccordionItem>
                  )
                : (<></>)
              : (
                <AccordionItem key="1" aria-label="Accordion 1" title="Categoria">
                  <div className='flex flex-wrap gap-2 px-2 mb-2 -mt-2'>
                    {
                      testCategoryData.map((category) => (
                        <Chip className='cursor-pointer' key={category.id}>{category.name}</Chip>
                      ))
                    }
                  </div>
                </AccordionItem>
              )
            }
            <AccordionItem key="2" aria-label="Accordion 2" title="Precio">
              <CheckboxGroup defaultValue={["0"]} className='mb-2 -mt-2 ' size='sm'>
                <Checkbox value="0">Hasta S/ 100</Checkbox>
                <Checkbox value="1">100 - 300</Checkbox>
                <Checkbox value="2">300 - 500</Checkbox>
                <Checkbox value="3">500 - 800</Checkbox>
                <Checkbox value="4">desde 800</Checkbox>
              </CheckboxGroup>
            </AccordionItem>
            <AccordionItem key="4" aria-label="Accordion 4" title="Calificación">
              <CalificationStars selectable />
            </AccordionItem>
          </Accordion>
        </div>
      </CardBody>
    </Card>
  )
}
