const express = require('express')
const mongoose = require('mongoose')
const { NoteModel } = require('../Model/Note.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { auth } = require('../MiddelWare/auth')

const noteRoute = express.Router()



noteRoute.post('/create', auth, async (req, res) => {
  try {
    const note = new NoteModel(req.body)
    await note.save()
    res.status(200).json({ 'msg': 'Note added' })
  } catch (err) {
    res.status(500).json({ 'err': err.message })
  }
})

noteRoute.get('/', auth, async (req, res) => {
  try {
    const notes = await NoteModel.find({ authorID: req.body.authorID })
    res.status(200).send(notes)
  } catch (err) {
    res.status(500).json({ "err": err.message })
  }
})

noteRoute.patch('/update/:id', auth, async (req, res) => {
  const { id } = req.params;
  const note = await NoteModel.find({ _id: id })
  try {
    let auth = jwt.decode(req.headers.authorization.split(" ")[1])
    if (auth.authorId !== note.authorID) {
      res.status(400).send({ "msg": "You are not allowed" })
    }
    else {
      await NoteModel.findByIdAndUpdate({ _id: id }, req.body)
      res.status(200).json({ 'msg': `This id:- ${id} note has been Updated!` })
    }

  } catch (err) {
    res.status(500).json({ 'err': err.message })
  }
})

noteRoute.delete('/delete/:id', auth, async (req, res) => {
  const { id } = req.params;
  const note = await NoteModel.find({ _id: id })
  try {
    let auth = jwt.decode(req.headers.authorization.split(" ")[1])
    if (auth.authorId !== note.authorID) {
      res.status(400).send({ "msg": "You are re not allowed" })
    }
    else {
      await NoteModel.findByIdAndDelete({ _id: id })
      res.status(200).json({ 'msg': `This id:- ${id} note has been Deleted!` })
    }

  } catch (err) {
    res.status(500).json({ 'err': err.message })
  }
})
module.exports = { noteRoute }
