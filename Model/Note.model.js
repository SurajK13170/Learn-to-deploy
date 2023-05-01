const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
    author:{type:String, required:true},
    authorID :{type:String, required:true},
    category:{type:String, required:true}
})

const NoteModel = mongoose.model('notes', noteSchema)

module.exports = {NoteModel}