import React, { FC } from 'react'
import ZoomImage from './ZoomImage';
import { Image } from '@heroui/image';
import { AnimatePresence, motion } from 'framer-motion';

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
    if (images && images.length > 0) {
      calculateImageSectionCount();
      setImageSelected(images[0]); // Reset a la primera imagen cuando cambian
      setSectionSelected(1); // Reinicia la sección
    }
  }, [images]); 

  return (
    <div className='h-full flex flex-col gap-6'>
      <div>
        <ZoomImage width={1400} height={1400} src={imageSelected} />
      </div>
      <div className='flex flex-col gap-3 items-center'>
        <div className='flex gap-1'>
          { imagesSections.find(s => s.id == sectionSelected)
            ?.imgs.map(img => (
              <div key={img} className='flex flex-col items-center rounded-lg gap-1 h-[70px]'>
                <Image onClick={() => setImageSelected(img)} className='cursor-pointer w-[60px] h-[60px]'  src={img} />
                <AnimatePresence mode="wait">
                  {imageSelected === img && (
                    <motion.div
                      key={img}
                      style={{
                        width: "80%",
                        height: 4,
                      }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-default-600"
                    />
                  )}
                </AnimatePresence>
                  
              </div>
            ))
          }
        </div>
        <div className='flex gap-3 items-center'>
          { imagesSections.map(s => (
            <motion.div 
              onTap={() => setSectionSelected(s.id)} 
              key={s.id}
              initial={{ height: 10, width: 10 }}
              animate={(s.id === sectionSelected) ? { height: 13, width: 13 } : {}}
              className={`bg-default-200 rounded-full cursor-pointer ${(s.id === sectionSelected) && 'bg-default-600'}`}>    
            </motion.div>
          )) }
        </div>
      </div>
    </div>
  )
}