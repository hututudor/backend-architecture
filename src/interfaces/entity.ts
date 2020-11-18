export interface HasID {
  id: string;
}

export interface HasTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface HasPagination {
  skip?: number;
  limit?: number;
}

export interface DatabaseGetById<T> {
  (id: string): Promise<T | null>;
}

export interface DatabaseGetByField<T, F> {
  (field: F): Promise<T | null>;
}

export interface DatabaseGetManyByField<T, F> {
  (field: F, skip?: number, limit?: number): Promise<T[]>;
}

export interface DatabaseSave<T> {
  (model: T): Promise<T>;
}

export interface DatabaseRemove<T> {
  (model: T): void;
}
