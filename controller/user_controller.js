var userModel = require('../model/user_model');
var messages = require('../setup/messages.json');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

exports.login = function (call, callback) {
    userModel.checkEmail(call['Email'],function (err,result) {
        if(err)callback(err, null);
        else {
            if (result[0]){
                var password=result[0].password;
                if (bcrypt.compareSync(call['Password'],password)){
                    userModel.getDataUserByID(result[0].id,function (err,datauser) {
                        if(err)callback(err,null);
                        else callback(null,{
                            success :true,
                            message :'berhasil login',
                            DataUser:datauser
                        });
                    });
                }else callback(null, messages.kode_tidak_ada);
            }else callback(null, messages.email_or_password_invalid);
        }
    });
};
exports.signup = function (call, callback) {
    userModel.checkEmail(call['Email'], function (err, email) {
        if(err)callback(err, null);
        else {
            if(email[0])callback(null, messages.email_already_use);
            else {
                if (call['Peran']==3){
                    userModel.insertUser(call, function (err, user) {
                        if(err)callback(err, null);
                        else{
                            userModel.getIDbyemail(call['Email'],function (err,id) {
                                if (err)callback(err,null);
                                else {
                                    userModel.insertTeacher(id,call['Sekolah'],function (err,user) {
                                        if(err)callback(err, null);
                                        else callback(null, messages.account_created);
                                    });
                                }
                            });
                        }
                    });

                }else {
                    userModel.checkKode(call['Kode'], function (err, kode) {
                        if(err)callback(err, null);
                        else {
                            if (kode[0]) {
                                userModel.insertUser(call, function (err, user) {
                                    if(err)callback(err, null);
                                    else{
                                        userModel.getIDbyemail(call['Email'],function (err,id) {
                                            if (err)callback(err,null);
                                            else {
                                                userModel.insertStudent(id,kode[0].schools,function (err,user) {
                                                    if(err)callback(err, null);
                                                    else callback(null, messages.account_created);
                                                });
                                            }
                                        });
                                    }
                                });
                            } else callback(null, messages.kode_tidak_ada);
                        }
                    });
                }
            }
        }
    });
};

