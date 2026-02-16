import { Router } from 'express';

import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/me', authenticate, (req: any, res) => {
  res.json(req.user);
});

export default router;