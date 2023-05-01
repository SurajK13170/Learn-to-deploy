const express = require('express');
const mongoose = require('mongoose')
const {connection} = require('./db')
const {cors} = require('cors')
const {userRoute} = require('./Routes/User.route')
const {noteRoute} = require('./Routes/Note.route')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())
app.use(cors())


app.use('/user', userRoute)
app.use('/note', noteRoute )

app.listen(8000, async()=>{
    try{
        connection
        console.log('connected to DB!')
    }catch(err){
        console.log('can not connect!!')
    }
    console.log('server started!')
})
