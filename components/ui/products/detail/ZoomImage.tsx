import React, { useRef, MouseEvent } from 'react';
import Image from 'next/image'; // o 'react-image' si usas otra lib

interface ZoomImageProps {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}

const ZoomImage: React.FC<ZoomImageProps> = ({
  src,
  width = 300,
  height = 300,
  alt = 'Zoomed image',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imgRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseEnter = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = 'scale(3)'; // Zoom level
    }
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = 'scale(1)';
      imgRef.current.style.transformOrigin = 'center';
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-lg w-full h-full max-h-[1000px] max-w-[1000px]"
      //style={{ width: `${width}px`, height: `${height}px`  }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="transition-transform duration-200 ease-in-out object-cover"
        unoptimized
      />
    </div>
  );
};

export default ZoomImage;
