export const getToken = (req: any): string => {
  return req.header('x-token') || '';
};
