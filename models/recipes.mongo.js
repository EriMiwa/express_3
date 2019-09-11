const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defines data types and options for database
const recipesSchema = new Schema({
  image_url: { type: String, required: true },
  name: { type: String, required: true }
}, { timestamps: true })

const Recipes = mongoose.model('Recipes', recipesSchema);
module.exports = Recipes;