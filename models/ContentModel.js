import mongoose from 'mongoose'

const schema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    image_url: {
        type: String,
    },
    content_type: {
        type: String,
    },
    published_date: {
        type: String,
    },
    elastic: {
        type: Number,
    },
    created_at: {
        type: String,
    },
})

const Content = mongoose.model('Content', schema)

export default Content