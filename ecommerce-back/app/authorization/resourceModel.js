"use strict";
const mongoose = require('../../config/mongoose').mongoose;

const resourceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;

