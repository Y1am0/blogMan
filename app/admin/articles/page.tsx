'use client'

import { useState, useEffect } from 'react'
import { getArticles, deleteArticle } from '@/lib/github'
import ArticleList from '@/components/ArticleList'
import ArticleFilters from '@/components/ArticleFilters'
import { useToast } from "@/hooks/use-toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'date-desc' | 'date-asc'>('date-desc')
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    try {
      setLoading(true)
      const fetchedArticles = await getArticles()
      setArticles(fetchedArticles)
      setFilteredArticles(fetchedArticles)
    } catch (error) {
      console.error('Failed to fetch articles:', error)
      toast({
        title: "Error",
        description: "Failed to fetch articles. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let result = [...articles]

    // Apply search
    if (searchTerm) {
      result = result.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        article.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.publishDate).getTime()
      const dateB = new Date(b.publishDate).getTime()
      return sortOrder === 'date-desc' ? dateB - dateA : dateA - dateB
    })

    setFilteredArticles(result)
  }, [articles, searchTerm, sortOrder])

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const handleSortChange = (value: string) => {
    setSortOrder(value as 'date-desc' | 'date-asc')
  }

  const handleDeleteArticle = async (slug: string) => {
    setDeleteConfirmation(slug)
  }

  const confirmDelete = async () => {
    if (!deleteConfirmation) return

    try {
      const success = await deleteArticle(deleteConfirmation)
      if (success) {
        setArticles(articles.filter(article => article.slug !== deleteConfirmation))
        toast({
          title: "Success",
          description: "Article deleted successfully.",
        })
      } else {
        throw new Error("Failed to delete article")
      }
    } catch (error) {
      console.error('Failed to delete article:', error)
      toast({
        title: "Error",
        description: "Failed to delete article. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteConfirmation(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-4">Articles</h1>
      <ArticleFilters onSearchChange={handleSearchChange} onSortChange={handleSortChange} />
      {loading ? (
        <p className="text-text-muted">Loading articles...</p>
      ) : (
        <ArticleList articles={filteredArticles} onDeleteArticle={handleDeleteArticle} />
      )}
      <AlertDialog open={!!deleteConfirmation} onOpenChange={() => setDeleteConfirmation(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this article?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the article.
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

