import * as userRepository from '../data-access/user-repository';
import { createUserDTO } from './user-schema';

export async function createUser(user: createUserDTO) {
  const response = await userRepository.createUser(user);

  return response;
}

export async function deleteUser(id: number) {
  return await userRepository.deleteUser(id);
}

export async function getUser(id: number) {
  return await userRepository.getUserById(id);
}