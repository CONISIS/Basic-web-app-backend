'use strict';
const router_auth = require('./authorization/authController');
const router_users = require('./user/userController');
const router_ingredients = require('./ingredient/ingredientController');
const router_products = require('./product/productController');
const router_orders = require('./order/orderController');
const router_expends = require('./expenditure/expenditureController');
 
var routers = function(app) {
    app.use('/auth', router_auth);
    app.use('/users', router_users);
    app.use('/ingredients', router_ingredients);
    app.use('/products', router_products);
    app.use('/orders', router_orders);
    app.use('/expends', router_expends);
};

module.exports = routers;