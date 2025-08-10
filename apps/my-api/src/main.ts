/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import { formatDate, generateId, capitalize } from '@learning-nx/shared-utils';

const app = express();

// Enable CORS for the frontend
app.use(cors({
  // TODO: change to the actual frontend URL and make it production ready
  origin: 'http://localhost:4200' // Frontend URL
}));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ 
    message: 'Welcome to my-api!',
    id: generateId(),
    date: formatDate(new Date()),
    greeting: capitalize('hello from shared utils!')
  });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
