import { Router } from 'express';
import { generateShortURL, getAllURLInfo, handleRedirectUrl, handleUrlAnalytics } from '../controllers/shorturlControllers.js';

const router = Router()

router.get('/', getAllURLInfo)

router.post('/get-url', generateShortURL);

router.get('/:uid', handleRedirectUrl);

router.get('/analytics/:uid', handleUrlAnalytics);


export default router;