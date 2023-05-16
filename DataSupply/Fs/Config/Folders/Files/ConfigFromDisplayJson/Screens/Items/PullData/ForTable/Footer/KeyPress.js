//let GlobalReportsPullDataOnly = require("../../Reports/CommonFuncs/PullDataOnly");

//let GlobalCommonReportsPullData = require("../../Fs/Reports/PullData");

// let CommonFilesPullData = require("../../Fs/Files/PullData");
// let CommonDisplayPullData = require("../../Fs/DefultFileNames/Display/PullData");


let CommonFilesPullData = require("../../../../../../PullData/FromData");
let CommonDisplayPullData = require("../../../PullData/FromDisplayJson/FromJson");


let _ = require("lodash");
let LocalTableColumnskey = "TableColumns";
let LocalSubTableColumnskey = "SubTableColumns";

let LocalPullReportData = ({ inEnterToServer, inUserPK }) => {
    let LocalJsonConfig = { inFolderName: inEnterToServer.PickFrom, inJsonFileName: inEnterToServer.FileName };
    //  let LocalLedgerAutoJson = GlobalCommonReportsPullData.ReturnDataFromJson({ inUserPK });

    let LocalLedgerAutoJsonWithItemName = LocalLedgerAutoJson[inEnterToServer.ItemName];

    return LocalLedgerAutoJsonWithItemName;
};

let LocalPullData = async ({ inEnterToServer, inUserPK, inPostData }) => {
    let LocalReturnObject = { KTF: false, KReason: "" };
    let LocalColumnNameToFind = inEnterToServer.ColumnName;

    let LocalJsonConfig = { inFolderName: inEnterToServer.FolderName, inJsonFileName: inEnterToServer.FileName };
    let LocalJsonData = await CommonFilesPullData.AsJsonAsync({ inJsonConfig: LocalJsonConfig, inUserPK });

    let LocalJsonDataWithItemName = LocalJsonData[inEnterToServer.ItemName];

    if (LocalColumnNameToFind === "pk") {
        LocalReturnObject.KTF = true;
        LocalReturnObject.KResult = LocalFuncForPk({
            inItemData: LocalJsonDataWithItemName,
            inPostData
        });
    } else {
        let LocalDataAsArray = Object.values(LocalJsonDataWithItemName);

        let LocalDataRowFound = LocalDataAsArray.find(element => element[LocalColumnNameToFind] === inPostData);

        if (LocalDataRowFound === undefined) {

            let LocalKeyNeeded = Object.values(inPostData)[0];

            if (LocalKeyNeeded in LocalJsonDataWithItemName) {
                LocalDataRowFound = LocalJsonDataWithItemName[LocalKeyNeeded];

                LocalReturnObject.KTF = true;
                LocalReturnObject.KResult = LocalDataRowFound;
            } else {
                LocalReturnObject.KReason = "From LocalPullData";
            };

            return await LocalReturnObject;
        };

        LocalReturnObject.KTF = true;
        LocalReturnObject.KResult = LocalDataRowFound;
    };

    return await LocalReturnObject;
};

let LocalFuncForPk = ({ inItemData, inPostData }) => {
    let LocalValueToFind = Object.values(inPostData)[0];

    if (LocalValueToFind in inItemData) {
        return inItemData[LocalValueToFind];
    };
};

let LocalSwitch = async ({ inEnterToServer, inUserPK, inPostData }) => {
    let LocalReturnObject = { KTF: false, KReason: "" };

    switch (inEnterToServer.PickFrom) {
        case "Reports":
            //  let LocalReportsConfigData = LocalPullReportData({ inEnterToServer, inUserPK });
            //  let LocalReportData = GlobalReportsPullDataOnly.FromItemNameWithOutFilters({ inLedgerAutoJsonWithItemName: LocalReportsConfigData, inUserPK })

            return LocalReportData;
            break;
        case "Data":
            let LocalDataNeeded = await LocalPullData({ inEnterToServer, inUserPK, inPostData });

            if (LocalDataNeeded.KTF === false) {
                LocalReturnObject.KReason = LocalDataNeeded.LocalReturnObject;
            };

            LocalReturnObject.KResult = LocalDataNeeded.KResult;
            LocalReturnObject.KTF = true;

            return await LocalReturnObject;

            break;
        default:
            break;
    }
};

