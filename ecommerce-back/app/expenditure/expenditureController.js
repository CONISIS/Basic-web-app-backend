const express = require('express'),
      router  = express.Router(),
      Expenditure = require('./expenditureModel');

//TODO: Activar auth middleware

//GET ALL
router.get('/', async(req, res) => {
    try {
        Expenditure.find({}, (err, all) => {
            if(err) return next(err);
            res.send(all);
        });
    } catch (error) {
        res.status(400).send(error)
    }

})

router.post('/', async(req, res) => {
    try{
        const exp = new Expenditure(req.body);
        await exp.save();

        res.status(201).send(exp);
    } catch(error) {
       res.status(400).send(error) 
    } 
})

//GET ONE
router.get('/:id', async(req, res) => {
    try {
        var id = req.params.id;
        Expenditure.findOne({_id: id}, (err, doc) =>{
            if(err) return next(err);
            res.send(doc);
        });
    } catch (error){
        res.status(400).send(error);
    }
})

router.delete('/:id', async(req, res) => {
    try {
        var id = req.params.id;
        Expenditure.deleteOne({_id : id}, (err, doc) =>{
            if(err) return next(err);
            res.send(doc);
        });
    } catch (error){
        res.status(400).send(error);
    }
})

router.put('/:id', async(req, res) => {
    try{
        var id = req.params.id;
        Expenditure.updateOne({_id: id}, {$set: req.body}, {new: true}, (err, doc) => {
            if(err) return console.log(err);
            res.status(200).send( doc );
        });
    } catch(error) {
        res.status(400).send(error);
    }
})

module.exports = router;