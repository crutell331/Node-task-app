const express = require('express')
const auth = require('../middleware/auth')
const User = require('../models/User')

const router = new express.Router()

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        console.log(user)
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send()
    }

})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        const reqToken = req.token
        req.user.tokens = req.user.tokens.filter(token => token !== reqToken)
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }

})
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
// router.get('/users', async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (e) {
//         console.log(e)
//         res.status(500).send(e)
//     }

// })

// router.get('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         return res.status(500)
//     }
// })



router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const updates = Object.keys(req.body)
    const isValid = updates.every(key => allowedUpdates.includes(key))

    if (!isValid) {
        return res.status(400).send({ error: 'Invalid Request' })
    }
    try {
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router