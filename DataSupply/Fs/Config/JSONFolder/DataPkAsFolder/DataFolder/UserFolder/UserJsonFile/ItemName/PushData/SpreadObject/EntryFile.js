let CommonFromPullDataFromFile = require("../../../PullDataFromFile/FromFolderAndFile");
let CommonFromPushDataToFile = require("../../../PushDataToFile/FolderAndFile");
let CommonMock = require("../../../../../../../../../../MockAllow.json");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inDataPK, inDataToInsert }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;
    let LocalDataToInsert = inDataToInsert;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromPullDataFromFile.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    if ((LocalinItemName in LocalFromCommonFromCheck.JsonData) === false) {
        LocalReturnData.KReason = `Item Name : ${LocalinItemName} not found!`;
        return LocalReturnData;
    };

    let LocalItemNameValue = LocalFromCommonFromCheck.JsonData[LocalinItemName];

    LocalFromCommonFromCheck.JsonData[LocalinItemName] = {
        ...LocalItemNameValue,
        ...LocalDataToInsert
    };

    let LocalFromPush = CommonFromPushDataToFile.InsertToJsonNoAsync({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalFromCommonFromCheck.JsonData,
        inOriginalData: ""
    });

    LocalReturnData.KTF = true;

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K22') {
        let LocalMockData = require('./SpreadObject.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };
