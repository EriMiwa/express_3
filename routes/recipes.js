const express = require('express');
const router = express.Router();

let Recipes = require('../models/recipes.mongo');

router.get('/', (req, res) => {
  //promise
  Recipes.find()
  .then((recipes) => res.json(recipes))
  .catch(err => res.status(400).send(`Error on getting recipes: ${err}`));

  //Status 200 means success
  //Status 400 means error
});

router.post('/', (req, res) => {
  const { image_url, name } = req.body;

  const newRecipes = new Recipes({
    image_url,
    name,
  });

  //express function(Promise) to save new document in a collection
  newRecipes.save()
  .then(() => res.send('Successfully added recipe'))
  .catch(err => res.status(400).json({ 'msg': `Could not save recipes: ${err}`}));
  
});

router.put('/', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const image_url = req.body.image_url;

  var query = { _id: id };
  var newUpdatingData = {
    name: name,
    image_url: image_url,
  };

  Recipes.findOneAndUpdate(query, newUpdatingData)
  .then(() => res.send('Updating success'))
  .catch(err => res.status(400).json({ 'msg': `Error: ${err}`}));
})

router.delete('/', (req, res) => {
  const id = req.body.id;

  const index = recipes.findIndex(k => k.id == id);

  recipes.splice(index, 1);
  res.json(recipes)
})

module.exports = router;