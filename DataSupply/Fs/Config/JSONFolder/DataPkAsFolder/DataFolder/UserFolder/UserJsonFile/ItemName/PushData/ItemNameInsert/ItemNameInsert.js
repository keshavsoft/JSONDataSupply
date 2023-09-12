let CommonFromPushDataToFile = require("../../../PushDataToFile/FolderAndFile");
let MaxItem = require("./MaxItem");
let CommonMock = require("../../../../../../../../../../MockAllow.json");

let StartFuncNoAsync = ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = MaxItem.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK
    });

    LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };

    let LocalNewData = JSON.parse(JSON.stringify(LocalReturnData.JsonData));

    LocalNewData[LocalReturnData.Max] = {};

    let LocalFromPush = CommonFromPushDataToFile.InsertToJsonNoAsync({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalNewData,
        inOriginalData: LocalFromCommonFromCheck.JsonData
    });

    if (LocalFromPush.KTF === false) {
        LocalReturnData.KReason = LocalFromPush.KReason;
        return LocalReturnData;
    };

    LocalReturnData.KTF = true;

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'ssssv') {
        let LocalMockData = require('./ItemNameInsert.json');

        let LocalData = StartFuncNoAsync({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFuncNoAsync };
