app = require('../app');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var moment 	= require('moment');
db = app.db;

exports.getDataUserByID = function (id, callback) {
    db.get().query('select a.*,b.id_user, b.sekolah,c.nama_sekolah,c.kode,c.id from users a, teachers b, schools c where a.id=? and a.id=b.id_user and b.sekolah=c.id', id, function (err, rows) {
        if(err){
            callback(err, null);
        }else {
            callback(null, rows);
        }
    })
};

exports.checkKode = function (kode, callback) {
    db.get().query('SELECT * FROM classes WHERE kode = ?', kode, function (err, rows) {
        if(err){
            callback(err, null);
        }else {
            callback(null, rows);
        }
    })
};
exports.checkEmail = function (email, callback) {
    db.get().query('SELECT * FROM users WHERE email = ?', email, function (err, rows) {
        if(err){
            callback(err, null);
        }else {
            callback(null, rows);
        }
    })
};

exports.insertUser = function (query, callback) {


    var data={
        email :query.Email,
        username:query.Username,
        nama_lengkap:query.Nama_lengkap,
        jenis_kelamin:query.Kelamin,
        password:bcrypt.hashSync(query.Password, salt),
        peran:query.Peran,
        level_user:0,
        skill:0,
        award:0,
        total_exp:0

    };
    db.get().query("INSERT INTO users set ? ",data, function(err, rows) {
        if(err){
            callback(err, null);
        }else {
            callback(null, rows);
        }
    })
};

exports.getIDbyemail = function (email, callback) {
    db.get().query('SELECT id FROM users WHERE email = ?', email, function (err, rows) {
        if(err){
            callback(err, null);
        }else {
            console.log('test = = = = '+rows[0].id);
            callback(null, rows[0].id);
        }
    })
};

exports.insertTeacher = function (Id_user,Sekolah, callback) {
    var data={
        id_user :Id_user,
        sekolah :Sekolah
    };
    db.get().query("INSERT INTO teachers set ? ",data, function(err, rows) {
        if(err){
            callback(err, null);
        }else {
            callback(null, rows);
        }
    })
};
exports.insertStudent = function (Id_user,Sekolah, callback) {
    var data={
        id_user :Id_user,
        kelas :Sekolah
    };
    db.get().query("INSERT INTO students set ? ",data, function(err, rows) {
        if(err){
            callback(err, null);
        }else {
            callback(null, rows);
        }
    })
};