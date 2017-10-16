const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')

const SERVER_PORT = 6767
const MONGOOSE_SERVER = 'mongodb://localhost/srmvenuemgmt'


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

routes(app)

var db = mongoose.connection

db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.on('open', function () {
  console.log('Connected to mongoose database')
})

app.listen(SERVER_PORT, () => {
  console.log('Server running on port: ' + SERVER_PORT);
  mongoose.connect(MONGOOSE_SERVER, {useMongoClient: true})
})
