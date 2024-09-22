import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getSuggestedConnections } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/suggesutions',protectRoute,getSuggestedConnections)

export default router;