'use client'

import { useRef, useState } from 'react'
import PreviewModal from './PreviewModal'
import TitleAndSlugInput from './TitleAndSlugInput'
import { useEditorForm } from '@/hooks/useEditorForm'
import { ContentEditor } from './ContentEditor'
import { EditorSidebar } from './EditorSidebar'
import MetaDescriptionInput from './MetaDescriptionInput'
import ExcerptInput from './ExcerptInput'

export default function Editor() {
  const {
    state,
    formAction,
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
    handleTitleChange,
    handleSlugChange,
    toggleSlugLock,
    handleSlugBlur,
  } = useEditorForm()

  const formRef = useRef<HTMLFormElement>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('visual')

  const handlePreview = () => {
    setIsPreviewOpen(true)
  }

  return (
    <>
      <form 
        ref={formRef} 
        action={(formData: FormData) => {
          if (isSlugLocked) {
            formData.set('slug', slug);
          }
          formData.set('publishDate', publishDate?.toISOString() || new Date().toISOString());
          formData.set('tags', JSON.stringify(tags));
          formData.set('keywords', JSON.stringify(keywords));
          formData.set('metaDescription', metaDescription || excerpt);
          formData.set('excerpt', excerpt);
          return formAction(formData);
        }} 
        className="flex flex-col w-full h-full space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4"
      >
        <div className="lg:w-2/3 space-y-4">
          <TitleAndSlugInput
            title={title}
            slug={slug}
            isSlugLocked={isSlugLocked}
            blogUrl={blogUrl}
            handleTitleChange={handleTitleChange}
            handleSlugChange={handleSlugChange}
            toggleSlugLock={toggleSlugLock}
            handleSlugBlur={handleSlugBlur}
            titleError={state.errors?.title?.[0]}
          />
          <ContentEditor
            content={content}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onChange={(newContent) => {
              setContent(newContent)
              if (formRef.current) {
                const hiddenInput = formRef.current.querySelector('input[name="content"]') as HTMLInputElement
                if (hiddenInput) {
                  hiddenInput.value = newContent
                }
              }
            }}
          />
          {state.errors && state.errors.content && (
            <p className={`text-error text-sm mt-1`}>{state.errors.content[0]}</p>
          )}
          <div className="space-y-4">
            <MetaDescriptionInput
              value={metaDescription}
              onChange={setMetaDescription}
            />
            <ExcerptInput
              value={excerpt}
              onChange={setExcerpt}
            />
          </div>
        </div>
        <EditorSidebar
          publishDate={publishDate}
          setPublishDate={setPublishDate}
          tags={tags}
          setTags={setTags}
          keywords={keywords}
          setKeywords={setKeywords}
          handlePreview={handlePreview}
        />
      </form>
      {state.message && (
        <p className={`mt-4 p-4 rounded-md ${
          state.errors && Object.keys(state.errors).length > 0
            ? `border border-error bg-error/10 text-error`
            : `border border-success bg-success/10 text-success`
        }`}>
        {state.message}
      </p>
    )}
    <PreviewModal
      isOpen={isPreviewOpen}
      onClose={() => setIsPreviewOpen(false)}
      title={title}
      content={content}
    />
  </>
  )
}

