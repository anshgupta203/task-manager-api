const express = require('express')
const User = require('./models/user')
require('./db/mongoose')
const Task = require('./models/tasks')
const userRouter = require('./routers/userrouter')
const taskRouter = require('./routers/taskrouter')


const app = express()


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


module.exports = app