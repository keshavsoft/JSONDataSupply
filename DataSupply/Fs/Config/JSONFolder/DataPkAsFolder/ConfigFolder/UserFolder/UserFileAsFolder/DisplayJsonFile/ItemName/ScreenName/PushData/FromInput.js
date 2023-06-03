let localPushDataJsonData = require("../../../PushData/FromFoldFile");
let CommonCheck = require("../Check");

let StartFuncNoSync = ({ inDataPK, inFolderName, inFileNameOnly, inItemName, inScreenName }) => {
    let localinDataPK = inDataPK;
    let localinFolderName = inFolderName;
    let localinFileNameOnly = inFileNameOnly;
    let localinItemName = inItemName;

    let LocalReturnObject = { KTF: false, KReason: "" };

    let LocalFromCheck = CommonCheck.StartFuncNoSync({
        inFolderName: localinFolderName,
        inFileNameOnly: localinFileNameOnly,
        inItemName: localinItemName,
        inScreenName,
        inDataPK: localinDataPK
    });
    console.log("LocalFromCheck : ", LocalFromCheck);
    LocalReturnObject = { ...LocalFromCheck };
    LocalReturnObject.KTF = false;

    let localNewJsonDate = JSON.parse(JSON.stringify(LocalFromCheck.JsonData));

    if (LocalFromCheck.KTF) {
        LocalReturnObject.KReason = "ScreenName already present!";
        return LocalReturnObject;
    };

    localNewJsonDate[localinItemName][inScreenName] = {};
    localNewJsonDate[localinItemName][inScreenName].TableColumns = [];
    localNewJsonDate[localinItemName][inScreenName].TableInfo = {};

    let localpush = localPushDataJsonData.StartFunc({
        inFolderName: localinFolderName,
        inFileNameWithExtension: `${localinFileNameOnly}.json`,
        inOriginalData: LocalFromCheck.JsonData,
        inDataToUpdate: localNewJsonDate,
        inDataPK: localinDataPK
    });

    if (localpush.KTF) {
        LocalReturnObject.KTF = true;
    };

    return LocalReturnObject;
};


module.exports = { StartFuncNoSync };
