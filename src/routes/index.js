import express from 'express';
const router = express.Router();
import * as estimatorController from '../estimator.js';
import * as estimatorControllerXML from '../estimatorXML.js';
import * as logFile from '../logs.js';

router.post('/api/v1/on-covid-19', estimatorController.covid19ImpactEstimator);
router.post('/api/v1/on-covid-19/json', estimatorController.covid19ImpactEstimator);
router.post('/api/v1/on-covid-19/xml', estimatorControllerXML.covid19ImpactEstimatorXML);
router.get('/api/v1/on-covid-19/logs', logFile.log);

export default router;
