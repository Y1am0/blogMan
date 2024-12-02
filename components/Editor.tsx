'use client'

import { useState, useEffect } from 'react'
import PreviewModal from './PreviewModal'
import TitleAndSlugInput from './TitleAndSlugInput'
import { useEditorForm } from '@/hooks/useEditorForm'
import { useFormErrors } from '@/hooks/useFormErrors'
import { ContentEditor } from './ContentEditor'
import { EditorSidebar } from './EditorSidebar'
import MetaDescriptionInput from './MetaDescriptionInput'
import ExcerptInput from './ExcerptInput'
import { AlertCircle } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface EditorProps {
  initialData?: Article
}

export default function Editor({ initialData }: EditorProps) {
  const {
    state,
    title,
    slug,
    isSlugLocked,
    blogUrl,
    content,
    setContent,
    publishDate,
    setPublishDate,
    tags,
    setTags,
    keywords,
    setKeywords,
    metaDescription,
    setMetaDescription,
    excerpt,
    setExcerpt,
    featuredImage,
    setFeaturedImage,
    handleTitleChange,
    handleSlugChange,
    toggleSlugLock,
    handleSlugBlur,
    handleContentChange,
    handleSubmit,
    initializeForm,
    originalSlug,
    isEditing,
    shouldUpdateExcerpt,
    toggleExcerptUpdate
  } = useEditorForm(initialData)

  const { errors, setError, clearError, clearAllErrors, setErrors } = useFormErrors();

  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('visual')

  useEffect(() => {
    if (initialData) {
      initializeForm(initialData)
    }
  }, [initialData, initializeForm])

  useEffect(() => {
    if (state.errors) {
      const newErrors: { [key: string]: string } = {};
      Object.entries(state.errors).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          newErrors[key] = value[0];
        }
      });
      setErrors(newErrors);
    } else {
      clearAllErrors();
    }
  }, [state.errors, setErrors, clearAllErrors]);

  const handlePreview = () => {
    setIsPreviewOpen(true)
  }

  const handleImageUpload = (imageUrl: string) => {
    setFeaturedImage(imageUrl);
    clearError('featuredImage');
  };

  const handleContentChangeWithErrorClearing = (newContent: string) => {
    handleContentChange(newContent);
    if (newContent.trim().length >= 10) {
      clearError('content');
    }
  };

  const handleExcerptChange = (newExcerpt: string) => {
    setExcerpt(newExcerpt);
    if (newExcerpt.trim().length > 0 && newExcerpt.length <= 120) {
      clearError('excerpt');
    }
  };

  const handleTitleChangeWithErrorClearing = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleTitleChange(e);
    if (e.target.value.length >= 5) {
      clearError('title');
      clearError('slug');
    }
  };

  const handleSlugChangeWithErrorClearing = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSlugChange(e);
    if (e.target.value.length > 0) {
      clearError('slug');
    }
  };

  return (
    <>
      <form 
        action={handleSubmit}
        className="flex flex-col w-full h-full space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4"
      >
        <input type="hidden" name="originalSlug" value={originalSlug} />
        <div className="lg:w-2/3 space-y-4">
          <TitleAndSlugInput
            title={title}
            slug={slug}
            isSlugLocked={isSlugLocked}
            blogUrl={blogUrl}
            handleTitleChange={handleTitleChangeWithErrorClearing}
            handleSlugChange={handleSlugChangeWithErrorClearing}
            toggleSlugLock={toggleSlugLock}
            handleSlugBlur={handleSlugBlur}
            titleError={errors.title || null}
            slugError={errors.slug || null}
            isEditing={isEditing}
          />
          <div>
            <ContentEditor
              content={content}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onChange={handleContentChangeWithErrorClearing}
            />
            {errors.content && (
              <div className="flex items-center space-x-1 mt-2">
                <AlertCircle className="w-4 h-4 text-error" />
                <p className="text-error text-sm">{errors.content}</p>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <MetaDescriptionInput
              value={metaDescription}
              onChange={(value) => {
                setMetaDescription(value);
                if (value.length <= 160) {
                  clearError('metaDescription');
                }
              }}
              error={errors.metaDescription || null}
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-update-excerpt"
                checked={shouldUpdateExcerpt}
                onCheckedChange={toggleExcerptUpdate}
              />
              <Label htmlFor="auto-update-excerpt">Auto-update excerpt</Label>
            </div>
            <ExcerptInput
              value={excerpt}
              onChange={handleExcerptChange}
              error={errors.excerpt || null}
            />
          </div>
        </div>
        <EditorSidebar
          publishDate={publishDate}
          setPublishDate={(date) => {
            setPublishDate(date);
            if (date) {
              clearError('publishDate');
            }
          }}
          tags={tags}
          setTags={setTags}
          keywords={keywords}
          setKeywords={setKeywords}
          handlePreview={handlePreview}
          handleImageUpload={handleImageUpload}
          featuredImage={featuredImage}
          setFeaturedImage={(url) => {
            setFeaturedImage(url);
            if (url) {
              clearError('featuredImage');
            }
          }}
          featuredImageError={errors.featuredImage || null}
          formState={state}
        />
      </form>
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={title}
        content={content}
      />
    </>
  )
}

