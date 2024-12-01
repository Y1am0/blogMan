import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

interface ImageGridSkeletonProps {
  count?: number
}

const SkeletonImageGrid: React.FC<ImageGridSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[...Array(count)].map((_, index) => (
        <Skeleton key={index} className="aspect-square w-full h-full bg-background-dark" />
      ))}
    </div>
  )
}

export default SkeletonImageGrid

