let CommonFromFolderAndFile = require("./FromFolderAndFile");
let CommonMock = require("../../../../../../../../MockAllow.json");

let StartFunc = ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromFolderAndFile.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK
    });

    LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };

    LocalReturnData.KeysAsArray = Object.keys(LocalReturnData.JsonData);
    delete LocalReturnData.JsonData;
    LocalReturnData.KTF = true;

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K22') {
        let LocalMockData = require('./KeysAsArray.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };
