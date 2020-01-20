const express = require('express')
const bcrypt = require('bcryptjs')
require('./db/mongoose')
const userRouter = require('./controllers/users_controller')
const taskRouter = require('./controllers/tasks_controller')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.listen(port, () => {
    console.log('up and running')
})
app.use(userRouter)
app.use(taskRouter)

app.get('', (req, res) => res.send('Wassup'))

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({ _id: 'dummy' }, 'secret')
    console.log(token)
    jwt.verify(token, 'secret')
}

myFunction()