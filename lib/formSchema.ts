import * as z from 'zod';

export const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters long' }),
  slug: z.string().min(1, { message: 'Slug is required' }).regex(/^[a-z0-9-]+$/, { 
    message: 'Slug can only contain lowercase letters, numbers, and hyphens' 
  }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters long' }).trim(),
  publishDate: z.string().datetime({ message: 'Invalid date and time' }),
  tags: z.array(z.string()),
  keywords: z.array(z.string()),
  metaDescription: z.string().max(160, { message: 'Meta description should not exceed 160 characters' }),
  excerpt: z.string().min(1, { message: 'Excerpt is required' }).max(120, { message: 'Excerpt should not exceed 120 characters' }),
});

export type FormValues = z.infer<typeof formSchema>;

