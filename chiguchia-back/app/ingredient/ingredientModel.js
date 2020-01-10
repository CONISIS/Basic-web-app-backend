"use strict";
const mongoose = require ('../../config/mongoose').mongoose,
      Schema   = mongoose.Schema;

const ingredientSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description : {
        type: String,
        required: true
    },
    cost : {
        type: Number,
        required: true,
        default: 0.0
    },
    stock : {
        type: Number,
        required: true,
        default: 0.0
    }
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
