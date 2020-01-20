
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'secret')
        const user = await User.findById({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error
        }
        req.user = user
        req.token = token
        next()

    } catch (e) {
        res.status(401).send({ error: 'It\'s Not You!' })
    }
}
module.exports = auth