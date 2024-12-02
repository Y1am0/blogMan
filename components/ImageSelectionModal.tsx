import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { getUploadedImages, ImageData } from '@/lib/github'
import SkeletonImageGrid from './SkeletonImageGrid'

interface ImageSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectImage: (imageUrl: string) => void
}

const ImageSelectionModal: React.FC<ImageSelectionModalProps> = ({ isOpen, onClose, onSelectImage }) => {
  const [images, setImages] = useState<ImageData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const imagesPerPage = 6

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true)
      const fetchedImages = await getUploadedImages()
      setImages(fetchedImages)
      setLoading(false)
    }

    if (isOpen) {
      fetchImages()
    }
  }, [isOpen])

  const totalPages = Math.ceil(images.length / imagesPerPage)
  const startIndex = (currentPage - 1) * imagesPerPage
  const endIndex = startIndex + imagesPerPage
  const currentImages = images.slice(startIndex, endIndex)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-[680px] flex flex-col border-border">
        <DialogHeader>
          <DialogTitle>Select an Image</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto p-4">
          {loading ? (
            <SkeletonImageGrid count={imagesPerPage} />
          ) : images.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p>No images found in the upload directory.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {currentImages.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image.url}
                    alt={`Uploaded image ${index + 1}`}
                    fill
                    className="object-cover rounded-md cursor-pointer"
                    onClick={() => onSelectImage(image.url)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center p-4">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='bg-background-darkest text-text hover:bg-background-dark'
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className='bg-background-darkest text-text hover:bg-background-dark'
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImageSelectionModal

