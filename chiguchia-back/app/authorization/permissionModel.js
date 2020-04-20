"use strict";
const mongoose = require ('../../config/mongoose').mongoose;
const FKHelper = require('../../helpers/fk-helper');

const permissionSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    create : {
        type: Boolean,
        required: true
    },
    read : {
        type: Boolean,
        required: true
    },
    write : {
        type: Boolean,
        required: true
    },
    delete : {
        type: Boolean,
        required: true
    },
    rol : {
        type: String, 
        ref: 'Role',
        required: true,
        validate: {
            validator: (v) => {
				return FKHelper(mongoose.model('Role'), v);
			}
		}
    },
    resource : {
        type: String, 
        ref: 'Resource',
        required: true,
        validate: {
            validator: (v) => {
				return FKHelper(mongoose.model('Resource'), v);
			}
		}
    }
});

const Permission = mongoose.model('Permission', permissionSchema);
module.exports = Permission;