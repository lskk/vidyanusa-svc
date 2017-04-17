app = require('../app');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var moment 	= require('moment');
var randomstring = require("randomstring");
db = app.db;



exports.insertKelas=function (query,kodekelas,callback) {
    var data={
        schools :query.IDSekolah,
        nama:query.NamaKelas,
        kode:kodekelas
    };
    db.get().query("INSERT INTO classes set ? ",data, function(err, rows) {
        if(err){
            callback(err, null);
        }else {
            callback(null, rows);
        }
    })
};

exports.checkKode = function (kodekelas, callback) {
    db.get().query('SELECT * FROM classes WHERE kode = ?', kodekelas, function (err, rows) {
        if(err){
            callback(err, null);
        }else {
            if (rows[0]){
                callback(null, false);
            }else {
                callback(null, true);
            }
        }
    })
};
exports.generateKodeKelas=function (callback) {
    var generatedkode= randomstring.generate(6);
    callback(null,generatedkode);
};