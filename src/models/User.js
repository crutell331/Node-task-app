const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    age: {
        type: Number,
        default: 0,
        validate(number) {
            if (number < 0) {
                throw new Error('Age must be positive')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(password) {
            if (password.toLowerCase().includes("password")) {
                throw new Error('password cannot include password')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('Email is invalid')
            }
        }
    }
})
//how to create instace methods with mongoose
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({}, 'secret')
}

//create class method for User class
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}




//userSchema.pre or userSchema.post
//pass name of event that you want to do something before and the function you want it to run
userSchema.pre('save', async function (next) {
    const user = this
    console.log("before save")

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    //call next to indicate function is complete. Cant assume completion in the case of async functions for example
    next()
})
const User = mongoose.model('User', userSchema)
module.exports = User