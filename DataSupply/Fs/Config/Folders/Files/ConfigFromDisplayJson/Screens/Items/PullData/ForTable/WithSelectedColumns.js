let _ = require("lodash");
let path = require("path");

let CommonPullDataTransformData = require("../../../../../../../../../PullData/TransformData");

// let CommonFilesPullData = require("../../../../../Items/PullData/FromDataFolder/Pull");


let CommonFilesPullData = require("../../../../../../../JSONFolder/DataPkAsFolder/DataFolder/UserFolder/UserJsonFile/ItemName/PullData/FromFolderFileItemName");

let CommonFromReports = require("../../../../../../../../../Reports/CommonFuncs/VouchersConsider/Transform");

let CommonMock = require("../../../../../../../../../MockAllow.json");

let CommonConfig = require("../../../../Items/Screens/PullData/FromDisplayJson/ReturnAsJson");
let CommonTableColumnsTweak = require("./TableColumnsTweak/KeepKpColumn");

let LocalPrepareTableConfig = async ({ inJsonConfig, inItemConfig, inUserPK }) => {
    let LocalDisplayDataNeeded;
    let LocalReturnObject = {
        TableColumns: [],
        TableInfo: {},
        JoinTables: []
    };

    let LocalDisplayData = await CommonConfig.FromJsonItemConfig({
        inJsonConfig, inItemConfig,
        inDataPK: inUserPK
    });

    if (LocalDisplayData.KTF) {
        LocalDisplayDataNeeded = LocalDisplayData.DataFromServer;

        if (LocalDisplayDataNeeded !== undefined) {
            LocalReturnObject.TableColumns = CommonTableColumnsTweak.StartFunc({
                inTableColumns: LocalDisplayDataNeeded.TableColumns,
                inTableInfo: LocalDisplayDataNeeded.TableInfo
            });

            LocalReturnObject.TableInfo = LocalDisplayDataNeeded.TableInfo;
            LocalReturnObject.JoinTables = LocalDisplayDataNeeded.JoinTables;
        };
    };

    return await LocalReturnObject;
};

let LocalPrepareTableData = async ({ inJsonConfig, inItemConfig, inDataPk, inColumns, inTableInfo, inFolderName, inFileName, inItemName }) => {
    let LocalItemName = inItemConfig.inItemName;
    let LocalinFileNameOnly = path.parse(inFileName).name;

    let LocalReturnData;

    let LocalData = CommonFilesPullData.ReturnAsArrayWithPK({
        inDataPK: inDataPk,
        inFolderName, inFileNameOnly: LocalinFileNameOnly,
        inItemName
    });

    if (LocalData.KTF) {
        LocalReturnData = LocalData.JsonData;

        if ("TableInfoServerSide" in inTableInfo) {
            if (inTableInfo.TableInfoServerSide.TransformFromReports) {
                let LocalTransformedColumns = inColumns.map(element => {
                    element.DisplayColumn = element.DataAttribute;

                    if (element.hasOwnProperty("Name") === false) { element.Name = element.DataAttribute };

                    return element;
                });

                LocalReturnData = CommonFromReports.Transform({
                    inColumns: LocalTransformedColumns,
                    inData: LocalData.ArrayData
                });
            };
        };

        try {
            let LocalColumnsArray = _.map(inColumns, 'DataAttribute');

            LocalReturnData = _.map(LocalReturnData, LoopItem => {
                return _.pick(LoopItem, LocalColumnsArray);
            });
        } catch (error) {
            console.log("error : ", error);
        };
    };

    return await LocalReturnData;
};

let LocalSubFuncs = {
    CreateArrayElement: async ({ inDisplayDataNeeded, inJsonConfig, inItemConfig, inDataPk, inFolderName, inFileName, inItemName }) => {
        let LocalReturnArrayObject = { HTMLControlType: "MainTable", KData: {} };

        LocalReturnArrayObject.KData.TableColumns = inDisplayDataNeeded.TableColumns;
        LocalReturnArrayObject.KData.TableInfo = inDisplayDataNeeded.TableInfo;

        if (!LocalReturnArrayObject.KData.TableInfo.hasOwnProperty("DataAttributes")) { LocalReturnArrayObject.KData.TableInfo.DataAttributes = {} };

        LocalReturnArrayObject.KData.TableInfo.DataAttributes.JsonConfig = JSON.stringify(inJsonConfig);
        LocalReturnArrayObject.KData.TableInfo.DataAttributes.ItemConfig = JSON.stringify(inItemConfig);

        LocalReturnArrayObject.KData.TableData = await LocalSubFuncs.SubFuncs.ForTableData({
            inDisplayDataNeeded,
            inJsonConfig, inItemConfig, inDataPk, inFolderName, inFileName, inItemName
        });

        return await LocalReturnArrayObject;
    },
    SubFuncs: {
        ForTableData: async ({ inDisplayDataNeeded, inJsonConfig, inItemConfig, inDataPk, inFolderName, inFileName, inItemName }) => {
            let LocalData = await LocalPrepareTableData({
                inJsonConfig, inItemConfig, inDataPk,
                inColumns: inDisplayDataNeeded.TableColumns, inTableInfo: inDisplayDataNeeded.TableInfo,
                inFolderName, inFileName, inItemName
            });

            let LocalDataFromTransformToUi = CommonPullDataTransformData.FromTransformToUi({
                inData: LocalData, inDisplayJsonData: inDisplayDataNeeded,
                inUserPK: inDataPk
            });

            return await LocalDataFromTransformToUi;
        }
    }
};

let StartFunc = async ({ inFolderName, inFileName, inItemName, inScreenName, inDataPk }) => {
    let LocalReturnObject = { KTF: false, KMessage: "", DataFromServer: "" };

    if (inDataPk > 0) {
        let LocalDataFromServer = [];
        let LocalReturnArrayObject;
        let inJsonConfig = {};
        let inItemConfig = {};

        inJsonConfig.inFolderName = inFolderName;
        inJsonConfig.inJsonFileName = inFileName;

        inItemConfig.inItemName = inItemName;
        inItemConfig.inScreenName = inScreenName;

        let LocalDisplayDataNeeded = await LocalPrepareTableConfig({ inJsonConfig, inItemConfig, inUserPK: inDataPk });

        LocalReturnArrayObject = await LocalSubFuncs.CreateArrayElement({
            inDisplayDataNeeded: LocalDisplayDataNeeded,
            inJsonConfig, inItemConfig,
            inDataPk,
            inFolderName, inFileName, inItemName
        });

        LocalDataFromServer.push(LocalReturnArrayObject);

        LocalReturnObject.KTF = true;
        LocalReturnObject.DataFromServer = LocalDataFromServer;
    };

    return await LocalReturnObject;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'KJ25') {
        let LocalMockData = require('./WithSelectedColumns.json');

        StartFunc({
            ...LocalMockData,
            inDataPk: CommonMock.DataPK
        }).then(PromiseData => {
            console.log("PromiseData : ", PromiseData.DataFromServer[0]);
        });
    };
};

module.exports = { StartFunc };
