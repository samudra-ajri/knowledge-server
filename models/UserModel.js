import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: String,
        required: true,
        default: false
    },
}, {
    timestamps: true
})

schema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

schema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', schema)

export default User