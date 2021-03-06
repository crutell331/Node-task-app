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

router.get('/tasks', auth, async (req, res) => {
    //req.query.completed will give you any query forms
    const match = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(404).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValid = updates.every(key => allowedUpdates.includes(key))
    if (!isValid) {
        res.status(400).send({ error: 'Invalid Parameter' })
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id })
        if (!task) {
            res.status(404).send()
        }
        updates.forEach(update => task[update] = req.body[update]);
        task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id })
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router