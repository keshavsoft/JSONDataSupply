let localPullDataJsonData = require("../../PullData/AsJson");
let localPushDataJsonData = require("../../PushData/FromFoldFile");
let CommonPullDataFromFile = require("../../PullDataFromFile/FromFolderAndFile");

let StartFunc = async ({ inDataPK, inFolderName, inFileNameOnly, inItemName }) => {
    let localinDataPK = inDataPK;
    let localinFolderName = inFolderName;
    let localinFileNameOnly = inFileNameOnly;
    let localinItemName = inItemName;

    let LocalReturnObject = { KTF: false, KReason: "" };

    let localJsonData = await localPullDataJsonData.StartFunc({
        inFolderName: localinFolderName,
        inFileNameOnly: localinFileNameOnly, inDataPK: localinDataPK
    });

    LocalReturnObject = { ...localJsonData };

    let localNewJsonDate = localJsonData.JsonData;

    if (localJsonData.KTF === false) {
        LocalReturnObject.KReason = localJsonData.KReason;

        return await LocalReturnObject;
    };

    if (localinItemName in localNewJsonDate) {
        LocalReturnObject.KReason = `ItemName : ${localinItemName} found in config.json!`;

        return await LocalReturnObject;
    };

    localNewJsonDate[localinItemName] = {};

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

    return await LocalReturnObject;
};

let StartFuncNoSync = ({ inDataPK, inFolderName, inFileNameOnly, inItemName }) => {
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

    if (localinItemName in localNewJsonDate) {
        LocalReturnObject.KReason = `ItemName : ${localinItemName} found in config.json!`;

        return LocalReturnObject;
    };

    localNewJsonDate[localinItemName] = {};

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

module.exports = { StartFunc, StartFuncNoSync };
