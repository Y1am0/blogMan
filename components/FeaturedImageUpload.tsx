'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { ImageUp, X, FolderOpen, AlertCircle, CheckCircle2 } from 'lucide-react'
import { uploadFile } from '@/lib/github'
import { Button } from "@/components/ui/button"
import ImageSelectionModal from './ImageSelectionModal'

interface FeaturedImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage: string;
  error: string | null;
}

const FeaturedImageUpload: React.FC<FeaturedImageUploadProps> = ({ onImageUpload, currentImage, error }) => {
  const [image, setImage] = useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false)

  useEffect(() => {
    if (currentImage) {
      setImage(currentImage)
      setUploadStatus('success')
    }
  }, [currentImage])

  useEffect(() => {
    if (uploadStatus === 'success') {
      setShowSuccessMessage(true)
      setIsSuccessMessageVisible(true)
      const hideTimer = setTimeout(() => {
        setIsSuccessMessageVisible(false)
      }, 3700) // Start fade out slightly before 4 seconds
      const removeTimer = setTimeout(() => {
        setShowSuccessMessage(false)
      }, 4000) // Remove from DOM after 4 seconds
      return () => {
        clearTimeout(hideTimer)
        clearTimeout(removeTimer)
      }
    }
  }, [uploadStatus])

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

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation()
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
        className={`border hover:border-dashed hover:border-border rounded-lg p-4 text-center cursor-pointer transition-colors relative overflow-hidden
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-border/20'}
          ${image ? 'bg-background' : 'bg-background'}
          ${error ? 'border-error' : ''}
          ${image ? 'h-[200px]' : 'h-auto'}
        `}
      >
        <input {...getInputProps()} />
        {image ? (
          <>
            <Image 
              src={image} 
              alt="Featured" 
              layout="fill" 
              objectFit="cover" 
              className="rounded-lg"
            />
            <button 
              onClick={removeImage} 
              className="absolute top-2 right-2 bg-background-dark bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-opacity z-10"
            >
              <X className="w-4 h-4 text-text" />
            </button>
            {showSuccessMessage && (
              <div 
                className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-success text-background px-4 py-2 rounded-full transition-opacity duration-300 ${
                  isSuccessMessageVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <p className="text-sm font-semibold flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Image added
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-text-muted">
            <ImageUp className="mx-auto w-12 h-12 mb-2" />
            <p className="text-text-muted mb-4">Drag & drop an image here, or click to select one</p>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsSelectionModalOpen(true);
              }}
              className="bg-background-dark hover:bg-primary hover:text-background transition-colors"
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              or choose from uploaded images
            </Button>
          </div>
        )}
      </div>
      {uploadStatus === 'uploading' && (
        <p className="text-text-muted mt-2">Uploading image...</p>
      )}
      {uploadStatus === 'error' && errorMessage && (
        <div className="mt-4 p-4 rounded-md border border-error bg-error/10 flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-error">Upload failed</p>
            <p className="text-sm text-error/80 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 rounded-md border border-error bg-error/10 flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-error">Featured image error</p>
            <p className="text-sm text-error/80 mt-1">{error}</p>
          </div>
        </div>
      )}
      <ImageSelectionModal
        isOpen={isSelectionModalOpen}
        onClose={() => setIsSelectionModalOpen(false)}
        onSelectImage={handleSelectImage}
      />
    </div>
  )
}

export default FeaturedImageUpload

