const express = require('express'),
      router  = express.Router(),
      Ingredient = require('./ingredientModel');

//TODO: Activar auth middleware

//GET ALL
router.get('/', async(req, res) => {
    try {
        Ingredient.find({}, (err, all) => {
            if(err) return next(err);
            res.send(all);
        });
    } catch (error) {
        res.status(400).send(error)
    }

})

router.post('/', async(req, res) => {
    try{
        const ingr = new Ingredient(req.body);
        await ingr.save();

        res.status(201).send(ingr);
    } catch(error) {
       res.status(400).send(error) 
    } 
})

//GET ONE
router.get('/:name', async(req, res) => {
    try {
        var _name = req.params.name;
        Ingredient.findOne({name: _name}, (err, doc) =>{
            if(err) return next(err);
            res.send(doc);
        });
    } catch (error){
        res.status(400).send(error);
    }
})

router.delete('/:name', async(req, res) => {
    try {
        var _name = req.params.name;
        Ingredient.deleteOne({name : _name}, (err, doc) =>{
            if(err) return next(err);
            res.send(doc);
        });
    } catch (error){
        res.status(400).send(error);
    }
})

router.put('/:name', async(req, res) => {
    try{
        var _name = req.params.name;
        Ingredient.updateOne({name: _name}, {$set: req.body}, {new: true}, (err, doc) => {
            if(err) return console.log(err);
            res.status(200).send( doc );
        });
    } catch(error) {
        res.status(400).send(error);
    }
})

module.exports = router;