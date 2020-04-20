"use strict";
const mongoose = require('../../config/mongoose').mongoose,
      Schema = mongoose.Schema,
      FKHelper = require('../../helpers/fk-helper');
            
const orderSchema = Schema({

    order_date : {
        type : Date,
        required : true
    },
    due_date : {
        type : Date,
        required : true
    },
    state : {
        type : String,
        enum : ['Entregado', 'Pendiente'],
        required : true,
        default: 'Pendiente'
    },
    payment_method : {
        type: String,
        enum: ['Efectivo', 'Crédito', 'Débito'],
        required: true
    },
    payment_instalment : { //Abono de pago
        type: Number, 
        default: 0.0
    },
    payment : {
        type: Number, 
        default: 0.0,
        required: true
    },
    payment_state : {
        type : String,
        enum : ['Pendiente', 'Pagado'],
        default: 'Pendiente',
        required: true
    },
    products : {
        type : [String],
        default: undefined,
        required: true,
        validate : {
            validator: (arr) => {
                var cond = false;
                arr.forEach( prod => {
                    cond = FKHelper(mongoose.model('Product'), prod);
                });
                return cond; 
            }
        }
    },
    client : {
        type : String,
        required: true,
        validate : {
            validator: (v) => {
                return FKHelper(mongoose.model('User'), v);
            }
        }
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
