import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getprofileupdate, getPublicProfile, getSuggestedConnections } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/suggesutions',protectRoute,getSuggestedConnections)
router.get('/:username',protectRoute,getPublicProfile)
router.put('/profile',protectRoute,getprofileupdate)

export default router;