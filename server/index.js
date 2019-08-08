const env = process.env.NODE_ENV || 'development';
import dotenv from 'dotenv';

if (env === 'development') dotenv.config();

import express from 'express';
import compression from 'compression';

import routes from './routes';

const port = process.env.PORT || 3000,
      app  = express();

app.use(compression());

routes(app);
app.listen(port);

console.log(`Server listening on port ${[port]}`);
