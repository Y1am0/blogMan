import { Button } from './ui/button'
import { CalendarIcon, Eye, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Label } from "./ui/label"
import FeaturedImageUpload from './FeaturedImageUpload'
import TagInput from './TagInput'
import { SubmitButton } from './SubmitButton'

interface EditorSidebarProps {
  publishDate: Date | undefined
  setPublishDate: (date: Date | undefined) => void
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  keywords: string[]
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>
  handlePreview: () => void
  handleImageUpload: (imageUrl: string) => void
  featuredImage: string
  setFeaturedImage: (url: string) => void
  featuredImageError: string | null
  formState: {
    message: string;
    errors?: { [key: string]: string[] };
  } | null
}

export function EditorSidebar({ 
  publishDate, 
  setPublishDate, 
  tags, 
  setTags, 
  keywords, 
  setKeywords, 
  handlePreview, 
  handleImageUpload,
  featuredImage,
  setFeaturedImage,
  featuredImageError,
  formState
}: EditorSidebarProps) {
  return (
    <div className="lg:w-1/3 space-y-4 flex flex-col">
      <div className="space-y-4 flex-grow">
        <Label htmlFor="featuredImage" className="text-sm font-medium text-text-muted">
          Featured Image
        </Label>
        <FeaturedImageUpload 
          onImageUpload={setFeaturedImage}
          currentImage={featuredImage} 
          error={featuredImageError} 
        />
        <div className="flex flex-col space-y-2">
          <Label htmlFor="publishDate" className="text-sm font-medium text-text-muted">
            Publish Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="publishDate"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-background text-text border-border/20 hover:border-border focus:border-border hover:bg-background-dark hover:text-text",
                  !publishDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-text-muted" />
                <p className='text-text-muted'>{publishDate ? format(publishDate, "PPP") : <span>Pick a date</span>}</p>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border border-border/20" align="center">
              <Calendar
                mode="single"
                selected={publishDate}
                onSelect={setPublishDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="tags" className="text-sm font-medium text-text-muted">
            Tags
          </Label>
          <TagInput
            id="tags"
            tags={tags}
            setTags={setTags}
            placeholder="Add tags..."
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="keywords" className="text-sm font-medium text-text-muted">
            Keywords
          </Label>
          <TagInput
            id="keywords"
            tags={keywords}
            setTags={setKeywords}
            placeholder="Add keywords..."
          />
        </div>
        <Button
          type="button"
          onClick={handlePreview}
          className="w-full bg-background-dark hover:bg-background text-text"
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <SubmitButton />
        {formState?.message && formState.errors && Object.keys(formState.errors).length > 0 && (
          <div className="mt-4 p-4 rounded-md border border-error bg-error/10 flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-error">There were errors with your submission</p>
              <p className="text-sm text-error/80 mt-1 text-pretty">Please review and correct the errors highlighted above.</p>
            </div>
          </div>
        )}
        {formState?.message && !formState.errors && (
          <div className="mt-4 p-4 rounded-md border border-success bg-success/10 flex items-start space-x-2">
            <CheckCircle2 className="w-5 h-5 text-text flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-text">Submission successful</p>
              <p className="text-sm text-text/80 mt-1">{formState.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

