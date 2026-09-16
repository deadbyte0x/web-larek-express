import {Router} from 'express'
import { getProducts, postProducts } from '../controllers/products'

const router = Router()

router.get('/', getProducts )
router.post('/', postProducts )

export default router