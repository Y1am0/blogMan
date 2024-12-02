'use server'

import { formSchema } from '@/lib/formSchema';
import { createOrUpdateFile, deleteArticle } from '@/lib/github';

export async function submitForm(prevState: any, formData: any): Promise<{ message: string; errors?: { [key: string]: string[] } }> {
  try {
    const validatedFields = formSchema.safeParse(formData)

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

    // Check if we're editing an existing article
    const isEditing = formData.originalSlug && formData.originalSlug !== slug;

    // If editing and slug has changed, delete the old file
    if (isEditing) {
      await deleteArticle(formData.originalSlug);
    }

    // Push to GitHub
    const filePath = `articles/${slug}.json`;
    const commitMessage = isEditing ? `Update blog post: ${title}` : `Add blog post: ${title}`;
    const success = await createOrUpdateFile(filePath, jsonContent, commitMessage);

    if (success) {
      return {
        message: isEditing ? 'Your blog post was successfully updated and pushed to GitHub!' : 'Your blog post was successfully created and pushed to GitHub!',
      };
    } else {
      return {
        message: 'There was an error pushing your blog post to GitHub. Please try again.',
        errors: { _form: ['Failed to push to GitHub'] },
      };
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      errors: { _form: ['Unexpected error occurred'] },
    };
  }
}

