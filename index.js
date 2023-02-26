const express = require('express')
require('dotenv').config();
const cors = require('cors')
const{dbConnection}= require('./database/config')


const app = express();

dbConnection();

app.use(cors());

app.use(express.static('public'))
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/social', require('./routes/social'))

app.listen('4000', ()=>{
    console.log("Servidor funcionando en puerto 4000")
})
