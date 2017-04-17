app = require('../app');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var moment 	= require('moment');
db = app.db;

exports.getMateriByID = function (id, callback) {
    db.get().query('select * from file_materi where id_materi=?', id, function (err, rows) {
        if(err){
            callback(err, null);
        }else {
            callback(null, rows);
        }
    })
};
exports.getMateri = function (callback) {
    db.get().query('select * from materi', function (err, rows) {
        if(err){
            callback(err, null);
        }else {
            callback(null, rows);
        }
    })
};