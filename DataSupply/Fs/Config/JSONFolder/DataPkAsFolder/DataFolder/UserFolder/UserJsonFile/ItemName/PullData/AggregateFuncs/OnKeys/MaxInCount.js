// let CommonFromCheck = require("../../../Check");
let CommonFromFolderFileItemName = require("../../FromFolderFileItemName");
let _ = require("lodash");
let CommonMock = require("../../../../../../../../../../../MockAllow.json");

let StartFunc = ({ FolderName, FileNameOnly, ItemName, inDataPK, inCount }) => {
    let LocalinFolderName = FolderName;
    let LocalinFileNameOnly = FileNameOnly;
    let LocalinItemName = ItemName;
    const size = inCount;

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
    const friendsReverse = LocalKeysAsNumbers.reverse();

    const items = friendsReverse.slice(0, size);

    LocalReturnData.JsonData = {};

    LocalReturnData.JsonData = items.map(element => {
        return {
            ...LocalFromCommonFromCheck.JsonData[element],
            pk: element
        };
    });

    // LocalReturnData.JsonData[LocalMaxPk] = LocalFromCommonFromCheck.JsonData[LocalMaxPk]
    LocalReturnData.KTF = true;

    return LocalReturnData;
};
let toNumbers = arr => arr.map(Number);

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K31') {
        let LocalMockData = require('./MaxInCount.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log("LocalData:", LocalData);
    };
};

module.exports = { StartFunc };