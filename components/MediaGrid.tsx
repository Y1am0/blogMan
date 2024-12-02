import React from 'react'
import Image from 'next/image'
import { Eye, Trash2 } from 'lucide-react'
import { Button } from './ui/button'

interface ImageData {
  url: string;
  path: string;
}

interface MediaGridProps {
  images: ImageData[]
  onPreview: (imageUrl: string) => void
  onDelete: (imagePath: string) => void
}

const MediaGrid: React.FC<MediaGridProps> = ({ images, onPreview, onDelete }) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-muted text-lg">No images found in the media library.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-square group">
          <Image
            src={image.url}
            alt={`Uploaded image ${index + 1}`}
            fill
            className="object-cover rounded-md"
          />
          <div className="absolute bottom-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => onPreview(image.url)}
              className="w-8 h-8 rounded-full bg-background/80 hover:bg-background"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => onDelete(image.path)}
              className="w-8 h-8 rounded-full bg-background/80 hover:bg-background"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MediaGrid

