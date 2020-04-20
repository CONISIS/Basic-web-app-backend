const express = require('express'),
      router  = express.Router(),
      Order = require('./orderModel');

//TODO: Activar auth middleware

//GET ALL
router.get('/', async(req, res) => {
    try {
        Order.find({}, (err, all) => {
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
        const order = new Order(req.body);
        await order.save();

        res.status(201).send(order);
    } catch(error) {
       res.status(400).send(error) 
    } 
})

//GET ONE
router.get('/:id', async(req, res) => {
    try {
        var id_req = req.params.id;
        Order.findOne({_id: id_req}, (err, doc) =>{
            if(err) return next(err);
            res.send(doc);
        });
    } catch (error){
        res.status(400).send(error);
    }
})

//DELETE ONE
router.delete('/:id', async(req, res) => {
    try {
        var id_req = req.params.id;
        Order.deleteOne({_id : id_req}, (err, doc) =>{
            if(err) return next(err);
            res.send(doc);
        });
    } catch (error){
        res.status(400).send(error);
    }
})

//UPDATE ONE
router.put('/:id', async(req, res) => {
    try{
        var id_req = req.params.id;
        Order.updateOne({_id: id_req}, {$set: req.body}, {new: true}, (err, doc) => {
            if(err) return console.log(err);
            res.status(200).send( doc );
        });
    } catch(error) {
        res.status(400).send(error);
    }
})

module.exports = router;