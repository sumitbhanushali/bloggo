import express, { Request, Response } from 'express';
import blogRouter from './routes/blog.route';
import userRouter from './routes/user.route';

const app = express();
app.use(express.json());

const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send("hello world");
})

app.use('/blog', blogRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`listening on ${port}`);
})