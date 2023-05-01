const mongoose = require('mongoose');
require('dotenv').config()
const {cors} = require('cors')

const connection = mongoose.connect(process.env.mongoUrl)

module.exports = {connection}