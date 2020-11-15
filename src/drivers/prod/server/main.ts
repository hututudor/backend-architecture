import awsServerlessExpress from 'aws-serverless-express';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import { router } from '../../../app/router';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());

app.use('/', router);

const server = awsServerlessExpress.createServer(app);

export const handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
