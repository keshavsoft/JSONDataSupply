let localPushDataJsonData = require("../../../PushData/FromFoldFile");
let CommonPullDataFromFile = require("../../../PullDataFromFile/AsJson");

let StartFuncNoSync = ({ inDataPK, inFolderName, inFileNameOnly, inItemName, inScreenName }) => {
    let localinDataPK = inDataPK;
    let localinFolderName = inFolderName;
    let localinFileNameOnly = inFileNameOnly;
    let localinItemName = inItemName;

    let LocalReturnObject = { KTF: false, KReason: "" };

    let localJsonData = CommonPullDataFromFile.StartFunc({
        inFolderName: localinFolderName,
        inFileNameOnly: localinFileNameOnly, inDataPK: localinDataPK
    });

    LocalReturnObject = { ...localJsonData };

    let localNewJsonDate = localJsonData.JsonData;

    if (localJsonData.KTF === false) {
        LocalReturnObject.KReason = localJsonData.KReason;

        return LocalReturnObject;
    };

    if ((localinItemName in localNewJsonDate) === false) {
        LocalReturnObject.KReason = `ItemName : ${localinItemName} found in config.json!`;

        return LocalReturnObject;
    };

    if (inScreenName in localNewJsonDate[localinItemName]) {
        LocalReturnObject.KReason = `ScreenName : ${inScreenName} found in config.json!`;

        return LocalReturnObject;
    };

    localNewJsonDate[localinItemName][inScreenName] = {};
    localNewJsonDate[localinItemName][inScreenName].TableColumns = [];
    localNewJsonDate[localinItemName][inScreenName].TableInfo = {};

    let localpush = localPushDataJsonData.StartFunc({
        inFolderName: localinFolderName,
        inFileNameWithExtension: `${localinFileNameOnly}.json`,
        inOriginalData: localJsonData.JsonData,
        inDataToUpdate: localNewJsonDate,
        inDataPK: localinDataPK
    });

    if (localpush.KTF) {
        LocalReturnObject.KTF = true
    };

    return LocalReturnObject;
};


module.exports = { StartFuncNoSync };
