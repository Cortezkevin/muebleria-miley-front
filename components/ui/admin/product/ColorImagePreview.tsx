import React, { useEffect } from 'react';
import { Image } from '@heroui/image';
import { useFilePreviews } from './usePreviewImages';

interface Props {
  images: File[];
}

export const ColorImagePreview: React.FC<Props> = ({ images }) => {
  const previews = useFilePreviews(images);

  useEffect(() => {
    return () => {
      previews.forEach(p => URL.revokeObjectURL(p));
    };
  }, [previews]);

  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {previews.map((preview, i) => (
        <Image
          key={i}
          height={80}
          width={80}
          src={preview}
          className="border border-default-400 object-cover"
        />
      ))}
    </div>
  );
};
