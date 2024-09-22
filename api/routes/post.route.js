import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { createPosts, deletePost, getFeedPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.get('/',protectRoute,getFeedPosts)
router.post('/',protectRoute,createPosts)
router.delete('/delete:id',protectRoute,deletePost)

export default router;