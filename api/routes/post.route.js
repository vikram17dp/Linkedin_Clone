import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { createPosts, deletePost, getFeedPosts,getPostById,CommentPost, likePost } from '../controllers/post.controller.js';

const router = express.Router();

router.get('/',protectRoute,getFeedPosts)
router.post('/create',protectRoute,createPosts)
router.delete('/delete:id',protectRoute,deletePost)
router.get('/:id',protectRoute,getPostById)
router.get('/:id/comment',protectRoute,CommentPost)
router.post('/:id/like',protectRoute,likePost);

export default router;