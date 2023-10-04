import { createCommentDTO } from '../domain/comment-schema';
import getDbConnection from "./db-connection";

type CommentInput = {
    id: number;
    authorId: number;
    comment: string;
    blogId: number;
    createdAt: Date;
    updatedAt: Date;
};

const db = getDbConnection();

export async function getCommentById(id: number): Promise<CommentInput | null> {

    const commentInput = await db.comment.findUnique({ where: { id: id } });

    return commentInput;
}

export async function createComment(commentInput: createCommentDTO) {
    const createdComment = await db.comment.create({ data: commentInput })

    return createdComment;
}

export async function deleteComment(id: number) {
    const deleted = await db.comment.delete({ where: { id: id } });

    return deleted;
}

export async function cleanupData() {
    const deleted = await db.comment.deleteMany();
    return deleted;
}