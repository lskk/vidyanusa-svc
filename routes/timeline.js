var express = require('express');
var router = express.Router();
var timelineController = require('../controller/timeline_controller');
var messages = require('../setup/messages.json');

router.get('/', function(req,res, next) {
    timelineController.getTimeline(function (err, result) {
        if(err){
            res.status(200).send({success: false, message: "Server bermasalah"});
        }else {
            res.status(200).send(result);
        }
    });

});
router.post('/insert', function(req, res, next) {
    console.log(req.body);
    var iduser=req.body.IDUser;
    var kodehashtag=req.body.KodeHashtag;
    var linkfoto=req.body.LinkFoto;
    var deskripsi=req.body.Deskripsi;
    var lokasi=req.body.Lokasi;

    if (iduser==null||kodehashtag==null||linkfoto==null||deskripsi==null||lokasi==null){
        res.status(200).send({success: false, message: "parameter tidak lengkap"});
    }else {
        timelineController.insertTimeline(req.body, function (err, result) {
            if(err){
                res.status(200).send({success: false, message: "Server bermasalah"});
            }else {
                res.status(200).send(result);
            }
        });
    }
});

module.exports = router;