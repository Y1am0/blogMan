import React from 'react';
import Image from 'next/image';

interface ArticleThumbnailProps {
  src: string;
  alt: string;
}

const ArticleThumbnail: React.FC<ArticleThumbnailProps> = ({ src, alt }) => {
  return (
    <div className="relative w-24 h-24 flex-shrink-0">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-md"
      />
    </div>
  );
};

export default ArticleThumbnail

