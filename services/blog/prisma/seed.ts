import { faker } from '@faker-js/faker';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient()

function createUsers() {
  return {
    name: faker.person.fullName(),
    username: faker.internet.email(),
  }
}

function createBlogs(authors:any) {
  return authors.map((author: any) => {
    return {
      title: faker.lorem.sentence(),
      subtitle: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      authorId: author.id
    }
  });
}

function addComments(blogs: any, authorId: number) {
  return blogs.map((blog: any) => {
    return {
      authorId: authorId,
      comment: faker.lorem.sentence(),
      blogId: blog.id,
    }
  });
}

function addLikes(blogs: any, userId: number) {
  return blogs.map((blog: any) => {
    return {
      userId: userId,
      blogId: blog.id,
    }
  });
}

async function main() {
  //create users
  const authors: any = faker.helpers.multiple(createUsers, {
    count: 5,
  });
  await prisma.user.createMany({data: authors });
  const dbAuthors = await prisma.user.findMany();

  //create blogs
  const blogs = createBlogs(dbAuthors);
  await prisma.blog.createMany({data: blogs});
  const dbBlogs = await prisma.blog.findMany();

  //add comments
  const comments = addComments(dbBlogs, dbAuthors[0].id);
  await prisma.comment.createMany({data: comments});
  const dbComments = await prisma.comment.findMany();

  //add likes
  const likes = addLikes(dbBlogs, dbAuthors[0].id);
  await prisma.userLike.createMany({data: likes});
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })