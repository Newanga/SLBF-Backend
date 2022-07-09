const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    emailConfirmed: {
        type: mongoose.Schema.Types.String,
        default: false,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.String,
        required: true
    }
})

module.exports = mongoose.model('auth', authSchema)