'use server'

import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const branch = process.env.GITHUB_BRANCH || 'content';

export async function createOrUpdateFile(path: string, content: string, message: string) {
  try {
    const fileExists = await checkFileExists(path);

    if (fileExists) {
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message,
        content: Buffer.from(content).toString('base64'),
        sha: await getFileSha(path),
        branch,
      });
    } else {
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
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
  try {
    const content = base64String.split(',')[1]; // Remove the data:image/xxx;base64, part
    const message = `Upload file: ${path}`;

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
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
  try {
    await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });
    return true;
  } catch (error) {
    if (error.status === 404) {
      return false;
    }
    throw error;
  }
}

async function getFileSha(path: string): Promise<string> {
  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    path,
    ref: branch,
  });

  if ('sha' in data) {
    return data.sha;
  }

  throw new Error('Unable to get file SHA');
}

export async function getUploadedImages(): Promise<string[]> {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'uploads',
      ref: branch,
    });

    if (Array.isArray(data)) {
      return data
        .filter((item) => item.type === 'file' && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.name))
        .map((item) => item.download_url)
        .filter((url): url is string => url !== null);
    }

    return [];
  } catch (error) {
    console.error('Error fetching uploaded images:', error);
    return [];
  }
}

