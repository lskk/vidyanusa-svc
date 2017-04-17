app = require('../app');
db = app.db;

exports.getTimeline = function (callback) {
    db.get().query('select a.id as id_timeline,a.user as id_user,a.hashtag,a.link as foto_timeline,a.deskripsi,a.lokasi,a.created_at,b.id, b.username,b.foto_profil,c.id as id_hashtag,c.deskripsi from kegiatan a, users b, hashtags c where a.user =b.id and a.hashtag=c.id', function (err, rows) {
        if(err){
            callback(err, null);
        }else {
            callback(null, rows);
        }
    })
};

exports.insertTimeline = function (query, callback) {


    var data={
        user :query.IDUser,
        hashtag:query.KodeHashtag,
        link:query.LinkFoto,
        deskripsi:query.Deskripsi,
        lokasi:query.Lokasi
    };
    db.get().query("INSERT INTO kegiatan set ? ",data, function(err, rows) {
        if(err){
            callback(err, null);
        }else {
            callback(null, rows);
        }
    })
};