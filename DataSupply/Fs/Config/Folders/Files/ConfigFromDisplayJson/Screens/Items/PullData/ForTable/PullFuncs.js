let CommonPullDataTransformData = require("../../../../../../../../../PullData/TransformData");

let CommonDisplayPullDataNew = require("../../../../../PullData/FromConfig")
let CommonReOrder = require("../../../../../../../../../CommonTableFuncs/TableFuncs/ReOrder");

let CommonFilesPullData = require("../../../../../Items/PullData/FromDataFolder/Pull");

let LocalPrepareTableConfig = async ({ inJsonConfig, inItemConfig, inUserPK }) => {
    let LocalDisplayDataNeeded;
    let LocalReturnObject = {
        TableColumns: [],
        TableInfo: {},
        JoinTables: []
    };
    let LocalScreenName = inItemConfig.inScreenName;
    let LocalItemName = inItemConfig.inItemName;

    let LocalDisplayData = await CommonDisplayPullDataNew.AsJsonAsync({ inJsonConfig, inUserPK });
    
    if (LocalItemName in LocalDisplayData) {
        if (LocalScreenName in LocalDisplayData[LocalItemName]) {
            LocalDisplayDataNeeded = LocalDisplayData[LocalItemName][LocalScreenName];

            if (LocalDisplayDataNeeded !== undefined) {
                LocalReturnObject.TableColumns = CommonReOrder.StartFunc({
                    inTableColumns: LocalDisplayDataNeeded.TableColumns,
                    inTableInfo: LocalDisplayDataNeeded.TableInfo
                });

                LocalReturnObject.TableInfo = LocalDisplayDataNeeded.TableInfo;
                LocalReturnObject.JoinTables = LocalDisplayDataNeeded.JoinTables;
            };
        };
    };

    return await LocalReturnObject;
};

let LocalPrepareTableData = async ({ inJsonConfig, inItemConfig, inDataPk, inColumns, inTableInfo }) => {
    let LocalItemName = inItemConfig.inItemName;
    let LocalReturnData;

    let LocalData = await CommonFilesPullData.AsArrayWithPK({
        inJsonConfig,
        inItemName: LocalItemName,
        inDataPK: inDataPk
    });

    if (LocalData.KTF) {
        LocalReturnData = LocalData.ArrayData;

        if ("TableInfoServerSide" in inTableInfo) {
            if (inTableInfo.TableInfoServerSide.TransformFromReports) {
                let LocalTransformedColumns = inColumns.map(element => {
                    element.DisplayColumn = element.DataAttribute;

                    if (element.hasOwnProperty("Name") === false) { element.Name = element.DataAttribute };

                    return element;
                });

                LocalReturnData = CommonReportsVouchersConsiderTransform.Transform({
                    inColumns: LocalTransformedColumns,
                    inData: LocalData
                });
            };
        };
    };

    return await LocalReturnData;
};

let LocalSubFuncs = {
    CreateArrayElement: async ({ inDisplayDataNeeded, inJsonConfig, inItemConfig, inDataPk }) => {
        let LocalReturnArrayObject = { HTMLControlType: "MainTable", KData: {} };

        LocalReturnArrayObject.KData.TableColumns = inDisplayDataNeeded.TableColumns;
        LocalReturnArrayObject.KData.TableInfo = inDisplayDataNeeded.TableInfo;

        if (!LocalReturnArrayObject.KData.TableInfo.hasOwnProperty("DataAttributes")) { LocalReturnArrayObject.KData.TableInfo.DataAttributes = {} };

        LocalReturnArrayObject.KData.TableInfo.DataAttributes.JsonConfig = JSON.stringify(inJsonConfig);
        LocalReturnArrayObject.KData.TableInfo.DataAttributes.ItemConfig = JSON.stringify(inItemConfig);

        LocalReturnArrayObject.KData.TableData = await LocalSubFuncs.SubFuncs.ForTableData({ inDisplayDataNeeded, inJsonConfig, inItemConfig, inDataPk });

        return await LocalReturnArrayObject;
    },
    SubFuncs: {
        ForTableData: async ({ inDisplayDataNeeded, inJsonConfig, inItemConfig, inDataPk }) => {
            let LocalData = await LocalPrepareTableData({
                inJsonConfig, inItemConfig, inDataPk,
                inColumns: inDisplayDataNeeded.TableColumns, inTableInfo: inDisplayDataNeeded.TableInfo
            });

            let LocalDataFromTransformToUi = CommonPullDataTransformData.FromTransformToUi({
                inData: LocalData, inDisplayJsonData: inDisplayDataNeeded,
                inUserPK: inDataPk
            });

            return await LocalDataFromTransformToUi;
        }
    }
};

let StartFunc = async ({ inJsonConfig, inItemConfig, inDataPk }) => {
    let LocalReturnObject = { KTF: false, KMessage: "", DataFromServer: "" };

    if (inDataPk > 0) {
        let LocalDataFromServer = [];
        let LocalReturnArrayObject;

        let LocalDisplayDataNeeded = await LocalPrepareTableConfig({ inJsonConfig, inItemConfig, inUserPK: inDataPk });

        LocalReturnArrayObject = await LocalSubFuncs.CreateArrayElement({
            inDisplayDataNeeded: LocalDisplayDataNeeded,
            inJsonConfig, inItemConfig,
            inDataPk
        });
        LocalDataFromServer.push(LocalReturnArrayObject);

        LocalReturnObject.KTF = true;
        LocalReturnObject.DataFromServer = LocalDataFromServer;
    };

    return await LocalReturnObject;
};

module.exports = { StartFunc };
