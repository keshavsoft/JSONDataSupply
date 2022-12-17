let CommonPullDataTransformData = require("../../../../../../../../../PullData/TransformData");

let CommonDisplayPullDataNew = require("../../../../../PullData/From-ConfigFromFile")
let CommonReOrder = require("../../../../../../../../../CommonTableFuncs/TableFuncs/ReOrder");

let CommonFilesPullData = require("../../../../../Items/PullData/FromDataFolder/Pull");
let CommonFromReports = require("../../../../../../../../../Reports/CommonFuncs/VouchersConsider/Transform");

let LocalPrepareTableConfig = async ({ inJsonConfig, inItemConfig, inUserPK }) => {
    let LocalDisplayDataNeeded;
    let LocalReturnObject = {
        TableColumns: [],
        TableInfo: {},
        JoinTables: []
    };
    let LocalScreenName = inItemConfig.inScreenName;

    let LocalDisplayData = await CommonDisplayPullDataNew.AsJsonAsync({ inJsonConfig, inUserPK });

    if (LocalScreenName in LocalDisplayData) {
        LocalDisplayDataNeeded = LocalDisplayData[LocalScreenName];

        if (LocalDisplayDataNeeded !== undefined) {
            LocalReturnObject.TableColumns = CommonReOrder.StartFunc({
                inTableColumns: LocalDisplayDataNeeded.TableColumns,
                inTableInfo: LocalDisplayDataNeeded.TableInfo
            });

            LocalReturnObject.TableInfo = LocalDisplayDataNeeded.TableInfo;
            LocalReturnObject.JoinTables = LocalDisplayDataNeeded.JoinTables;
        };
    };

    return await LocalReturnObject;
};

let LocalPrepareTableData = async ({ inJsonConfig, inItemConfig, inDataPk, inColumns, inTableInfo }) => {
    let LocalFolderName = inJsonConfig.inFolderName;
    let LocalFileName = inJsonConfig.inJsonFileName;
    let LocalItemName = inItemConfig.inItemName;

    let LocalData = await CommonFilesPullData.FromItemNameAsArray({
        inFolderName: LocalFolderName,
        inFileNameWithExtension: LocalFileName,
        inItemName: LocalItemName,
        inDataPk
    });

    let LocalReturnData = LocalData;

    if ("TableInfoServerSide" in inTableInfo) {
        if (inTableInfo.TableInfoServerSide.TransformFromReports) {
            let LocalTransformedColumns = inColumns.map(element => {
                element.DisplayColumn = element.DataAttribute;

                if (element.hasOwnProperty("Name") === false) { element.Name = element.DataAttribute };

                return element;
            });
            //console.log("LocalData : ", LocalData[0]);
            LocalReturnData = CommonFromReports.Transform({
                inColumns: LocalTransformedColumns,
                inData: LocalData
            });
            //console.log("LocalReturnData : ", LocalReturnData[0]);
        };
    };

    return await LocalReturnData;
};

let StartFunc = async ({ inJsonConfig, inItemConfig, inDataPk }) => {
    let LocalReturnObject = { KTF: false, KMessage: "", DataFromServer: "" };

    if (inDataPk > 0) {
        let LocalDataFromTransformToUi;
        let LocalDataFromServer = [];
        let LocalReturnArrayObject = { HTMLControlType: "Table", KData: {} };

        let LocalDisplayDataNeeded = await LocalPrepareTableConfig({ inJsonConfig, inItemConfig, inUserPK: inDataPk });

        let LocalData = await LocalPrepareTableData({
            inJsonConfig, inItemConfig, inDataPk,
            inColumns: LocalDisplayDataNeeded.TableColumns, inTableInfo: LocalDisplayDataNeeded.TableInfo
        });

        LocalDataFromTransformToUi = CommonPullDataTransformData.FromTransformToUi({
            inData: LocalData, inDisplayJsonData: LocalDisplayDataNeeded,
            inUserPK: inDataPk
        });

        LocalReturnArrayObject.KData.TableColumns = LocalDisplayDataNeeded.TableColumns;
        LocalReturnArrayObject.KData.TableInfo = LocalDisplayDataNeeded.TableInfo;

        if (!LocalReturnArrayObject.KData.TableInfo.hasOwnProperty("DataAttributes")) { LocalReturnArrayObject.KData.TableInfo.DataAttributes = {} };

        LocalReturnArrayObject.KData.TableInfo.DataAttributes.JsonConfig = JSON.stringify(inJsonConfig);
        LocalReturnArrayObject.KData.TableInfo.DataAttributes.ItemConfig = JSON.stringify(inItemConfig);

        LocalReturnArrayObject.KData.TableData = LocalDataFromTransformToUi
        LocalDataFromServer.push(LocalReturnArrayObject);

        //        return { KTF: true, KMessage: "", DataFromServer: LocalDataFromServer };
        LocalReturnObject.KTF = true;
        LocalReturnObject.DataFromServer = LocalDataFromServer;
    };

    return await LocalReturnObject;
};

module.exports = { StartFunc };
