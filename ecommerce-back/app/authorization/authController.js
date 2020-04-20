const express = require('express'),
      router = express.Router(),
      Permission = require('./permissionModel'),
      Resource = require('./resourceModel'),
      Role = require('./roleModel');

//TODO: Implemet Auth

router.post('/role', async (req, res) => {
    //create a new role
    try {
        const role = new Role(req.body);
        await role.save();
        res.status(201).send({ role });
    } catch (error){
        res.status(400).send( error );
    }
});

router.get("/roles", (req, res) => {
    try{
        Role.find({}, (err, all) => {
            if(err) return next(err);
            res.send(all);
        })
    } catch ( error ){
        res.status(400).send( error );
    }
})

router.post('/resource', async (req, res) => {
    //create a new role
    try {
        const resource = new Resource(req.body);
        await resource.save();
        res.status(201).send({ resource });
    } catch (error){
        res.status(400).send( error );
    }
});

router.get("/resources", (req, res) => {
    try{
        Resource.find({}, (err, all) => {
            if(err) return next(err);
            res.send(all);
        })
    } catch ( error ){
        res.status(400).send( error );
    }
})

router.post('/permission',async (req, res) => {
    //create a new permission
    try {
        const permission = new Permission(req.body);
        await permission.save();
        res.status(201).send({ permission });
    } catch (error){
        res.status(400).send( error );
    } 
});

router.put("/permission/:name", (req, res) => {
    var req_name = req.params.name;
    try{
        Car.findOneAndUpdate({name: req_name}, {$set : req.body}, { new : true }, (err, doc) => {
            if(err) return console.log(err);
            res.status(200).send( doc );
        });
    } catch ( error ){
        console.log(error);
        res.status(400).send( error );
    }
});

router.delete('/permission/:name',async (req, res) => {
    var req_name = req.params.name
    try {
        Permission.deleteOne({name: req_name}, (err, doc) => {
            if(err) return console.log(err);
            res.status(200).send(doc);
        })
    } catch (error){
        res.status(400).send( error );
    } 
});

router.get("/permissions", (req, res) => {
    try{
        Permission.find({}, (err, all) => {
            if(err) return next(err);
            res.send(all);
        })
    } catch ( error ){
        res.status(400).send( error );
    }
})


module.exports = router;