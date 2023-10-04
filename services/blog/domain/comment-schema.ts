import { Static, Type } from '@sinclair/typebox';

export const commentSchema = Type.Object({
  comment: Type.String(),
  authorId: Type.Integer(),
  blogId: Type.Integer(),
});

export type createCommentDTO = Static<typeof commentSchema>;