export interface User {
  id: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GenericRepository {
  retrieveOne<T>(collection: string): (id: string) => Promise<T>;
  retrieveAll<T>(collection: string): () => Promise<T[]>;
  saveOne<T>(collection: string): (record: T) => Promise<T>;
  removeOne<T>(collection: string): (id: string) => Promise<void>;
}

export interface Repository {
  retrieveOneUser: (id: string) => Promise<User>;
  retrieveAllUsers: () => Promise<User[]>;
  saveOneUser: (user: User) => Promise<User>;
  removeOneUser: (id: string) => Promise<void>;
}
