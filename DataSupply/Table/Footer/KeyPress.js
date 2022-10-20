let GlobalReportsPullDataOnly = require("../../Reports/CommonFuncs/PullDataOnly");

let GlobalCommonReportsPullData = require("../../Fs/Reports/PullData");

let CommonFilesPullData = require("../../Fs/Files/PullData");
let CommonDisplayPullData = require("../../Fs/DefultFileNames/Display/PullData");

let _ = require("lodash");
let LocalTableColumnskey = "TableColumns";
let LocalSubTableColumnskey = "SubTableColumns";

let LocalPullReportData = ({ inEnterToServer, inUserPK }) => {
    console.log("inEnterToServer : ", inEnterToServer);
    let LocalJsonConfig = { inFolderName: inEnterToServer.PickFrom, inJsonFileName: inEnterToServer.FileName };
    let LocalLedgerAutoJson = GlobalCommonReportsPullData.ReturnDataFromJson({ inUserPK });

    let LocalLedgerAutoJsonWithItemName = LocalLedgerAutoJson[inEnterToServer.ItemName];

    return LocalLedgerAutoJsonWithItemName;
};

let LocalPullData = ({ inEnterToServer, inUserPK, inPostData }) => {
    let LocalJsonConfig = { inFolderName: inEnterToServer.FolderName, inJsonFileName: inEnterToServer.FileName };
    let LocalJsonData = CommonFilesPullData.ReturnDataFromJson({ inJsonConfig: LocalJsonConfig, inUserPK });

    let LocalJsonDataWithItemName = LocalJsonData[inEnterToServer.ItemName];
    let LocalDataAsArray = Object.values(LocalJsonDataWithItemName);

    let LocalDataRowFound = LocalDataAsArray.find(element => element[inEnterToServer.ColumnName] === inPostData[inEnterToServer.ColumnName]);

    return LocalDataRowFound;
};

let LocalSwitch = ({ inEnterToServer, inUserPK, inPostData }) => {
    switch (inEnterToServer.PickFrom) {
        case "Reports":
            let LocalReportsConfigData = LocalPullReportData({ inEnterToServer, inUserPK });
            let LocalReportData = GlobalReportsPullDataOnly.FromItemNameWithOutFilters({ inLedgerAutoJsonWithItemName: LocalReportsConfigData, inUserPK })

            return LocalReportData;
            break;
        case "Data":
            let LocalDataNeeded = LocalPullData({ inEnterToServer, inUserPK, inPostData });
            return LocalDataNeeded;

            break;
        default:
            break;
    }
};

let EnterToServer = ({ inJsonConfig, inItemConfig, inInsertKey, inUserPK, inPostData }) => {
    return new Promise((resolve, reject) => {
        if (inUserPK > 0) {
            if (inInsertKey === "undefined" || inInsertKey === "") {
                MainTable.KeyAsTreeWithReturnData({ inJsonConfig, inItemConfig, inUserPK, inDataToServer: inPostData }).then(resolve).catch(reject);
            } else {
                SubTable.KeyAsTreeWithReturnData({ inJsonConfig, inItemConfig, inUserPK, inDataToServer: inPostData, inInsertKey }).then(resolve).catch(reject);
            };
        };
    });
};

let EnterToServerSubTable = ({ inJsonConfig, inItemConfig, inInsertKey, inUserPK, inPostData }) => {
    return new Promise((resolve, reject) => {
        try {
            let LocalItemConfigData = CommonDisplayPullData.ReturnDataFromJsonAndItemName({ inJsonConfig, inItemConfig, inUserPK });
            let LocalTableColumnsRow = _.find(LocalItemConfigData[LocalSubTableColumnskey][inInsertKey][LocalTableColumnskey], { DataAttribute: Object.keys(inPostData)[0] });
            let LocalEnterToServer = LocalTableColumnsRow.ServerSide.EnterToServer;
            let LocalDataNeeded = LocalSwitch({ inEnterToServer: LocalEnterToServer, inUserPK, inPostData });
            let LocalFoundData;

            let LocalReturnData = { KTF: true };

            //  LocalReturnData.DataFromServer = [_.find(LocalDataNeeded, inPostData)];
            // LocalFoundData = LocalDataNeeded.find(element => {
            //     for (const property in inPostData) {
            //         if (element[property] !== inPostData[property]) {
            //             return false;
            //         }
            //     };

            //     return true;
            // });

            LocalReturnData.DataFromServer = [LocalDataNeeded];

            resolve(LocalReturnData);
        } catch (error) {
            console.log("error : ", error);
        };
    });
};

let EnterToServerFromMainTable = ({ inJsonConfig, inItemConfig, inUserPK, inPostData }) => {
    return new Promise((resolve, reject) => {
        try {
            let LocalReturnData = { KTF: false };
            let LocalItemConfigData = CommonDisplayPullData.ReturnDataFromJsonAndItemName({ inJsonConfig, inItemConfig, inUserPK });
            let LocalKeyToFind = Object.keys(inPostData)[0];
            let LocalValueToFind = Object.values(inPostData)[0];

            let LocalTableColumnsRow = LocalItemConfigData[LocalTableColumnskey].find(LoopItem => {
                return LoopItem.DataAttribute === LocalKeyToFind;
            });

            let LocalEnterToServer = LocalTableColumnsRow.ServerSide.EnterToServer;

            if (LocalEnterToServer === undefined) {
                LocalReturnData.KReason = "ServerSide.EnterToServer - undefined";
                reject(LocalReturnData);
            } else {
                let LocalDataNeeded = LocalSwitch({ inEnterToServer: LocalEnterToServer, inUserPK, inPostData });

                LocalReturnData.KTF = true;
                LocalReturnData.DataFromServer = [LocalDataNeeded];

                resolve(LocalReturnData);
            };
        } catch (error) {
            console.log("error : ", error);
        };
    });
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
