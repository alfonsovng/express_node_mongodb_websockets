const mongoose = require('mongoose')
const debug = require('debug')('server:config:database');

require('dotenv').config();

function connectToDatabase() {
    mongoose.connect(process.env.DB_STRING)
    debug('MongoDB connected')
}

module.exports = connectToDatabase
