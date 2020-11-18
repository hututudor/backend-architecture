import bcrypt from 'bcryptjs';

export const encrypt = async (data: string): Promise<string> => {
  return bcrypt.hash(data, 10);
};

export const compareWithEncrypted = async (
  data: string,
  encrypted: string
): Promise<boolean> => {
  return bcrypt.compare(data, encrypted);
};
