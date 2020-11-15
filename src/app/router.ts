const { Router } = require('express');

export const router = Router();

router.get('/', (req, res) => {
  res.send('hello to my new app');
});

router.get('/test', (req, res) => {
  res.send('wow, routing works');
});
