import express from 'express'
import { 
    admin, 
    protect 
} from '../middleware/AuthMiddleware.js'
import { 
    authUser, 
    getUserById, 
    getUserProfile, 
    getUsers, 
    registerUser,
    updateUser,
} from '../controllers/UserController.js'

const router = express.Router()

router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers)
router.route('/login')
    .post(authUser)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUser)
router.route('/:id')
    .get(protect, admin, getUserById)

export default router