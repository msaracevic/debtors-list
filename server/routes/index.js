import express from 'express';
import * as debtors from './debtors';

const apiVersion = process.env.API_VERSION || 'v1';

export default function (app) {
  const router = express.Router();
  router.patch(`/api/${apiVersion}/debtors/:id`, debtors.updateDebtor);
  router.use(`/api/${apiVersion}/debtors`, debtors.getDebtors);

  app.use('/', router);
}
