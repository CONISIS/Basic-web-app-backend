"use strict";
const mongoose = require('../../config/mongoose').mongoose;

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;

