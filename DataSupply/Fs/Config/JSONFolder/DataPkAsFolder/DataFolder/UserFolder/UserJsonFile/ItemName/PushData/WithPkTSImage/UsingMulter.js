const multer = require('multer');
let CommonFromCheckImagePath = require("./CheckImagePath");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        let inDataToInsert = {};
        inDataToInsert.CustomerName = req.body.CustomerName;
        inDataToInsert.Mobile = req.body.Mobile;
        inDataToInsert.City = req.body.City;
        let LocalFromCommonFromCheck = CommonFromCheckImagePath.StartFunc({
            inFolderName: req.body.inFolderName,
            inFileNameOnly: req.body.inFileNameOnly,
            inItemName: req.body.inItemName,
            inDataToInsert: inDataToInsert,
            inDataPK: req.KeshavSoft.DataPk
        });

        if (LocalFromCommonFromCheck.KTF) {
            cb(null, LocalFromCommonFromCheck.RowPkAsFolderPath);
        };
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

module.exports = { upload };
