import * as commentRepository from '../data-access/comment-repository';
import { createCommentDTO } from './comment-schema';

export async function createComment(blog: createCommentDTO) {
  const response = await commentRepository.createComment(blog);

  return response;
}

export async function deleteComment(id: number) {
  return await commentRepository.deleteComment(id);
}

export async function getComment(id: number) {
  return await commentRepository.getCommentById(id);
}