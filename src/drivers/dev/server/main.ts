import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { createRouter } from '../../../app/router';
import { initDatabase, mongoGenericRepository } from '../repository/mongo';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/', createRouter(mongoGenericRepository));

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Listening on http://localhost:${PORT}`);

  await initDatabase(() => {
    console.log('Connected to DB');
  });
});
