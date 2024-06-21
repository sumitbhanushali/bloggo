import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

router.get("/:id", async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.send(user);
});

router.post("/", async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: req.body,
  });

  res.send(user);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await prisma.user.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.send(`User with id: ${req.params.id} deleted`);
});

export default router;
