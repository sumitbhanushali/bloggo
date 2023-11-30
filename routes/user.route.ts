import express, { Request, Response } from 'express';
const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    res.send('List of users');
});

router.get('/:id', (req: Request, res: Response) => {
    res.send(`User: ${req.params.id} `)
});

router.post('/', (req: Request, res: Response) => {
    res.send(`User created`);
});

router.delete('/:id', (req: Request, res: Response) => {
    res.send(`User with id: ${req.params.id} deleted`);
});

export default router;