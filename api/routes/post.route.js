import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { createPosts, getFeedPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.get('/',protectRoute,getFeedPosts)
router.post('/',protectRoute,createPosts)

export default router;