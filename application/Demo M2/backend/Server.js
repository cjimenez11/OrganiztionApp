const path = require('path')
const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes/ToDoRoute')

require('dotenv').config()
const cors = require("cors")


const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

mongoose
.connect(process.env.MONGODB_URL)
.then(()=> console.log('Connected to MongoDB...'))
.catch((err)=> console.log(err))

app.use(routes)

app.listen(port, () => console.log('Listening on: 5000'))
