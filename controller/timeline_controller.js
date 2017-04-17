var timelineModel = require('../model/timeline_model');
var messages = require('../setup/messages.json');

exports.insertTimeline=function (call,callback) {
  timelineModel.insertTimeline(call,function (err,result) {
      if(err)callback(err, null);
      else callback(null, messages.sukses_insert_timeline);
  });
};
exports.getTimeline = function (callback) {
    timelineModel.getTimeline(function (err,result) {
        if(err)callback(err, null);
        else {
            if (result[0]){
                callback(null,{
                    success :true,
                    message :'Data Berhasil Diambil',
                    DataTimeline:result
                });
            }else callback(null, messages.materi_kosong);
        }
    });
};
