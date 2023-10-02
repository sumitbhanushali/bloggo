import { Static, Type } from '@sinclair/typebox';

export const blogSchema = Type.Object({
  title: Type.String(),
  subtitle: Type.String(),
  content: Type.String(),
  authorId: Type.Integer(),
});

export type createBlogDTO = Static<typeof blogSchema>;