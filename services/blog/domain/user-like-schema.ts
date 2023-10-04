import { Static, Type } from '@sinclair/typebox';

export const userLikeSchema = Type.Object({
  userId: Type.Integer(),
  blogId: Type.Integer(),
});

export type createUserLikeDTO = Static<typeof userLikeSchema>;