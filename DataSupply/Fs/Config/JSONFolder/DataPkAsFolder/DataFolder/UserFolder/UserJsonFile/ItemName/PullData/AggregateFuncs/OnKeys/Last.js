// let CommonFromCheck = require("../../../Check");
let CommonFromFolderFileItemName = require("../../FromFolderFileItemName");
let _ = require("lodash");
let CommonMock = require("../../../../../../../../../../../MockAllow.json");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;

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
    console.log("LocalKeysArray:",LocalKeysArray);
    let LocalLastPk = LocalKeysArray.pop()
    LocalReturnData.JsonData = {};
    LocalReturnData.JsonData[LocalLastPk] = LocalFromCommonFromCheck.JsonData[LocalLastPk]
    LocalReturnData.KTF = true;

    return LocalReturnData;
};
let toNumbers = arr => arr.map(Number);

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'hello') {
        let LocalMockData = require('./Last.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log("LocalData:", LocalData);
    };
};

module.exports = { StartFunc };