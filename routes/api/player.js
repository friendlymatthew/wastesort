const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
const { check, validationResult } = require("express-validator");

router.post("/post",[
], async(req, res) => {

    const schemaValidationErrors = validationResult(req);
    console.log(":::SchemaValidation", schemaValidationErrors);

    if(!schemaValidationErrors.isEmpty()) {
        return res.status(404).send({
            message: "The inputs you entered to register are invalid."
        })
    }


    Item.findOne({_id: req.body._id}).then(item => {
        if(item) {
            return res.status(404).send({
                message: "item already exists or invalid request body."
            })
        } else {
            const newItem = new Item(req.body);
            console.log(newItem);
            newItem.save().catch(err => console.log(err));
            return res.status(201).send(newItem);
        
        }
    })
})

router.get("/get", async(req, res) => {

    Item.find().then(items => {
        return res.status(200).send(items);
    })

})

module.exports = router;