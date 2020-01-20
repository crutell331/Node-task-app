const express = require('express')
require('./db/mongoose')
const userRouter = require('./controllers/users_controller')
const taskRouter = require('./controllers/tasks_controller')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('up and running')
})

const Task = require('./models/Task')
const User = require('./models/User')

const main = async () => {
    // const task = await Task.findById('5e25b78d289d09f0ad026cc0')
    // await task.populate('user').execPopulate()
    // console.log(task.user)

    const user = await User.findById('5e25b597882002f055f29664')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

// main()