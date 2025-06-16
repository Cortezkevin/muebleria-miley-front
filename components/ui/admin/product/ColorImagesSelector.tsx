import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { FieldArray, useFormikContext, getIn } from 'formik';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { InputImage } from '../../commons/InputImage';
import { Chip } from '@heroui/chip';

import { ColorImagePreview } from './ColorImagePreview';

interface Props {
  name: string;
}

export const ColorImagesSelector: React.FC<Props> = ({ name }) => {
  const { values, setFieldValue, setFieldTouched, errors, touched, validateForm } = useFormikContext<any>();
  const colorImages = (values[name] as { color: string; images: File[] }[]) || [];

  const handleFileChange = (index: number, files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    const newImages = [...colorImages];
    newImages[index].images = fileArray;
    setFieldValue(name, newImages);
  };


  return (
    <FieldArray name={name}>
      {({ push, remove }) => (
        <div className='flex flex-col gap-4 items-center'>
          {colorImages.map((ci, index) => {
            const errorColor = getIn(errors, `${name}[${index}].color`);
            const touchedColor = getIn(touched, `${name}[${index}].color`);

            const errorImages = getIn(errors, `${name}[${index}].images`);
            const touchedImages = getIn(touched, `${name}[${index}].images`);

            const showErrorColor = Boolean(errorColor && touchedColor);
            const showErrorImages = Boolean(errorImages && touchedImages);
            return (
              <div className='flex flex-col gap-2' key={index}>
                <div className='flex gap-2 items-center justify-center w-full'>
                  <Input
                    className='w-[80px] text-xs'
                    label="Color"
                    variant='bordered'
                    value={ci.color}
                    errorMessage={showErrorColor ? String(errorColor) : undefined}
                    isInvalid={showErrorColor}
                    onChange={(e) => {
                      const newColorImages = [...colorImages];
                      newColorImages[index].color = e.target.value;
                      setFieldValue(name, newColorImages);
                    }}
                    onBlur={() => setFieldTouched(`${name}.${index}.color`, true)}
                  />
                  <InputImage
                    label="Imágenes"
                    sizeInput={"sm"}
                    multiple
                    style={{ width: "250px" }}
                    accept=".jpg,.png,.webp"
                    onChange={(e) => handleFileChange(index, e.target.files)}
                    errorMessage={showErrorImages ? String(errorImages) : undefined}
                    isInvalid={showErrorImages}
                  />
                  <Button isIconOnly color="danger" size='lg' onPress={() => remove(index)}>
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </div>
                {ci.images?.length > 0 && (
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {ci.images?.length > 0 && (
                      <ColorImagePreview images={ci.images} />
                    )}
                  </div>
                )}
              </div>
            )
          })}
          <div className='flex flex-col gap-2 px-4 mt-2'>
            <span className='text-sm text-default-500'>Selecciona un color o agrega otro:</span>
            <div className='flex gap-2 items-center'>
              <div className='flex gap-2'>
                {["rojo", "azul", "verde"].filter(color => !colorImages.find(c => c.color === color)).map(c =>
                  <Chip
                    key={c}
                    onClick={async () => {
                      const lastIndex = colorImages.length - 1;
                      if (lastIndex >= 0) {
                        await setFieldTouched(`${name}[${lastIndex}].color`, true);
                        await setFieldTouched(`${name}[${lastIndex}].images`, true);
                        const formErrors = await validateForm();
                        const errorInLast = getIn(formErrors, `${name}[${lastIndex}]`);
                        if (errorInLast?.color || errorInLast?.images) return;
                      }
                      push({ color: c, images: [] });
                    }}
                    className='gap-2 cursor-pointer'>{c}</Chip>
                )}
              </div>
              <Button
                isIconOnly
                size='sm'
                onPress={async () => {
                  const lastIndex = colorImages.length - 1;
                  if (lastIndex >= 0) {
                    await setFieldTouched(`${name}[${lastIndex}].color`, true);
                    await setFieldTouched(`${name}[${lastIndex}].images`, true);
                    const formErrors = await validateForm();
                    const errorInLast = getIn(formErrors, `${name}[${lastIndex}]`);
                    if (errorInLast?.color || errorInLast?.images) return;
                  }
                  push({ color: '', images: [] });
                }}
                color="primary"
                variant="flat"
              >
                <i className="fa-solid fa-plus"></i>
              </Button>
            </div>
          </div>
        </div>
      )}
    </FieldArray>
  );
};
