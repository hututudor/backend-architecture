import jwt from 'jsonwebtoken';

import { User } from '../entities/user/interface';
import { tokenInvalidError } from './errors';

export const createJWT = (user: User): string => {
  return jwt.sign(
    {
      id: user.id
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: 60 * 60 * 24 * 365
    }
  );
};

export const decodeJWT = (token: string): string => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded.id;
  } catch (e) {
    throw tokenInvalidError;
  }
};
