import { GenericRepository } from '../interfaces/repository';
import { createRepository } from './repository';
import { restRequest } from '../utils/router/restRequest';
import { includeJWT } from '../utils/router/include';
import {
  getUser,
  loginUser,
  registerUser,
  removeUser,
  sanitizeUser,
  updateUser
} from '../entities/user/entity';

const { Router } = require('express');

export const createRouter = (genericRepository: GenericRepository) => {
  const repository = createRepository(genericRepository);
  const router = Router();

  router.get('/', (req, res) => {
    res.send('hello to my new app');
  });

  const includeCommonFields = (req: any) => ({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  router.post(
    '/users/register',
    restRequest(async req => {
      return registerUser(repository)(includeCommonFields(req));
    })
  );

  router.post(
    '/users/login',
    restRequest(async req => {
      return loginUser(repository)({
        email: req.body.email,
        password: req.body.password
      });
    })
  );

  router.get(
    '/users/me',
    restRequest(async req => {
      return sanitizeUser(await getUser(repository)(includeJWT(req)));
    })
  );

  router.put(
    '/users',
    restRequest(async req => {
      return updateUser(repository)({
        ...includeJWT(req),
        ...includeCommonFields(req)
      });
    })
  );

  router.delete(
    '/users',
    restRequest(async req => {
      return removeUser(repository)(includeJWT(req));
    })
  );

  return router;
};
