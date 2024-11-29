'use client'

import { useState } from 'react'
import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button"
import { HelpCircle } from 'lucide-react'
import HowToUseModal from "@/components/HowToUseModal"

export default function Home() {
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false)

  return (
    <div className={`min-h-screen w-full bg-background-darkest flex flex-col items-center p-12 relative`}>
      <Editor />
      <Button
        onClick={() => setIsHowToUseOpen(true)}
        className={`fixed bottom-4 right-4 bg-primary text-background hover:bg-primary-dark transition-colors duration-200`}
      >
        <HelpCircle className="w-5 h-5 mr-2" />
        How to Use
      </Button>
      <HowToUseModal isOpen={isHowToUseOpen} onClose={() => setIsHowToUseOpen(false)} />
    </div>
  )
}

