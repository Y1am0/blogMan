import { useState, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { submitForm } from '@/app/actions/actions'

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
}

function extractExcerpt(content: string, maxLength: number = 120): string {
  const div = document.createElement('div');
  div.innerHTML = content;
  let text = div.textContent || div.innerText || '';
  text = text.replace(/\s+/g, ' ').trim(); // Replace all whitespace (including newlines) with a single space
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

export function useEditorForm() {
  const [state, formAction] = useFormState(submitForm, {
    message: '',
    errors: {} as { [key: string]: string[] }
  });
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [isSlugLocked, setIsSlugLocked] = useState(true)
  const [blogUrl, setBlogUrl] = useState('')
  const [content, setContent] = useState('')
  const [publishDate, setPublishDate] = useState<Date | undefined>(new Date())
  const [tags, setTags] = useState<string[]>([])
  const [keywords, setKeywords] = useState<string[]>([])
  const [metaDescription, setMetaDescription] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')

  useEffect(() => {
    if (isSlugLocked) {
      setSlug(slugify(title))
    }
  }, [title, isSlugLocked])

  useEffect(() => {
    const currentUrl = window.location.origin
    setBlogUrl(`${currentUrl}/blogs/${slug}`)
  }, [slug])

  useEffect(() => {
    const newExcerpt = extractExcerpt(content);
    setExcerpt(newExcerpt);
  }, [content])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
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
      featuredImage
    };
    return formAction(formData);
  };

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
    handleSubmit,
    featuredImage,
    setFeaturedImage
  }
}

