import { GenericRepository } from '../interfaces/repository';
import { createRepository } from './repository';

const { Router } = require('express');

export const createRouter = (genericRepository: GenericRepository) => {
  const repository = createRepository(genericRepository);
  const router = Router();

  router.get('/', (req, res) => {
    res.send('hello to my new app');
  });

  router.get('/test', (req, res) => {
    res.send('wow, routing works');
  });

  router.get('/db', async (req, res) => {
    await repository.saveOneUser({
      id: '3',
      name: 'Tudor',
      password: 'asdf',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.send(await repository.retrieveAllUsers());
  });

  return router;
};
