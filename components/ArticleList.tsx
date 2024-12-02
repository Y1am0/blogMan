import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import ArticleThumbnail from './ArticleThumbnail'

interface ArticleListProps {
  articles: Article[]
  onDeleteArticle: (slug: string) => void
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onDeleteArticle }) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-muted text-lg">No articles found. Start creating your first article!</p>
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {articles.map((article, index) => (
        <li key={article.slug} className={`${index % 2 === 0 ? 'bg-background' : 'bg-background-dark'} rounded-md`}>
          <div className="flex h-32 items-stretch p-4 transition-colors">
            <ArticleThumbnail src={article.featuredImage} alt={article.title} />
            <div className="flex flex-col justify-between flex-grow ml-4 overflow-hidden">
              <div>
                <Link href={`/admin/articles/${article.slug}`} className="block">
                  <h2 className="text-xl font-semibold text-primary truncate">{article.title}</h2>
                  <p className="text-text-muted text-sm">
                    Published on {format(new Date(article.publishDate), 'MMMM d, yyyy')}
                  </p>
                  <p className="text-text line-clamp-2">{article.excerpt}</p>
                </Link>
              </div>
              <div className="flex flex-wrap items-center mt-1">
                {article.tags.map((tag) => (
                  <span key={tag} className="mr-2 px-2 py-0.5 bg-primary text-background text-xs rounded-full mb-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-start ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteArticle(article.slug)}
                className="text-error hover:bg-error/10 hover:text-error"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ArticleList

