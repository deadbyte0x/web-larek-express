import { Router } from 'express';
import { postOrder } from '../controllers/order';
import { orderRouteValidator } from '../middlewares/validations';

const router = Router();

router.post('/', orderRouteValidator, postOrder);

export default router;
