var express = require('express');
var router = express.Router();
var guruController = require('../controller/guru_controller');
var messages = require('../setup/messages.json');


router.post('/createclass', function(req,res, next) {
    console.log(req.body);
    var idsekolah=req.body.IDSekolah;
    var namakelas=req.body.NamaKelas;


    if (idsekolah==null||idsekolah==""||namakelas==null||namakelas==""){
        res.status(200).send(messages.parameter_not_completed);
    }else {
        guruController.buatKelas(req.body, function (err, result) {
            if(err){
                res.status(200).send({success: false, message: "Server bermasalah"});
            }else {
                res.status(200).send(result);
            }
        });
    }

});

module.exports = router;