import { createBlogDTO } from "../domain/blog-schema";
import getDbConnection from "./db-connection";

type BlogPost = {
    id: number;
    authorId: number;
    title: string;
    subtitle: string;
    content: string;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
};

const db = getDbConnection();

export async function getBlogById(id: number): Promise<BlogPost | null> {

    const blogPost = await db.blog.findUnique({ where: { id: id } });

    return blogPost;
}

export async function createBlog(blogPost: createBlogDTO) {
    const createdBlog = await db.blog.create({ data: blogPost })

    return createdBlog;
}

export async function deleteBlog(id: number) {
    const deleted = await db.blog.delete({ where: { id: id } });

    return deleted;
}

export async function cleanupData() {
    const deleted = await db.blog.deleteMany();
    return deleted;
}