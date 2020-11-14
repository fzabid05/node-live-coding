// eslint-disable-next-line prettier/prettier
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import wilderControllers from './controllers/wilder';

mongoose
  .connect('mongodb://127.0.0.1:27017/wilderdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => console.log('Connected to database.'))
  .catch((err) => console.error(err));

const server = express().use(express.json());

const asyncErrorHandler = (callback: Function) => (
  req: Request,
  res: Response,
) => {
  callback(req, res).catch((err: any) => {
    if (err.name === 'MongoError' && err.code === 11000) {
      const error = err.keyPattern.name
        ? 'Name already exists'
        : 'Duplicate field';
      res.status(400).json({ err: error });
    }
    res.status(500).json({ err });
  });
};

server.get('/', (req: Request, res: Response) => {
  res.send('Hello ');
});

server.post('/api/wilders', asyncErrorHandler(wilderControllers.create));
server.get('/api/wilders', asyncErrorHandler(wilderControllers.get));
server.put('/api/wilders/:id', asyncErrorHandler(wilderControllers.update));
server.delete('/api/wilders/:id', asyncErrorHandler(wilderControllers.delete));

server.listen(5000, () => {
  console.log('Server listening on port 5000.');
});
