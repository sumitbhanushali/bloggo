import util from 'util';
import express from 'express';
import * as blogUseCase from '../../domain/blog-use-case';

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post('/', async (req, res, next) => {
    try {
      console.log(
        `Blog API was called to create new Blog ${util.inspect(req.body)}`
      );
      const creteBlogResponse = await blogUseCase.createBlog(req.body);
      return res.json(creteBlogResponse);
    } catch (error) {
      next(error);
      return undefined;
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      console.log(`Blog API was called to get Blog by id ${req.params.id}`);
      const response = await blogUseCase.getBlog(
        parseInt(req.params.id, 10)
      );

      if (!response) {
        res.status(404).end();
        return;
      }

      res.json(response);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (req, res) => {
    console.log(`Blog API was called to delete Blog ${req.params.id}`);
    await blogUseCase.deleteBlog(parseInt(req.params.id, 10));
    res.status(204).end();
  });

  expressApp.use('/blog', router);
}