let localPushDataJsonData = require("../../../PushData/FromFoldFile");
let CommonCheck = require("../Check");
let CommonSupplyJson = require("../../../../../../../../../../../Fix/Json/SupplyJson");

let LocalFixTableColumnForPk = ({ inTableColumnObject }) => {
    inTableColumnObject.DisplayName = "pk";
    inTableColumnObject.DataAttribute = "pk";
    inTableColumnObject.CreateNew = false;
};

let StartFuncNoSync = ({ inDataPK, inFolderName, inFileNameOnly, inItemName, inScreenName }) => {
    let LocalNewColumnObject = CommonSupplyJson.TableColumn();
    let LocalNewTableInfoObject = CommonSupplyJson.TableInfo();
    let localinDataPK = inDataPK;
    let localinFolderName = inFolderName;
    let localinFileNameOnly = inFileNameOnly;
    let localinItemName = inItemName;
    
    let LocalFromCheck = CommonCheck.StartFuncNoSync({
        inFolderName: localinFolderName,
        inFileNameOnly: localinFileNameOnly,
        inItemName: localinItemName,
        inScreenName,
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

    LocalFixTableColumnForPk({ inTableColumnObject: LocalNewColumnObject });

    localNewJsonData[localinItemName][inScreenName] = {};
    localNewJsonData[localinItemName][inScreenName].TableColumns = [];
    localNewJsonData[localinItemName][inScreenName].TableInfo = LocalNewTableInfoObject;
    localNewJsonData[localinItemName][inScreenName].TableColumns.push(LocalNewColumnObject);

    let localpush = localPushDataJsonData.StartFunc({
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

let LocalFuncNewData = ({ inDataPK, inFolderName, inFileNameOnly, inItemName, inScreenName }) => {
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

    LocalReturnObject = { ...LocalFromCheck };
    LocalReturnObject.KTF = false;

    if (LocalFromCheck.KTFFromRoot === false) {
        return LocalReturnObject;
    };

    if (LocalFromCheck.KTF) {
        LocalReturnObject.KReason = "ScreenName already present!";
        return LocalReturnObject;
    };

    return LocalFromCheck.JsonData;
};

let StartFuncNoSync_Keshav_5Jun = ({ inDataPK, inFolderName, inFileNameOnly, inItemName, inScreenName }) => {
    let LocalNewColumnObject = CommonColumnJsonFuncs.TableColumn();
    let LocalNewTableInfoObject = CommonColumnJsonFuncs.TableInfo();

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

    if (LocalFromCheck.KTFFromRoot === false) {
        return LocalReturnObject;
    };

    if (LocalFromCheck.KTF) {
        LocalReturnObject.KReason = "ScreenName already present!";
        return LocalReturnObject;
    };
    CommonSupplyJson
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
