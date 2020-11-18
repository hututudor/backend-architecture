interface Fn {
  (req: any): any;
}

export const restRequest = (fn: Fn) => async (req: any, res: any) => {
  try {
    const result = await fn(req);

    res.status(200).json(result);
  } catch (e) {
    if (e.err_code === undefined) {
      console.error(e);
      res.status(500);
    }

    res.status(e.err_code).json({ message: e.message, payload: e.payload });
  }
};
