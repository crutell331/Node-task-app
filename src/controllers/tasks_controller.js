const express = require('express')
const Task = require('../models/Task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task({ ...req.body, user: req.user._id })
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400)
            .send(error)
    }

})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        if (!tasks) {
            res.status(404).send()
        }
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// router.get('/tasks/:id', async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.id)
//         if (!task) {
//             return res.status(404).res.send()
//         }
//         res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.patch('/tasks/:id', async (req, res) => {
//     const allowedUpdates = ['name', 'age', 'email', 'password']
//     const updates = Object.assign(req.body)
//     const isValid = updates.every(key => allowedUpdates.includes(key))
//     if (!isValid) {
//         res.status(400).send({ error: 'Invalid Parameter' })
//     }
//     try {
//         const task = await Task.findById(req.params.id)
//         updates.forEach(update => task[update] = req.body[update]);
//         task.save()
//         // const task = Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//         if (!task) {
//             req.status(404).send()
//         }
//         req.send(task)
//     } catch (e) {
//         req.status(500).send()
//     }
// })


// router.delete('/tasks/:id', async (req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id)
//         console.log("user: ", task)
//         if (!task) {
//             res.status(404).send()
//         }
//         res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
// })


module.exports = router