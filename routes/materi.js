var express = require('express');
var router = express.Router();
var materiController = require('../controller/materi_controller');
var messages = require('../setup/messages.json');

router.get('/', function(req,res, next) {
    materiController.getMateri(function (err, result) {
        if(err){
            res.status(200).send({success: false, message: "Server bermasalah"});
        }else {
            res.status(200).send(result);
        }
    });

});

router.post('/detail', function(req,res, next) {
    console.log(req.body);
    var id=req.body.IDMateri;
    if (id==null||id==""){
        res.status(200).send(messages.parameter_not_completed);
    }else {
        materiController.getMateriDetail(id, function (err, result) {
            if(err){
                res.status(200).send({success: false, message: "Server bermasalah"});
            }else {
                res.status(200).send(result);
            }
        });
    }

});

module.exports = router;