'use server'

import { formSchema } from '@/lib/formSchema';
import { createOrUpdateFile } from '@/lib/github';

export async function submitForm(prevState: any, formData: FormData): Promise<{ message: string; errors?: { [key: string]: string[] } }> {
  const validatedFields = formSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    content: formData.get('content'),
    publishDate: formData.get('publishDate'),
    tags: JSON.parse(formData.get('tags') as string || '[]'),
    keywords: JSON.parse(formData.get('keywords') as string || '[]'),
    metaDescription: formData.get('metaDescription'),
    excerpt: formData.get('excerpt'),
    featuredImage: formData.get('featuredImage'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'There were errors with your submission',
    }
  }

  const { title, slug, content, publishDate, tags, keywords, metaDescription, excerpt, featuredImage } = validatedFields.data;

  // Create JSON content
  const jsonContent = JSON.stringify({
    title,
    slug,
    content,
    publishDate,
    tags,
    keywords,
    metaDescription,
    excerpt,
    featuredImage,
    lastModified: new Date().toISOString(),
  }, null, 2);

  // Push to GitHub
  const filePath = `articles/${slug}.json`;
  const commitMessage = `Add/Update blog post: ${title}`;
  const success = await createOrUpdateFile(filePath, jsonContent, commitMessage);

  if (success) {
    return {
      message: 'Your blog post was successfully created and pushed to GitHub!',
    };
  } else {
    return {
      message: 'There was an error pushing your blog post to GitHub. Please try again.',
    };
  }
}

