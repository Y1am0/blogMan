'use server'

import { Octokit } from "@octokit/rest";

const githubToken = process.env.GITHUB_TOKEN;
const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const branch = process.env.GITHUB_BRANCH || 'content';

const octokit = githubToken ? new Octokit({ auth: githubToken }) : null;

const isGithubConfigured = Boolean(githubToken && owner && repo);

export async function createOrUpdateFile(path: string, content: string, message: string): Promise<boolean> {
  if (!isGithubConfigured) {
    console.warn('GitHub is not configured. File operations will be simulated.');
    return true;
  }

  try {
    const fileExists = await checkFileExists(path);

    if (fileExists) {
      await octokit!.repos.createOrUpdateFileContents({
        owner: owner!,
        repo: repo!,
        path,
        message,
        content: Buffer.from(content).toString('base64'),
        sha: await getFileSha(path),
        branch,
      });
    } else {
      await octokit!.repos.createOrUpdateFileContents({
        owner: owner!,
        repo: repo!,
        path,
        message,
        content: Buffer.from(content).toString('base64'),
        branch,
      });
    }

    return true;
  } catch (error) {
    console.error('Error creating or updating file:', error);
    return false;
  }
}

export async function uploadFile(base64String: string, path: string, mimeType: string): Promise<string | null> {
  if (!isGithubConfigured) {
    console.warn('GitHub is not configured. File upload will be simulated.');
    return `https://example.com/simulated-upload/${path}`;
  }

  try {
    const content = base64String.split(',')[1]; // Remove the data:image/xxx;base64, part
    const message = `Upload file: ${path}`;

    await octokit!.repos.createOrUpdateFileContents({
      owner: owner!,
      repo: repo!,
      path,
      message,
      content,
      branch,
    });

    const fileUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
    return fileUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}

async function checkFileExists(path: string): Promise<boolean> {
  if (!isGithubConfigured) return false;

  try {
    await octokit!.repos.getContent({
      owner: owner!,
      repo: repo!,
      path,
      ref: branch,
    });
    return true;
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return false;
    }
    throw error;
  }
}

async function getFileSha(path: string): Promise<string> {
  if (!isGithubConfigured) throw new Error('GitHub is not configured');

  const { data } = await octokit!.repos.getContent({
    owner: owner!,
    repo: repo!,
    path,
    ref: branch,
  });

  if ('sha' in data) {
    return data.sha;
  }

  throw new Error('Unable to get file SHA');
}

export interface ImageData {
  url: string;
  path: string;
}

export async function getUploadedImages(): Promise<ImageData[]> {
  if (!isGithubConfigured) {
    console.warn('GitHub is not configured. Returning simulated image list.');
    return [
      { url: 'https://example.com/simulated-image-1.jpg', path: 'uploads/simulated-image-1.jpg' },
      { url: 'https://example.com/simulated-image-2.png', path: 'uploads/simulated-image-2.png' },
    ];
  }

  try {
    const { data } = await octokit!.repos.getContent({
      owner: owner!,
      repo: repo!,
      path: 'uploads',
      ref: branch,
    });

    if (Array.isArray(data)) {
      return data
        .filter((item) => item.type === 'file' && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.name))
        .map((item) => ({
          url: item.download_url,
          path: item.path,
        }))
        .filter((item): item is ImageData => item.url !== null && item.path !== null);
    }

    return [];
  } catch (error) {
    console.error('Error fetching uploaded images:', error);
    return [];
  }
}

interface Article {
  title: string;
  slug: string;
  content: string;
  publishDate: string;
  featuredImage: string;
  tags: string[];
  keywords: string[];
  metaDescription: string;
  excerpt: string;
  lastModified: string;
}

export async function getArticles(): Promise<Article[]> {
  if (!isGithubConfigured) {
    console.warn('GitHub is not configured. Returning simulated article list.');
    return [
      { 
        title: 'Sample Article 1', 
        slug: 'sample-article-1', 
        content: '<p>This is the full content of sample article 1...</p>',
        publishDate: '2023-05-01T00:00:00Z',
        featuredImage: 'https://example.com/image1.jpg',
        tags: ['tag1', 'tag2'],
        keywords: ['keyword1', 'keyword2'],
        metaDescription: 'This is a meta description for sample article 1',
        excerpt: 'This is a sample excerpt for the first article...',
        lastModified: '2023-05-01T12:00:00Z',
      },
      { 
        title: 'Sample Article 2', 
        slug: 'sample-article-2', 
        content: '<p>This is the full content of sample article 2...</p>',
        publishDate: '2023-05-02T00:00:00Z',
        featuredImage: 'https://example.com/image2.jpg',
        tags: ['tag2', 'tag3'],
        keywords: ['keyword2', 'keyword3'],
        metaDescription: 'This is a meta description for sample article 2',
        excerpt: 'This is a sample excerpt for the second article...',
        lastModified: '2023-05-02T14:30:00Z',
      },
    ];
  }

  try {
    const { data } = await octokit!.repos.getContent({
      owner: owner!,
      repo: repo!,
      path: 'articles',
      ref: branch,
    });

    if (Array.isArray(data)) {
      const articles = await Promise.all(
        data
          .filter((item) => item.type === 'file' && item.name.endsWith('.json'))
          .map(async (item) => {
            const fileContent = await octokit!.repos.getContent({
              owner: owner!,
              repo: repo!,
              path: item.path,
              ref: branch,
            });

            if ('content' in fileContent.data) {
              const decodedContent = Buffer.from(fileContent.data.content, 'base64').toString('utf-8');
              const articleData = JSON.parse(decodedContent);
              return {
                title: articleData.title,
                slug: articleData.slug,
                content: articleData.content,
                publishDate: articleData.publishDate,
                featuredImage: articleData.featuredImage,
                tags: articleData.tags || [],
                keywords: articleData.keywords || [],
                metaDescription: articleData.metaDescription || '',
                excerpt: articleData.excerpt || 'No excerpt available.',
                lastModified: articleData.lastModified || articleData.publishDate,
              };
            }
            return null;
          })
      );

      return articles.filter((article): article is Article => article !== null);
    }

    return [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function deleteArticle(slug: string): Promise<boolean> {
  if (!isGithubConfigured) {
    console.warn('GitHub is not configured. Article deletion will be simulated.');
    return true;
  }

  try {
    const filePath = `articles/${slug}.json`;
    const { data: fileData } = await octokit!.repos.getContent({
      owner: owner!,
      repo: repo!,
      path: filePath,
      ref: branch,
    });

    if ('sha' in fileData) {
      await octokit!.repos.deleteFile({
        owner: owner!,
        repo: repo!,
        path: filePath,
        message: `Delete article: ${slug}`,
        sha: fileData.sha,
        branch,
      });
      return true;
    } else {
      throw new Error('Unable to get file SHA');
    }
  } catch (error) {
    console.error('Error deleting article:', error);
    return false;
  }
}

export async function deleteImage(path: string): Promise<boolean> {
  if (!isGithubConfigured) {
    console.warn('GitHub is not configured. Image deletion will be simulated.');
    return true;
  }

  try {
    const { data: fileData } = await octokit!.repos.getContent({
      owner: owner!,
      repo: repo!,
      path,
      ref: branch,
    });

    if ('sha' in fileData) {
      await octokit!.repos.deleteFile({
        owner: owner!,
        repo: repo!,
        path,
        message: `Delete image: ${path}`,
        sha: fileData.sha,
        branch,
      });
      return true;
    } else {
      throw new Error('Unable to get file SHA');
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

