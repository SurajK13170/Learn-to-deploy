const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    age:{type:Number, required:true},
    email:{type:String, required:true},
    pass:{type:String, required:true}
})

const UserModel = mongoose.model('Noteuser', userSchema)

module.exports = {UserModel}