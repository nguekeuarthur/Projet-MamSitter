import { Router } from 'express';

import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Route pour tous les utilisateurs connectés
router.get('/unread/count', authenticate, (req, res) => {
  res.json({ count: 0 });
});

// Route réservée aux Admins (exemple)
router.get('/admin-stats', authenticate, authorize('Admin'), (req, res) => {
  res.json({ message: "Bienvenue, Admin !" });
});

export default router;