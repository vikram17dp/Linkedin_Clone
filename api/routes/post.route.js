import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getFeedPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.get('/',protectRoute,getFeedPosts)

export default router;