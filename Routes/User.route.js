const express = require('express')
const mongoose = require('mongoose')
const { UserModel } = require('../Model/User.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {cors} = require('cors')



const userRoute = express.Router()

userRoute.post('/ragister', async (req, res) => {
    const { email, pass, name, age } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            const user = new UserModel({ email, name, age, pass: hash })
            user.save()
            res.status(200).json({ 'msg': 'ragister successful' })
        })
    } catch (err) {
        res.status(500).json({ 'err': err.message })
    }
})

userRoute.post('/login', async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            console.log(user)
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({ authorID: user._id, author: user.name}, 'note')
                    res.status(200).json({ 'msg': 'login successfull!', "token": token })
                } else {
                    res.send('Wrong Password')
                }
            })
        } else {
            res.send('Wrong Password')
        }
    } catch (err) {
        res.status(500).json({ 'err': err.message })
    }
})


module.exports = { userRoute }