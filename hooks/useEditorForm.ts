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
  let text = div.textContent || div.innerText || '';
  text = text.replace(/\s+/g, ' ').trim();
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

export function useEditorForm(initialData?: Article) {
  const [state, formAction] = useFormState(submitForm, {
    message: '',
    errors: {} as { [key: string]: string[] }
  });
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [isSlugLocked, setIsSlugLocked] = useState(true)
  const [blogUrl, setBlogUrl] = useState('')
  const [content, setContent] = useState(initialData?.content || '')
  const [publishDate, setPublishDate] = useState<Date | undefined>(initialData ? new Date(initialData.publishDate) : new Date())
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [keywords, setKeywords] = useState<string[]>(initialData?.keywords || [])
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || '')

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
    if (!initialData) {
      const newExcerpt = extractExcerpt(content);
      setExcerpt(newExcerpt);
    }
  }, [content, initialData])

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

  const initializeForm = useCallback((data: Article) => {
    setTitle(data.title);
    setSlug(data.slug);
    setContent(data.content);
    setPublishDate(new Date(data.publishDate));
    setTags(data.tags);
    setKeywords(data.keywords);
    setMetaDescription(data.metaDescription);
    setExcerpt(data.excerpt);
    setFeaturedImage(data.featuredImage);
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
    handleSubmit,
    featuredImage,
    setFeaturedImage,
    initializeForm
  }
}

