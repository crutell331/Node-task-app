const express = require('express')
const User = require('../models/User')

const router = new express.Router()

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }

})

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        return res.status(500)
    }
})

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        console.log(user)
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send()
    }

})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        console.log("user: ", user)
        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) => {
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const updates = Object.keys(req.body)
    //if any of the key return false for the .includes then isValid will be false. Will only be true if every key returns true
    const isValid = updates.every(key => allowedUpdates.includes(key))

    if (!isValid) {
        return res.status(400).send({ error: 'Invalid Request' })
    }
    try {
        const user = await User.findById(req.params.id)
        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {/*returns new user with updated info instead of existing user*/new: true, /*validates information in the body before adding to DB*/runValidators: true })
        if (!user) {
            return res.status(404).res.send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router