import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
const router = express.Router();
const prisma = new PrismaClient();


router.get('/', async (req: Request, res: Response) => {
    const blogs = await prisma.blog.findMany();
    res.send(blogs);
});

router.get('/:id', async (req: Request, res: Response) => {
    const blog = await prisma.blog.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    })

    res.send(blog);
});

router.post('/', async (req: Request, res: Response) => {
    const createdBlog = await prisma.blog.create({ data: req.body });
    res.send(createdBlog);
});

router.delete('/:id', async (req: Request, res: Response) => {
    await prisma.blog.delete({
        where: {
            id: parseInt(req.params.id),
        },
    })
    res.send(`Blog with id: ${req.params.id} deleted`);
});

export default router