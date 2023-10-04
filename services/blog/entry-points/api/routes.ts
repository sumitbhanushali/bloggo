import util from 'util';
import express from 'express';
import * as blogUseCase from '../../domain/blog-use-case';
import * as commentUseCase from '../../domain/comment-use-case';
import * as userLikeUseCase from '../../domain/user-like-use-case';
import * as userUseCase from '../../domain/user-use-case';

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

  router.post('/comment', async (req, res, next) => {
    try {
      console.log(
        `Blog API was called to create new Comment ${util.inspect(req.body)}`
      );
      const createCommentUseCase = await commentUseCase.createComment(req.body);
      return res.json(createCommentUseCase);
    } catch (error) {
      next(error);
      return undefined;
    }
  });

  router.get('/comment/:id', async (req, res, next) => {
    try {
      console.log(`Blog API was called to get Comment by id ${req.params.id}`);
      const response = await commentUseCase.getComment(
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

  router.delete('/comment/:id', async (req, res) => {
    console.log(`Blog API was called to delete Comment ${req.params.id}`);
    await commentUseCase.deleteComment(parseInt(req.params.id, 10));
    res.status(204).end();
  });

  router.post('/user/', async (req, res, next) => {
    try {
      console.log(
        `Blog API was called to create new User ${util.inspect(req.body)}`
      );
      const creteUserResponse = await userUseCase.createUser(req.body);
      return res.json(creteUserResponse);
    } catch (error) {
      next(error);
      return undefined;
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      console.log(`Blog API was called to get User by id ${req.params.id}`);
      const response = await userUseCase.getUser(
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

  router.delete('/user/:id', async (req, res) => {
    console.log(`Blog API was called to delete User ${req.params.id}`);
    await userUseCase.deleteUser(parseInt(req.params.id, 10));
    res.status(204).end();
  });

  router.post('/userLike/', async (req, res, next) => {
    try {
      console.log(
        `Blog API was called to create new userLike ${util.inspect(req.body)}`
      );
      const creteUserLikeResponse = await userLikeUseCase.createUserLike(req.body);
      return res.json(creteUserLikeResponse);
    } catch (error) {
      next(error);
      return undefined;
    }
  });

  router.get('/userLike/:id', async (req, res, next) => {
    try {
      console.log(`Blog API was called to get userLike by id ${req.params.id}`);
      const response = await userLikeUseCase.getUserLike(
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

  router.delete('/userLike/:id', async (req, res) => {
    console.log(`Blog API was called to delete userLike ${req.params.id}`);
    await userLikeUseCase.deleteUserLike(parseInt(req.params.id, 10));
    res.status(204).end();
  });

  expressApp.use('/blog', router);
}