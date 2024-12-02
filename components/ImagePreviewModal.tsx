import React from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

interface ImagePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string | null
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ isOpen, onClose, imageUrl }) => {
  if (!imageUrl) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="relative w-full h-[80vh]">
          <Image
            src={imageUrl}
            alt="Preview"
            fill
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImagePreviewModal

