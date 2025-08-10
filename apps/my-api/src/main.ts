/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import { formatDate, generateId, capitalize } from '@learning-nx/shared-utils';
import { environment } from './environments/environment';

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowed = environment.allowedOrigins;
    
    // In development, if no origins configured, allow all
    if (!environment.production && allowed.length === 0) {
      return callback(null, true);
    }
    
    // Check if the origin is allowed
    if (allowed.indexOf(origin) !== -1 || allowed.indexOf('*') !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  ...environment.corsOptions
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
