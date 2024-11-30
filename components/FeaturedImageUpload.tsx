'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { ImageUp, X, FolderOpen } from 'lucide-react'
import { uploadFile } from '@/lib/github'
import { Button } from "@/components/ui/button"
import ImageSelectionModal from './ImageSelectionModal'

interface FeaturedImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const FeaturedImageUpload: React.FC<FeaturedImageUploadProps> = ({ onImageUpload }) => {
  const [image, setImage] = useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setUploadStatus('uploading')
    setErrorMessage(null)

    const path = `uploads/${Date.now()}-${file.name}`
    const reader = new FileReader()
    
    reader.onload = async (event) => {
      const base64String = event.target?.result as string
      const imageUrl = await uploadFile(base64String, path, file.type)

      if (imageUrl) {
        setImage(imageUrl)
        setUploadStatus('success')
        onImageUpload(imageUrl)
      } else {
        setUploadStatus('error')
        setErrorMessage('Failed to upload image. Please try again.')
      }
    }

    reader.readAsDataURL(file)
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    multiple: false
  })

  const removeImage = () => {
    setImage(null)
    setUploadStatus('idle')
    setErrorMessage(null)
    onImageUpload('')
  }

  const handleSelectImage = (imageUrl: string) => {
    setImage(imageUrl)
    setUploadStatus('success')
    onImageUpload(imageUrl)
    setIsSelectionModalOpen(false)
  }

  return (
    <div className="mb-6">
      <div 
        {...getRootProps()} 
        className={`border hover:border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
          ${isDragActive ? `border-primary bg-primary` : `border-border`}
          ${image ? `bg-background` : `bg-background`}`}
      >
        <input {...getInputProps()} />
        {image ? (
          <div className="relative">
            <Image src={image} alt="Featured" width={300} height={200} className="mx-auto rounded-lg" />
            <button 
              onClick={(e) => { e.stopPropagation(); removeImage(); }} 
              className={`absolute top-2 right-2 bg-background-dark bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-opacity`}
            >
              <X className={`w-4 h-4 text-text`} />
            </button>
          </div>
        ) : (
          <div className={`text-text-muted`}>
            <ImageUp className="mx-auto w-12 h-12 mb-2" />
            <p className={`text-text-muted`}>Drag & drop an image here, or click to select one</p>
          </div>
        )}
      </div>
      {uploadStatus === 'uploading' && (
        <p className={`text-text-muted mt-2`}>Uploading image...</p>
      )}
      {uploadStatus === 'success' && (
        <p className={`text-success mt-2`}>Image uploaded successfully!</p>
      )}
      {uploadStatus === 'error' && errorMessage && (
        <p className={`text-error mt-2`}>{errorMessage}</p>
      )}
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsSelectionModalOpen(true);
        }}
        className="mt-4 w-full"
        variant="outline"
      >
        <FolderOpen className="mr-2 h-4 w-4" />
        Choose from uploaded images
      </Button>
      <ImageSelectionModal
        isOpen={isSelectionModalOpen}
        onClose={() => setIsSelectionModalOpen(false)}
        onSelectImage={handleSelectImage}
      />
    </div>
  )
}

export default FeaturedImageUpload

