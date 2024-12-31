import { Router } from 'express';
import { handlerGroq } from '../controllers/groqControllers.js';
import { authenticate } from '../utils/authenticate.js';

const router = Router();

router.get('/', authenticate, handlerGroq);

export default router;