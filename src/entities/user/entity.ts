import {
  User,
  RegisterData,
  RegisterDependencies,
  RegisterReturn,
  LoginDependencies,
  LoginData,
  LoginReturn,
  GetUserDependencies,
  GetUserData,
  RemoveUserDependencies,
  RemoveUserData,
  UpdateUserDependencies,
  UpdateUserData
} from './interface';
import {
  emailOrPasswordIncorrectError,
  userAlreadyExistsError,
  userDoesNotExistsError
} from '../../utils/errors';
import {
  getUserSchema,
  loginSchema,
  registerSchema,
  updateUserSchema
} from './validation';

import { createJWT, decodeJWT } from '../../utils/jwt';
import { compareWithEncrypted, encrypt } from '../../utils/cryptography';
import { validateSchema } from '../../utils/validateSchema';
import { generateUuid } from '../../utils/uuid';

export const sanitizeUser = (user: User): User => {
  const newUser = { ...user };
  delete newUser.password;
  return newUser;
};

export const registerUser = ({
  retrieveOneUserByEmail,
  saveOneUser
}: RegisterDependencies) => async (
  data: RegisterData
): Promise<RegisterReturn> => {
  await validateSchema(registerSchema, data);

  const existingUser = await retrieveOneUserByEmail(data.email);

  if (existingUser) {
    throw userAlreadyExistsError;
  }

  let user: User = {
    id: generateUuid(),
    name: data.name,
    email: data.email,
    password: await encrypt(data.password),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  user = await saveOneUser(user);

  const jwt = createJWT(user);
  return { jwt, user: sanitizeUser(user) };
};

export const loginUser = ({
  retrieveOneUserByEmail
}: LoginDependencies) => async (data: LoginData): Promise<LoginReturn> => {
  await validateSchema(loginSchema, data);

  const user = await retrieveOneUserByEmail(data.email);

  if (!user || !(await compareWithEncrypted(data.password, user.password!))) {
    throw emailOrPasswordIncorrectError;
  }

  const jwt = createJWT(user);
  return { jwt, user: sanitizeUser(user) };
};

export const getUser = ({ retrieveOneUser }: GetUserDependencies) => async (
  data: GetUserData
): Promise<User> => {
  await validateSchema(getUserSchema, data);

  const userId = decodeJWT(data.jwt);
  const user = await retrieveOneUser(userId);

  if (!user) {
    throw userDoesNotExistsError;
  }

  return user;
};

export const removeUser = ({
  retrieveOneUser,
  removeOneUser
}: RemoveUserDependencies) => async (data: RemoveUserData): Promise<User> => {
  const user = await getUser({ retrieveOneUser })(data);

  await removeOneUser(user.id);
  return sanitizeUser(user);
};

export const updateUser = ({
  retrieveOneUser,
  retrieveOneUserByEmail,
  saveOneUser
}: UpdateUserDependencies) => async (data: UpdateUserData): Promise<User> => {
  await validateSchema(updateUserSchema, data);
  const user = await getUser({ retrieveOneUser })(data);

  if (data.name) {
    user.name = data.name;
  }

  if (data.email) {
    const existingUser = await retrieveOneUserByEmail(data.email);

    if (existingUser) {
      throw userAlreadyExistsError;
    }

    user.email = data.email;
  }

  if (data.password) {
    user.password = await encrypt(data.password);
  }

  user.updatedAt = new Date();

  await saveOneUser(user);
  return sanitizeUser(user);
};

export const getUserIfAuth = ({
  retrieveOneUser
}: GetUserDependencies) => async (data: GetUserData) => {
  let user: User | null = null;

  try {
    user = await getUser({ retrieveOneUser })(data);
  } catch (e) {}

  return user;
};
