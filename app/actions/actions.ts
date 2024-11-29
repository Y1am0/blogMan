'use server'

import { formSchema } from '@/lib/formSchema';

export async function submitForm(prevState: unknown, formData: FormData): Promise<{ message: string; errors?: { [key: string]: string[] } }> {
  const validatedFields = formSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    content: formData.get('content'),
    publishDate: formData.get('publishDate'),
    tags: JSON.parse(formData.get('tags') as string),
    keywords: JSON.parse(formData.get('keywords') as string),
    metaDescription: formData.get('metaDescription'),
    excerpt: formData.get('excerpt'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'There were errors with your submission',
    }
  }

  // Here you would typically save the data to a database
  console.log('Form submitted:', {
    ...validatedFields.data,
    publishDate: new Date(validatedFields.data.publishDate),
  })

  return {
    message: 'Your blog post was created!',
  }
}

