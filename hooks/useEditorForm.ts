import { useState, useEffect, useCallback } from 'react'
import { useFormState } from 'react-dom'
import { submitForm } from '@/app/actions/actions'

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function extractExcerpt(content: string, maxLength: number = 120): string {
  const div = document.createElement('div');
  div.innerHTML = content;
  
  // Replace block-level elements with their text content followed by a space
  const text = div.innerHTML
    .replace(/<\/?(p|div|h[1-6]|ul|ol|li|blockquote)[^>]*>/gi, '\n') // Replace block elements with newlines
    .replace(/<br\s*\/?>/gi, '\n') // Replace <br> tags with newlines
    .replace(/<[^>]+>/g, '') // Remove any remaining HTML tags
    .replace(/\n+/g, ' ') // Replace multiple newlines with a single space
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .trim();

  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

export function useEditorForm(initialData?: Article) {
  const [state, formAction] = useFormState(submitForm, {
    message: '',
    errors: {} as { [key: string]: string[] }
  });
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [originalSlug, setOriginalSlug] = useState(initialData?.slug || '')
  const [isSlugLocked, setIsSlugLocked] = useState(true)
  const [blogUrl, setBlogUrl] = useState('')
  const [content, setContent] = useState(initialData?.content || '')
  const [publishDate, setPublishDate] = useState<Date | undefined>(initialData ? new Date(initialData.publishDate) : new Date())
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [keywords, setKeywords] = useState<string[]>(initialData?.keywords || [])
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || '')
  const [isEditing] = useState(!!initialData)
  const [shouldUpdateExcerpt, setShouldUpdateExcerpt] = useState(true)

  useEffect(() => {
    if (isSlugLocked && !isEditing) {
      setSlug(slugify(title))
    }
  }, [title, isSlugLocked, isEditing])

  useEffect(() => {
    const currentUrl = window.location.origin
    setBlogUrl(`${currentUrl}/blogs/${slug}`)
  }, [slug])

  useEffect(() => {
    if (shouldUpdateExcerpt) {
      const newExcerpt = extractExcerpt(content);
      setExcerpt(newExcerpt);
    }
  }, [content, shouldUpdateExcerpt])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (isSlugLocked && !isEditing) {
      setSlug(slugify(e.target.value))
    }
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value.replace(/[^a-z0-9-]/g, '').replace(/\s+/g, '-')
    setSlug(newSlug)
  }

  const toggleSlugLock = () => {
    setIsSlugLocked(!isSlugLocked)
  }

  const handleSlugBlur = () => {
    setSlug(slugify(slug))
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
  }

  const toggleExcerptUpdate = () => {
    setShouldUpdateExcerpt(!shouldUpdateExcerpt)
  }

  const handleSubmit = async () => {
    const formData = {
      title,
      slug,
      content,
      publishDate: publishDate ? publishDate.toISOString() : '',
      tags,
      keywords,
      metaDescription,
      excerpt,
      featuredImage,
      originalSlug: isEditing ? originalSlug : undefined
    };
    return formAction(formData);
  };

  const initializeForm = useCallback((data: Article) => {
    setTitle(data.title);
    setSlug(data.slug);
    setOriginalSlug(data.slug);
    setContent(data.content);
    setPublishDate(new Date(data.publishDate));
    setTags(data.tags);
    setKeywords(data.keywords);
    setMetaDescription(data.metaDescription);
    setExcerpt(data.excerpt);
    setFeaturedImage(data.featuredImage);
    setIsSlugLocked(true);
    setShouldUpdateExcerpt(true);
  }, []);

  return {
    state,
    formAction,
    title,
    setTitle,
    slug,
    setSlug,
    isSlugLocked,
    setIsSlugLocked,
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
    handleContentChange,
    handleSubmit,
    featuredImage,
    setFeaturedImage,
    initializeForm,
    originalSlug,
    isEditing,
    shouldUpdateExcerpt,
    toggleExcerptUpdate
  }
}

