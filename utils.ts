import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { redisClient } from ".";

export async function indexBlogs() {
  console.log("----Indexing Blogs----");
  const blogs = await prisma.blog.findMany();
  for (const blog of blogs) {
    const k = `blog:${blog.id}`;
    await redisClient.HSET(k, "title", blog.title);
    await redisClient.HSET(k, "content", blog.content);
  }
  console.log("----Blogs indexed successfully----");
}
