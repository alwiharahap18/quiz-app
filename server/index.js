const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const multer = require('multer');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000;
const dotenv = require("dotenv");

dotenv.config();

// config
app.use(bodyParser.json());
app.use(cookieParser());
app.use(multer().none());

// middleware
app.use(cors({
    origin: true, //included origin as true
    credentials: true, //included credentials as true
  }))

// Routes import
const quizRoute = require('./Routes/Quiz')
const userRoute = require('./Routes/User')
const participantRoute = require('./Routes/Participant')

app.use(helmet());

app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Embedder-Policy");
  next();
});

// Router
app.use('/api/v1/quiz', quizRoute)
app.use('/api/v1/auth', userRoute)
app.use('/api/v1/part', participantRoute)

// validator 
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({message, data})
})

mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://alwihidayat183:KEsup66AK1Is9K9O@mydatabase.ixghe2w.mongodb.net/?retryWrites=true&w=majority&appName=mydatabase')
  .then(()=> {
    app.listen(port, ()=>{
      console.log(`server is running on port ${port}...`)
    })
  })
  .catch(err => console.log(err))