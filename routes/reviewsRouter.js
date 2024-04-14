import { Router } from 'express';
const router = Router();
import {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  showStats,
} from '../controllers/reviewController.js';
import {
  validateReviewInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';


router
  .route('/')
  .get(getAllReviews)
  .post(checkForTestUser, validateReviewInput, createReview);

router.route('/stats').get(showStats);

router
  .route('/:id')
  .get(validateIdParam, getReview)
  .patch(checkForTestUser, validateReviewInput, validateIdParam, updateReview)
  .delete(checkForTestUser, validateIdParam, deleteReview);

export default router;
