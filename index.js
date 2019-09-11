const express = require('express');
const recipes = require('./models/recipes')
const uuidv1 = require('uuid/v1');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();

// Body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // using querystring instead of qs

//Connect to mongoDB
const ATLAS_URI = process.env.ATLAS_URI;

mongoose.connect(ATLAS_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  //when connection succeeds
  console.log('mongoDB connnection worked!');
})

// Routes
app.use('/api/recipes', require('./routes/recipes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))