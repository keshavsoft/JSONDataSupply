let CommonCheck = require("../../../Check");
let path = require("path");
let fs = require("fs");
let CommonMock = require("../../../../../../../MockAllow.json");

let StartFunc = ({ inFolderName, inFileNameWithExtension, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalFilePath;

        LocalDataFromCommonCreate = CommonCheck.ForFile({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension, inUserPK: LocalDataPK
        });

        LocalReturnObject = { ...LocalDataFromCommonCreate };
        LocalReturnObject.KTF = false;

        if (LocalDataFromCommonCreate.KTF === false) {
            return LocalReturnObject;
        };

        LocalFilePath = LocalDataFromCommonCreate.FilePath
        LocalDataFromJSON = fs.readFileSync(LocalFilePath);
        LocalReturnObject.JsonData = JSON.parse(LocalDataFromJSON);

        LocalReturnObject.KTF = true;
    };

    return LocalReturnObject;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K10') {
        let LocalMockData = require('./NoSync.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = {
    StartFunc
};