import { HasID, HasTimestamps } from '../../interfaces/entity';
import { Repository } from '../../interfaces/repository';

export interface User extends HasID, HasTimestamps {
  name: string;
  email: string;
  password?: string;
}

export interface HasToken {
  jwt: string;
}

export interface HasAuth {
  retrieveOneUser: Repository['retrieveOneUser'];
}

export interface RegisterReturn extends HasToken {
  user: User;
}

export interface RegisterDependencies {
  retrieveOneUserByEmail: Repository['retrieveOneUserByEmail'];
  saveOneUser: Repository['saveOneUser'];
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginReturn extends HasToken {
  user: User;
}

export interface LoginDependencies {
  retrieveOneUserByEmail: Repository['retrieveOneUserByEmail'];
}

export interface LoginData {
  email: string;
  password: string;
}

export interface GetUserDependencies extends HasAuth {}

export interface GetUserData extends HasToken {}

export interface RemoveUserData extends HasToken {}

export interface RemoveUserDependencies extends HasAuth {
  retrieveOneUser: Repository['retrieveOneUser'];
  removeOneUser: Repository['removeOneUser'];
}

export interface UpdateUserData extends HasToken {
  name?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserDependencies extends HasAuth {
  saveOneUser: Repository['saveOneUser'];
  retrieveOneUserByEmail: Repository['retrieveOneUserByEmail'];
}
