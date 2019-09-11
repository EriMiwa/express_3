const express  = require('express');
// const path =  require('path');
const recipes = require('./models/recipes.js');
const uuid = require('uuid/v1');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// const ATLAS_URI = "mongodb+srv://mitsu_0612:ironmouse807@cluster0-htwos.mongodb.net/test?retryWrites=true&w=majority";
const ATLAS_URI = process.env.ATLAS_URI;

mongoose.connect(ATLAS_URI, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongoDB connection worked!')
})

//Routes
app.use('/api/recipes', require('./routes/recipes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server started at port ${PORT}`));
