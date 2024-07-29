const express = require('express')
const mongoose = require('mongoose')
const dotEnv = require('dotenv')
const bodyParser = require('body-parser')
const path = require('path')
const ejs = require('ejs')
const cors = require('cors')
const noteController = require('./src/controller/noteController')


const app = express()
app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname,'Public')))
dotEnv.config()

const port=process.env.PORT ||5000

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Sucessfully connected ti Mongo Db")
})
.catch((error)=>{
    console.error("Monog db error",error)
})
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
app.post('/notes',noteController.creatNote)
app.get('/notes',noteController.getNotes)
app.put('/notes',noteController.updateNote)
app.delete('/notes/:id',noteController.deleteNote)

app.listen(port,(req,res)=>{
    console.log("Server is running at the port of 5000")
})