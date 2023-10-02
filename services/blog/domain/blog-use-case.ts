import * as blogRepository from '../data-access/blog-repository';
import { createBlogDTO } from './blog-schema';

export async function createBlog(blog: createBlogDTO) {
  const response = await blogRepository.createBlog(blog);

  return response;
}

export async function deleteBlog(id: number) {
  return await blogRepository.deleteBlog(id);
}

export async function getBlog(id: number) {
  return await blogRepository.getBlogById(id);
}