'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { ImageUp, X } from 'lucide-react'

const FeaturedImageUpload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImage(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    multiple: false
  })

  const removeImage = () => {
    setImage(null)
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
    </div>
  )
}

export default FeaturedImageUpload

