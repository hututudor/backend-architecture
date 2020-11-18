import * as yup from 'yup';
import { validationFailed } from './errors';

export const validateSchema = async (schema: yup.Schema<any>, data: any) => {
  try {
    await schema.validate(data);
  } catch (e) {
    throw validationFailed(e.errors[0]);
  }
};
