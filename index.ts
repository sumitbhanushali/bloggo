import express, { Request, Response } from "express";
import { SchemaFieldTypes, createClient } from "redis";
import blogRouter from "./routes/blog.route";
import userRouter from "./routes/user.route";
import { CronJob } from "cron";
import { indexBlogs } from "./utils";

export let app;
export let redisClient;

async function init() {
  app = express();
  app.use(express.json());
  redisClient = await initRedis();
  const indexes = await redisClient.ft._list();
  if (!indexes.includes("idx:blogs")) {
    await redisClient.ft.create(
      "idx:blogs",
      {
        title: {
          type: SchemaFieldTypes.TEXT,
          SORTABLE: true,
        },
        content: SchemaFieldTypes.TEXT,
      },
      {
        ON: "HASH",
        PREFIX: "blog:",
      },
    );
  }
  const job = new CronJob(
    "*/2 * * * *", //run every 2 min
    function () {
      indexBlogs();
    },
    null,
    true,
    "Asia/Kolkata",
  );
}

async function initRedis() {
  return createClient({
    url: process.env.REDIS_URL,
  }).connect();
}

init();

const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use("/blog", blogRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
