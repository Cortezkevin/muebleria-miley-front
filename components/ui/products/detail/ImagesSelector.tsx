import React, { FC } from 'react'
import ZoomImage from './ZoomImage';
import { Image } from '@heroui/image';
import { motion } from 'framer-motion';

interface Props {
  images: string[];
}

export const ImagesSelector: FC<Props> = ({images}) => {
  const [imagesSections, setImagesSections] = React.useState<{ id: number, imgs: string[] }[]>([]);
  const [sectionSelected, setSectionSelected] = React.useState(1);
  const [imageSelected, setImageSelected] = React.useState(images[0]);

  const calculateImageSectionCount = () => {
    let sections = Math.round(images.length / 5);
    if(((sections - images.length / 5) < 5) && images.length % 5 > 0){
      sections += 1;
    }

    const sectionsArray = Array.from({ length: sections }, (_, i) => {
    const start = i * 5;
    const end = start + 5;
    const sectionImages = images.slice(start, end);

      return {
        id: i + 1,
        imgs: sectionImages
      };
    });
    setImagesSections(sectionsArray);
  }

  React.useEffect(() => {
    calculateImageSectionCount();
  },[]);

  return (
    <div className='h-[600px] flex flex-col gap-3'>
      <div>
        <ZoomImage width={450} height={450} src={imageSelected} />
      </div>
      <div className='flex flex-col gap-2    items-center'>
        <div className='flex gap-1'>
          { imagesSections.find(s => s.id == sectionSelected)
            ?.imgs.map(img => (
              <div key={img} className='flex flex-col items-center rounded-lg gap-1'>
                <Image onClick={() => setImageSelected(img)} className='cursor-pointer w-[60px] h-[60px]'  src={img} />
                <div className={`w-[80%] h-[4px] ${imageSelected === img ? 'bg-default-600' : 'bg-transparent'}`}></div>
              </div>
            ))
          }
        </div>
        <div className='flex gap-3 items-center'>
          { imagesSections.map(s => (
            <motion.div 
              onTap={() => setSectionSelected(s.id)} 
              key={s.id}
              initial={{ height: 12, width: 12 }}
              animate={(s.id === sectionSelected) ? { height: 15, width: 15 } : {}}
              className={`bg-default-200 rounded-full cursor-pointer ${(s.id === sectionSelected) && 'bg-default-600'}`}>    
            </motion.div>
          )) }
        </div>
      </div>
    </div>
  )
}
