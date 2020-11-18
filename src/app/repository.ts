import { GenericRepository, Repository } from '../interfaces/repository';
import { User } from '../entities/user/interface';

export const createRepository = (
  genericRepository: GenericRepository
): Repository => ({
  retrieveOneUser: genericRepository.retrieveOne<User>(
    process.env.DB_USERS_TABLE
  ),
  retrieveOneUserByEmail: genericRepository.retrieveOneByFiled<User, string>(
    process.env.DB_USERS_TABLE,
    'email'
  ),
  retrieveAllUsers: genericRepository.retrieveAll<User>(
    process.env.DB_USERS_TABLE
  ),
  saveOneUser: genericRepository.saveOne<User>(process.env.DB_USERS_TABLE),
  removeOneUser: genericRepository.removeOne<User>(process.env.DB_USERS_TABLE)
});
