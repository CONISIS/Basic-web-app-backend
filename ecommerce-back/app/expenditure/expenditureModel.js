"use strict";
const mongoose = require ('../../config/mongoose').mongoose,
      Schema   = mongoose.Schema;

const expenditureSchema = Schema({
    description : {
        type: String,
        required: true
    },
    cost : {
        type: Number,
        required: true,
        default: 0.0
    },
    expenditure_date : {
        type: Date,
        required: true,
    }
})

const Expenditure = mongoose.model('Expenditure', expenditureSchema);

module.exports = Expenditure;
