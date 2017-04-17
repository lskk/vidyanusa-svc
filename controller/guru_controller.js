var guruModel = require('../model/guru_model');
var messages = require('../setup/messages.json');


exports.buatKelas = function (call, callback) {
   function checkKodeloop() {
       guruModel.generateKodeKelas(function (err,generatedKode) {
           console.log(generatedKode);
           guruModel.checkKode(generatedKode,function (err,kodeChecked) {
               if (kodeChecked){
                  guruModel.insertKelas(call,generatedKode,function (err,hasilInsert) {
                      if(err)callback(err, null);
                      else callback(null, messages.buat_kelas_berhasil);
                  });
               }else {
                   checkKodeloop();
               }
           });
       });
   }
    checkKodeloop();
};