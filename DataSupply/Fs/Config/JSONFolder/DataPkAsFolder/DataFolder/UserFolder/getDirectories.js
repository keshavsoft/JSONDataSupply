const fs = require("fs");
let CommonFromCheck = require("./Check");
let CommonMock = require("../../../../../../MockAllow.json");

let AsArray = ({ inFolderName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalFolderName = inFolderName;

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inFolderName: LocalFolderName,
        inDataPK: LocalDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        return [];
    };

    let LocalDataPath = LocalFromCommonFromCheck.FolderPath;

    return fs.readdirSync(LocalDataPath).map((file) => {
        return file;
    });
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'SS12') {

        let LocalData = AsArray({
            inDataPK: CommonMock.DataPK,
            inFolderName:"Masters"
        });
        console.log('LocalData : ', LocalData);

    };
};



module.exports = { AsArray };
