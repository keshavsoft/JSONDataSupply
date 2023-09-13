let localPushDataJsonData = require("../../../../PushDataToFile/FromInput");
let CommonCheck = require("../../Check");
let CommonMock = require("../../../../../../../../../../../../MockAllow.json");

let StartFuncNoSync = ({ DataPk, FolderName, FileName, ItemName, ScreenName, ScreenNewData }) => {
    let localinDataPK = DataPk;
    let localinFolderName = FolderName;
    let localinFileNameOnly = FileName;
    let localinItemName = ItemName;
    let localNewScreenName = ScreenName;
    let LocalScreenNewData = ScreenNewData;

    let LocalFromCheck = CommonCheck.StartFuncNoSync({
        inFolderName: localinFolderName,
        inFileNameOnly: localinFileNameOnly,
        inItemName: localinItemName,
        inScreenName: localNewScreenName,
        inDataPK: localinDataPK
    });

    LocalReturnObject = { ...LocalFromCheck };
    LocalReturnObject.KTF = false;

    if (LocalFromCheck.KTFFromRoot === false) {
        return LocalReturnObject;
    };

    if (LocalFromCheck.KTF) {
        LocalReturnObject.KReason = "ScreenName already present!";
        return LocalReturnObject;
    };

    let localNewJsonData = JSON.parse(JSON.stringify(LocalFromCheck.JsonData));
    let LocalJsonScreenNewData = JSON.parse(JSON.stringify(LocalScreenNewData));

    localNewJsonData[localinItemName][localNewScreenName] = LocalJsonScreenNewData;

    let localpush = localPushDataJsonData.StartFuncNoSync({
        inFolderName: localinFolderName,
        inFileNameWithExtension: `${localinFileNameOnly}.json`,
        inOriginalData: LocalFromCheck.JsonData,
        inDataToUpdate: localNewJsonData,
        inDataPK: localinDataPK
    });

    if (localpush.KTF) {
        LocalReturnObject.KTF = true;
    };

    return LocalReturnObject;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'SSSBB') {
        let LocalMockData = require('./FromInput.json');

          let LocalData = StartFuncNoSync({
            DataPk: CommonMock.DataPK,
            ...LocalMockData
        });
            console.log('LocalData : ', LocalData);
           
    };
};


module.exports = { StartFuncNoSync };
