import { GenericRepository, Repository, User } from '../interfaces/repository';

export const createRepository = (
  genericRepository: GenericRepository
): Repository => ({
  retrieveOneUser: genericRepository.retrieveOne<User>('users'),
  retrieveAllUsers: genericRepository.retrieveAll<User>('users'),
  saveOneUser: genericRepository.saveOne<User>('users'),
  removeOneUser: genericRepository.removeOne<User>('users')
});
