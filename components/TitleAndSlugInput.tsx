import React from 'react'
import { Input } from './ui/input'
import { Lock, Unlock, Link, AlertCircle } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

interface TitleAndSlugInputProps {
  title: string
  slug: string
  isSlugLocked: boolean
  blogUrl: string
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSlugChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  toggleSlugLock: () => void
  handleSlugBlur: () => void
  titleError?: string | null
  slugError?: string | null
}

const TitleAndSlugInput: React.FC<TitleAndSlugInputProps> = ({
  title,
  slug,
  isSlugLocked,
  blogUrl,
  handleTitleChange,
  handleSlugChange,
  toggleSlugLock,
  handleSlugBlur,
  titleError,
  slugError,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Input
          id="title"
          name="title"
          placeholder="Post title"
          value={title}
          onChange={handleTitleChange}
          className={`w-full bg-background text-text border border-border/20 hover:border-border focus:border-border transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 ${titleError ? 'border-error' : ''}`}
        />
        {titleError && (
          <div className="flex items-center space-x-1 mt-1">
            <AlertCircle className="w-4 h-4 text-error" />
            <p className="text-error text-sm">{titleError}</p>
          </div>
        )}
      </div>
      <div>
        <div className="relative flex items-center">
          <Input
            id="slug"
            name="slug"
            placeholder="Slug"
            value={slug}
            onChange={handleSlugChange}
            onBlur={handleSlugBlur}
            disabled={isSlugLocked}
            className={`w-full bg-background text-text border-border/20 focus:border-border transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 pr-20 ${slugError ? 'border-error' : ''}`}
          />
          <div className="absolute right-2 flex space-x-2">
            <button
              type="button"
              onClick={toggleSlugLock}
              className="text-primary hover:text-text transition-colors"
              aria-label={isSlugLocked ? "Unlock slug" : "Lock slug"}
            >
              {isSlugLocked ? <Lock size={16} /> : <Unlock size={16} />}
            </button>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="text-primary hover:text-text transition-colors"
                  aria-label="Preview URL"
                >
                  <Link size={16} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="m-4 bg-background-darkest/60 backdrop-blur-sm text-text border-border">
                <p className="text-sm font-medium">Preview URL:</p>
                {slug ? (
                  <p className="text-sm text-primary break-all">{blogUrl}</p>
                ) : (
                  <p className="text-sm text-text-muted">Add a slug to view the preview URL</p>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {slugError && (
          <div className="flex items-center space-x-1 mt-1">
            <AlertCircle className="w-4 h-4 text-error" />
            <p className="text-error text-sm">{slugError}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TitleAndSlugInput

