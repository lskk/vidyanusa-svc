var express = require('express');
var router = express.Router();
var userController = require('../controller/user_controller');
var messages = require('../setup/messages.json');

router.post('/signup', function(req, res, next) {
    console.log(req.body);
    var email=req.body.Email;
    var username=req.body.Username;
    var nama_lengkap=req.body.Nama_lengkap;
    var kelamin=req.body.Kelamin;
    var password=req.body.Password;
    var sekolah=req.body.Sekolah;
    var peran=req.body.Peran;
    var kode=req.body.Kode;
    if (email==null || username==null || nama_lengkap==null || kelamin==null||password==null||sekolah==null||peran==null){
        res.status(200).send({success: false, message: "parameter tidak lengkap"});
    }else {
        if (peran==4 && kode==""){
            res.status(200).send(messages.kode_kurang);
        }else {
            userController.signup(req.body, function (err, result) {
                if(err){
                    res.status(200).send({success: false, message: "Server bermasalah"});
                }else {
                    res.status(200).send(result);
                }
            });
        }

    }
});
router.post('/login', function(req, res, next) {
    console.log(req.body);
    var email=req.body.Email;
    var password=req.body.Password;
    if (email==null || email==""||password==null||password==""){
        res.status(200).send(messages.email_password_kurang);
    }else {
        userController.login(req.body, function (err, result) {
            if(err){
                res.status(200).send({success: false, message: "Server bermasalah"});
            }else {
                res.status(200).send(result);
            }
        });
    }

});


module.exports = router;
