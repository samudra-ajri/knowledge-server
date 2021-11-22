import asyncHandler from 'express-async-handler'
import generateToken from '../utils/GenerateToken.js'
import User from '../models/UserModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            ...user._doc,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid credential')
    }
})

// @desc    Register new user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(404)
        throw new Error('email already exists')
    } 
    
    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json(user)
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
        .select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const total = await User.find().countDocuments()

    const users = await User.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ name: 1 })
        .select('-password')
        
    res.json({ total, users })
})

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
        .select('-password')
    
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user
// @route   PUT /api/users/profile
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name   = req.body.name || user.name
        user.email  = req.body.email || user.email
        
        if (req.body.password) user.password = req.body.password

        const updatedUser = await user.save()

        res.json(updatedUser)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    
    if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export { 
    authUser,
    registerUser,
    getUserProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}