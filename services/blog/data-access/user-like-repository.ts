import { createUserLikeDTO } from '../domain/user-like-schema';
import getDbConnection from "./db-connection";

type UserLike = {
    id: number;
    userId: number;
    blogId: number;
    createdAt: Date;
    updatedAt: Date;
};

const db = getDbConnection();

export async function getUserLikeById(id: number): Promise<UserLike | null> {

    const user = await db.userLike.findUnique({ where: { id: id } });

    return user;
}

export async function createUserLike(userLike: createUserLikeDTO) {
    const createdComment = await db.userLike.create({ data: userLike })

    return createdComment;
}

export async function deleteUserLike(id: number) {
    const deleted = await db.userLike.delete({ where: { id: id } });

    return deleted;
}

export async function cleanupData() {
    const deleted = await db.userLike.deleteMany();
    return deleted;
}