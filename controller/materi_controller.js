var materiModel = require('../model/materi_model');
var messages = require('../setup/messages.json');

exports.getMateriDetail = function (id, callback) {
    materiModel.getMateriByID(id,function (err,result) {
        if(err)callback(err, null);
        else {
            if (result[0]){
                callback(null,{
                    success :true,
                    message :'Data Berhasil Diambil',
                    DetailMateri:result
                });
            }else callback(null, messages.email_or_password_invalid);
        }
    });
};
exports.getMateri = function (callback) {
    materiModel.getMateri(function (err,result) {
        if(err)callback(err, null);
        else {
            if (result[0]){
                callback(null,{
                    success :true,
                    message :'Data Berhasil Diambil',
                    DataMateri:result
                });
            }else callback(null, messages.materi_kosong);
        }
    });
};