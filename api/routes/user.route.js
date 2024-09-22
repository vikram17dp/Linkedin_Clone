import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getPublicProfile, getSuggestedConnections } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/suggesutions',protectRoute,getSuggestedConnections)
router.get('/:username',protectRoute,getPublicProfile)

export default router;