import * as userLikeRepository from '../data-access/user-like-repository';
import { createUserLikeDTO } from './user-like-schema';

export async function createUserLike(userLike: createUserLikeDTO) {
  const response = await userLikeRepository.createUserLike(userLike);

  return response;
}

export async function deleteUserLike(id: number) {
  return await userLikeRepository.deleteUserLike(id);
}

export async function getUserLike(id: number) {
  return await userLikeRepository.getUserLikeById(id);
}