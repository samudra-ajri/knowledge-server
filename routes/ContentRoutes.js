import express from 'express'
import { 
    admin, 
    protect 
} from '../middleware/AuthMiddleware.js'
import { 
    getContentById, 
    getContents 
} from '../controllers/ContentController.js'

const router = express.Router()

router.route('/')
    .get(protect, admin, getContents)
router.route('/:id')
    .get(protect, admin, getContentById)

export default router