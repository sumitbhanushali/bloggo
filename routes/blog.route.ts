import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('List of blogs');
});

router.get('/:id', (req: Request, res: Response) => {
    res.send(`Blog: ${req.params.id} `)
});

router.post('/', (req: Request, res: Response) => {
    res.send(`Blog created`);
});

router.delete('/:id', (req: Request, res: Response) => {
    res.send(`Blog with id: ${req.params.id} deleted`);
});

export default router;