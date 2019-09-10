const express  = require('express');
const path =  require('path');
const recipes = require('./models/recipes.js');
const uuid = require('uuid/v1');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/api/recipes', (req, res) => {
    // res.send("Recipe List")
    res.json(recipes);
});

app.post('/api/recipes', (req , res) => {
    const { image_url, name } = req.body;

    const newRecipes = {
        id: uuidv1(),
        image_url: image_url,
        name: name,
    };

    recipes.push(newRecipes);
    res.json({ msg: "new recipe added!"});
});

app.put('/api/recipes', (req , res) => {
    const id = req.body.id;
    const name = req.body.name;
    const image_url = req.body.image_url;

    const index = recipes.findIndex(k => k.id == id);
    recipes[index] = {
        id: id,
        // name: name ? name : recipes[index].name,
        name: name,
        image_url,
    }
    res.json(recipes);
});

app.delete('/api/recipes', (req , res) => {
    const id = req.body.id;

    const index = recipes.findIndex(r => r.id == id);
    recipes.splice(index, 1);
    res.json(recipes);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server started at port ${PORT}`));
