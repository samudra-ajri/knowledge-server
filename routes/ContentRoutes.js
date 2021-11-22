import express from 'express'
import { 
    admin, 
    protect 
} from '../middleware/AuthMiddleware.js'
import { 
    countContents,
    getContentById, 
    getContents 
} from '../controllers/ContentController.js'

const router = express.Router()

router.route('/')
    .get(protect, admin, getContents)
router.route('/count')
    .get(protect, admin, countContents)
router.route('/:id')
    .get(protect, admin, getContentById)

export default router