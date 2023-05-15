const express = require('express');
const  fileUpload = require('express-fileupload')
const photoRoutes = require('./photos.routes')
const cors = require('cors');
const app = express();

app.use(cors({
    origin:'http://localhost:4100'
}))

app.use(express.static('images/'));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'./archivos'
}))

app.use(photoRoutes)



app.listen(3001);