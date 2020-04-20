"use strict";
const mongoose = require('../../config/mongoose').mongoose,
      Schema = mongoose.Schema,
      FKHelper = require('../../helpers/fk-helper');

const productSchema = Schema({
    name : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true,
        default: 0.0
    },
    ingredients :{
        type: [String],
        default: undefined,
        required: true,
        validate : {
            validator: (arr) => {
                var cond = false;
                arr.forEach( ing => {
                    cond = FKHelper(mongoose.model('Ingredient'), ing);
                });
                return cond; 
            }
        }
    },
    stock : {
        type: Number,
        required: true,
        default: 0.0
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
