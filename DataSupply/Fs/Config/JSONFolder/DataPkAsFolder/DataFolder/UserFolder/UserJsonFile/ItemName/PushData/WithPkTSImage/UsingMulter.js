const multer = require('multer');
let CommonFromCheckImagePath = require("./CheckImagePath");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let LocalFolderName = req.body.inFolderName;
        let LocalFileNameOnly = req.body.inFileNameOnly;
        let LocalItemName = req.body.inItemName;
        let LocalDataPK = req.KeshavSoft.DataPk;

        let inDataToInsert = {};

        inDataToInsert = JSON.parse(req.body.UserData);

        let LocalFromCommonFromCheck = CommonFromCheckImagePath.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameOnly: LocalFileNameOnly,
            inItemName: LocalItemName,
            inDataToInsert: inDataToInsert,
            inDataPK: LocalDataPK
        });

        if (LocalFromCommonFromCheck.KTF) {
            req.MulterSuccess = true;
            req.FromDataSupply = {};
            req.FromDataSupply.KTF = LocalFromCommonFromCheck.KTF;
            req.FromDataSupply.NewRowPK = LocalFromCommonFromCheck.NewRowPK;

            cb(null, LocalFromCommonFromCheck.RowPkAsFolderPath);
        };
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}.jpg`);
    }
});

var upload = multer({ storage: storage });

module.exports = { upload };
