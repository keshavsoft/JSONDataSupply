// let CommonFromCheck = require("../../../Check");
let CommonFromFolderFileItemName = require("../../FromFolderFileItemName");
let _ = require("lodash");
let CommonMock = require("../../../../../../../../../../../MockAllow.json");

let StartFunc = ({ FolderName, FileNameOnly, ItemName, inDataPK }) => {
    let LocalinFolderName = FolderName;
    let LocalinFileNameOnly = FileNameOnly;
    let LocalinItemName = ItemName;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromFolderFileItemName.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };
    let LocalKeysArray = Object.keys(LocalFromCommonFromCheck.JsonData);
    let LocalKeysAsNumbers = toNumbers(LocalKeysArray);
    let LocalMaxPk = Math.max(...LocalKeysAsNumbers);
    LocalReturnData.JsonData = {};
    LocalReturnData.JsonData[LocalMaxPk] = LocalFromCommonFromCheck.JsonData[LocalMaxPk]
    LocalReturnData.KTF = true;

    return LocalReturnData;
};
let toNumbers = arr => arr.map(Number);

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'hello') {
        let LocalMockData = require('./Max.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log("LocalData:", LocalData);
    };
};

module.exports = { StartFunc };