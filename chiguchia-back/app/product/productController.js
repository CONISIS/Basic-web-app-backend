const express = require('express'),
      router  = express.Router(),
      Product = require('./productModel');

//TODO: Activar auth middleware

//GET ALL
router.get('/', async(req, res) => {
    try {
        Product.find({}, (err, all) => {
            if(err) return next(err);
            res.send(all);
        });
    } catch (error) {
        res.status(400).send(error)
    }

})

// POST ONE
router.post('/', async(req, res) => {
    try{
        const product = new Product(req.body);
        await product.save();

        res.status(201).send(product);
    } catch(error) {
       res.status(400).send(error) 
    } 
})

//GET ONE
router.get('/:name', async(req, res) => {
    try {
        var _name = req.params.name;
        Product.findOne({name: _name}, (err, doc) =>{
            if(err) return next(err);
            res.send(doc);
        });
    } catch (error){
        res.status(400).send(error);
    }
})

//DELETE ONE
router.delete('/:name', async(req, res) => {
    try {
        var _name = req.params.name;
        Product.deleteOne({name : _name}, (err, doc) =>{
            if(err) return next(err);
            res.send(doc);
        });
    } catch (error){
        res.status(400).send(error);
    }
})

//UPDATE ONE
router.put('/:name', async(req, res) => {
    try{
        var _name = req.params.name;
        Product.updateOne({name: _name}, {$set: req.body}, {new: true}, (err, doc) => {
            if(err) return console.log(err);
            res.status(200).send( doc );
        });
    } catch(error) {
        res.status(400).send(error);
    }
})

module.exports = router;