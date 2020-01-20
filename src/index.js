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