'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Editor from "@/components/Editor"
import { Button } from "@/components/ui/button"
import { HelpCircle } from 'lucide-react'
import HowToUseModal from "@/components/HowToUseModal"
import { getArticleBySlug } from '@/lib/github'

export default function EditPost() {
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false)
  const [article, setArticle] = useState<Article | null>(null)
  const { slug } = useParams()

  useEffect(() => {
    const fetchArticle = async () => {
      if (typeof slug === 'string') {
        const fetchedArticle = await getArticleBySlug(slug)
        setArticle(fetchedArticle)
      }
    }
    fetchArticle()
  }, [slug])

  if (!article) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full bg-background flex flex-col items-center relative">
      <Editor initialData={article} />
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