let EnterToServer = ({ inJsonConfig, inItemConfig, inInsertKey, inUserPK, inPostData }) => {
    return new Promise((resolve, reject) => {
        if (inUserPK > 0) {
            if (inInsertKey === undefined || inInsertKey === "") {
                MainTable.KeyAsTreeWithReturnData({
                    inJsonConfig, inItemConfig, inUserPK,
                    inDataToServer: inPostData
                }).then(resolve).catch(reject);
            } else {
                SubTable.KeyAsTreeWithReturnData({ inJsonConfig, inItemConfig, inUserPK, inDataToServer: inPostData, inInsertKey }).then(resolve).catch(reject);
            };
        };
    });
};

let EnterToServerSubTable = async ({ inJsonConfig, inItemConfig, inInsertKey, inUserPK, inPostData }) => {
    let LocalReturnData = { KTF: false };

    let LocalItemConfigData = await CommonDisplayPullData.AsJsonAsync({
        inJsonConfig, inItemConfig,
        inDataPK: inUserPK
    });

    let LocalTableColumnsRow = _.find(LocalItemConfigData[LocalSubTableColumnskey][inInsertKey][LocalTableColumnskey], { DataAttribute: Object.keys(inPostData)[0] });
    let LocalEnterToServer = LocalTableColumnsRow.ServerSide.EnterToServer;

    let LocalDataNeeded = await LocalSwitch({
        inEnterToServer: LocalEnterToServer,
        inUserPK, inPostData
    });

    if (LocalDataNeeded.KTF === false) {
        LocalReturnData.KReason = LocalDataNeeded.KReason;

        return await LocalReturnData;
    };

    LocalReturnData.KTF = true;
    LocalReturnData.DataFromServer = [LocalDataNeeded.KResult];

    return await LocalReturnData;
    //resolve(LocalReturnData);
};

let EnterToServerFromMainTable = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData }) => {
    //   let LocalReturnData = { KTF: false };
    let LocalReturnObject = { KTF: false, KReason: "" };

    let LocalItemConfigData = await CommonDisplayPullData.AsJsonAsync({
        inJsonConfig,
        inItemConfig,
        inDataPK: inUserPK
    });

    let LocalKeyToFind = Object.keys(inPostData)[0];

    let LocalTableColumnsRow = LocalItemConfigData[LocalTableColumnskey].find(LoopItem => {
        return LoopItem.DataAttribute === LocalKeyToFind;
    });

    let LocalEnterToServer = LocalTableColumnsRow.ServerSide.EnterToServer;

    if (LocalEnterToServer === undefined) {
        LocalReturnObject.KReason = "ServerSide.EnterToServer - undefined";
    } else {
        let LocalDataNeeded = await LocalSwitch({
            inEnterToServer: LocalEnterToServer,
            inUserPK,
            inPostData
        });

        if (LocalDataNeeded.KTF === false) {
            LocalReturnObject.KReason = LocalDataNeeded.KReason;
            return await LocalReturnObject;
        };

        LocalReturnObject.KTF = true;
        LocalReturnObject.DataFromServer = [LocalDataNeeded.KResult];
    };

    return await LocalReturnObject;
};

let MainTable = {
    KeyAsTreeWithReturnData: ({ inJsonConfig, inItemConfig, inUserPK, inDataToServer }) => {
        return new Promise((resolve, reject) => {
            EnterToServerFromMainTable({ inJsonConfig, inItemConfig, inUserPK, inPostData: inDataToServer }).then(resolve).catch(reject);
        });
    }
};

let SubTable = {
    KeyAsTreeWithReturnData: ({ inJsonConfig, inItemConfig, inUserPK, inDataToServer, inInsertKey }) => {
        return new Promise((resolve, reject) => {
            EnterToServerSubTable({ inJsonConfig, inItemConfig, inInsertKey, inUserPK, inPostData: inDataToServer }).then(resolve).catch(reject);
        });
    }
};

module.exports = { EnterToServer };
