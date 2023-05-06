const multer = require('multer');
let CommonFromCreateRowPkAsFolder = require("../CreateRowPkAsFolder");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //   console.log("bbbbbbbb : ", req.body);
        let LocalFromCommonFromCheck = CommonFromCreateRowPkAsFolder.StartFunc({
            inFolderName: req.body.inFolderName,
            inFileNameOnly: req.body.inFileNameOnly,
            inItemName: req.body.inItemName,
            inRowPk: req.body.inRowPk,
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
