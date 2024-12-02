'use client'

import { useState, useEffect } from 'react'
import { getUploadedImages, deleteImage, ImageData } from '@/lib/github'
import { useToast } from "@/hooks/use-toast"
import MediaGrid from '@/components/MediaGrid'
import ImagePreviewModal from '@/components/ImagePreviewModal'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

export default function MediaPage() {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    try {
      const fetchedImages = await getUploadedImages()
      setImages(fetchedImages)
    } catch (error) {
      console.error('Failed to fetch images:', error)
      toast({
        title: "Error",
        description: "Failed to fetch images. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePreview = (imageUrl: string) => {
    setPreviewImage(imageUrl)
  }

  const handleDelete = (imagePath: string) => {
    setDeleteConfirmation(imagePath)
  }

  const confirmDelete = async () => {
    if (!deleteConfirmation) return

    try {
      const success = await deleteImage(deleteConfirmation)
      if (success) {
        setImages(images.filter(img => img.path !== deleteConfirmation))
        toast({
          title: "Success",
          description: "Image deleted successfully.",
        })
      } else {
        throw new Error("Failed to delete image")
      }
    } catch (error) {
      console.error('Failed to delete image:', error)
      toast({
        title: "Error",
        description: "Failed to delete image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteConfirmation(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Media Library</h1>
      {loading ? (
        <p className="text-text-muted">Loading images...</p>
      ) : (
        <MediaGrid 
          images={images} 
          onPreview={handlePreview}
          onDelete={handleDelete}
        />
      )}
      <ImagePreviewModal
        isOpen={!!previewImage}
        onClose={() => setPreviewImage(null)}
        imageUrl={previewImage}
      />
      <AlertDialog open={!!deleteConfirmation} onOpenChange={() => setDeleteConfirmation(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this image?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the image from your media library.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

