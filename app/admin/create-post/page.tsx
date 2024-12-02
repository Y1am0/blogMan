'use client'

import { useState } from 'react'
import Editor from "@/components/Editor"
import { Button } from "@/components/ui/button"
import { HelpCircle } from 'lucide-react'
import HowToUseModal from "@/components/HowToUseModal"

export default function CreatePost() {
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false)

  return (
    <div className="w-full bg-background flex flex-col items-center relative">
      <Editor />
      <div className="fixed bottom-4 right-4">
        <Button
          onClick={() => setIsHowToUseOpen(true)}
          className="bg-primary text-background hover:bg-primary-dark transition-colors duration-200"
        >
          <HelpCircle className="w-5 h-5 mr-2" />
          How to Use
        </Button>
      </div>
      <HowToUseModal isOpen={isHowToUseOpen} onClose={() => setIsHowToUseOpen(false)} />
    </div>
  )
}

