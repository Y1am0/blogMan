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
import { getUploadedImages } from '@/lib/github'

interface ImageSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectImage: (imageUrl: string) => void
}

const ImageSelectionModal: React.FC<ImageSelectionModalProps> = ({ isOpen, onClose, onSelectImage }) => {
  const [images, setImages] = useState<string[]>([])
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
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Select an Image</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading images...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p>No images found in the upload directory.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4">
              {currentImages.map((imageUrl, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={imageUrl}
                    alt={`Uploaded image ${index + 1}`}
                    fill
                    className="object-cover rounded-md cursor-pointer"
                    onClick={() => onSelectImage(imageUrl)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ImageSelectionModal

