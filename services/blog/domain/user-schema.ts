import { Static, Type } from '@sinclair/typebox';

export const userSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  username: Type.String(),
});

export type createUserDTO = Static<typeof userSchema>;