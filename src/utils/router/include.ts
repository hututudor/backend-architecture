import { getToken } from './getToken';

export const includeJWT = (req: any) => ({ jwt: getToken(req) });

export const includeId = (req: any) => ({ id: req.params.id });

export const includePagination = (req: any) => ({
  skip: +req.query.skip || 0,
  limit: +req.query.limit || 0
});
