import asyncHandler from 'express-async-handler'
import Content from '../models/ContentModel.js'


// @desc    Get all contents
// @route   GET /api/contents
// @access  Private/Admin
const getContents = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    
    const total     = await Content.find().countDocuments()
    const contents  = await Content.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ name: 1 })
        
    res.json({ total, contents })
})

// @desc    Get content by id
// @route   GET /api/contents/:id
// @access  Private/Admin
const getContentById = asyncHandler(async (req, res) => {
    const content = await Content.findById(req.params.id)
    if (content) {
        res.json(content)
    } else {
        res.status(404)
        throw new Error('content not found')
    }
})

// @desc    Count contents types
// @route   GET /api/contents/count
// @access  Private/Admin
const countContents = asyncHandler(async (req, res) => {
    const contents = await Content.aggregate([
        { $match: {} },
        { $group: {
            _id: "$content_type",
            total: { $sum: 1 },
            elastic: { $sum: "$elastic" }
        } },
    ])

    const totalContent = await Content.find().countDocuments()
    const totalElastic = await Content.find({ elastic: 1}).countDocuments()
    
    res.json({ contents, totalContent, totalElastic })
})

export { 
    getContents,
    getContentById,
    countContents
}