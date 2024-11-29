import { Button } from './ui/button'
import { CalendarIcon, Eye } from 'lucide-react'
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
}

export function EditorSidebar({ publishDate, setPublishDate, tags, setTags, keywords, setKeywords, handlePreview }: EditorSidebarProps) {
  return (
    <div className="lg:w-1/3 space-y-4 flex flex-col">
      <div className="space-y-4 flex-grow">
        <Label htmlFor="featuredImage" className={`text-sm font-medium text-text-muted`}>
          Featured Image
        </Label>
        <FeaturedImageUpload />
        <div className="flex flex-col space-y-2">
          <Label htmlFor="publishDate" className={`text-sm font-medium text-text-muted`}>
            Publish Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="publishDate"
                variant={"outline"}
                className={cn(
                  `w-full justify-start text-left font-normal bg-background text-text border-border hover:bg-background-dark hover:text-text`,
                  !publishDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {publishDate ? format(publishDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
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
          <Label htmlFor="tags" className={`text-sm font-medium text-text-muted`}>
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
          <Label htmlFor="keywords" className={`text-sm font-medium text-text-muted`}>
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
          className={`w-full bg-background-dark hover:bg-background text-text`}
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <SubmitButton />
      </div>
    </div>
  )
}

