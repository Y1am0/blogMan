import { Input } from './ui/input'
import { Lock, Unlock, Link } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

interface SlugInputProps {
  slug: string
  isSlugLocked: boolean
  blogUrl: string
  handleSlugChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSlugBlur: () => void
  toggleSlugLock: () => void
}

export function SlugInput({
  slug,
  isSlugLocked,
  blogUrl,
  handleSlugChange,
  handleSlugBlur,
  toggleSlugLock
}: SlugInputProps) {
  return (
    <div className="relative flex items-center">
      <Input
        id="slug"
        name="slug"
        placeholder="Slug"
        value={slug}
        onChange={handleSlugChange}
        onBlur={handleSlugBlur}
        disabled={isSlugLocked}
        className={`w-full bg-background text-text border-border focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 pr-20`}
      />
      <div className="absolute right-2 flex space-x-2">
        <button
          type="button"
          onClick={toggleSlugLock}
          className={`text-primary hover:text-text transition-colors`}
          aria-label={isSlugLocked ? "Unlock slug" : "Lock slug"}
        >
          {isSlugLocked ? <Lock size={16} /> : <Unlock size={16} />}
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={`text-primary hover:text-text transition-colors`}
              aria-label="Preview URL"
            >
              <Link size={16} />
            </button>
          </PopoverTrigger>
          <PopoverContent className={`bg-background text-text border-border`}>
            <p className="text-sm font-medium">Preview URL:</p>
            {slug ? (
              <p className={`text-sm text-primary break-all`}>{blogUrl}</p>
            ) : (
              <p className={`text-sm text-text-muted`}>Add a slug to view the preview URL</p>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

