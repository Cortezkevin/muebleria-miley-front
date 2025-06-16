import React, { ChangeEvent, useEffect, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { InputImage } from '../../commons/InputImage';
import { Image } from '@heroui/image';

interface Props {
  name: string;
}

export const DefaultImagesSelector: React.FC<Props> = ({ name }) => {
  const { setFieldValue, setFieldTouched, errors, touched } = useFormikContext<any>();
  const [field] = useField(name);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.currentTarget.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      setFieldValue(name, filesArray);
      generatePreviews(filesArray);
    }
  };

  const handleBlur = () => {
    setFieldTouched(name, true);
  };

  const generatePreviews = (files: File[]) => {
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const error = touched[name] && errors[name];

  return (
    <div className='w-full'>
      <InputImage
        label="Imágenes"
        multiple
        accept=".jpg,.png,.webp"
        onBlur={handleBlur}
        onChange={handleChange}
        errorMessage={error ? String(error) : undefined}
        isInvalid={!!error}
      />
      {previews.length > 0 && (
        <div style={{ marginTop: '1rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {previews.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`preview-${index}`}
              className='border border-default-400 object-cover'
              width={80}
              height={80}
            />
          ))}
        </div>
      )}
    </div>
  );
};
