import express from 'express';
import * as debtors from './debtors';

const apiVersion = process.env.API_VERSION || 'v1';

export default function (app) {
  const router = express.Router();
  router.use(`/api/${apiVersion}/debtors-list`, debtors.getDebtorsList);

  app.use('/', router);
}
