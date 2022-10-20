let CommonDisplayPullData = require("../Fs/DefultFileNames/Display/PullData");
let CommonFilesPullData = require("../Fs/Files/PullData");
let CommonPullDataTransformData = require("../PullData/TransformData");
let CommonReportsVouchersConsiderTransform = require("../Reports/CommonFuncs/VouchersConsider/Transform");
let CommonPullData = require("../Fs/Config/Folders/Files/PullData/FromData");
let CommonReOrder = require("../CommonTableFuncs/TableFuncs/ReOrder");

let LocalPrepareTableConfig = ({ inJsonConfig, inItemConfig, inUserPK }) => {
    let LocalDisplayDataNeeded;
    let LocalReturnObject = {
        TableColumns: [],
        TableInfo: {},
        JoinTables: []
    };

    let LocalDisplayData = CommonDisplayPullData.ReturnDataFromJson({ inJsonConfig, inUserPK });
    LocalDisplayDataNeeded = CommonDisplayPullData.FromItemConfig({ inDisplayJsonData: LocalDisplayData, inItemConfig });

    if (LocalDisplayDataNeeded !== undefined) {
        //LocalReturnObject.TableColumns = LocalDisplayDataNeeded.TableColumns;

        LocalReturnObject.TableColumns = CommonReOrder.StartFunc({
            inTableColumns: LocalDisplayDataNeeded.TableColumns,
            inTableInfo: LocalDisplayDataNeeded.TableInfo
        });

        LocalReturnObject.TableInfo = LocalDisplayDataNeeded.TableInfo;
        LocalReturnObject.JoinTables = LocalDisplayDataNeeded.JoinTables;
    };

    return LocalReturnObject;
};

let LocalPrepareTableData = ({ inJsonConfig, inItemConfig, inUserPK, inColumns, inTableInfo }) => {
    let LocalData = CommonFilesPullData.ReturnDataFromJsonWithItemNameAsArray({ inJsonConfig, inItemConfig, inUserPK });
    let LocalReturnData = LocalData;
    if ("TableInfoServerSide" in inTableInfo) {
        if (inTableInfo.TableInfoServerSide.TransformFromReports) {
            let LocalTransformedColumns = inColumns.map(element => {
                element.DisplayColumn = element.DataAttribute;

                if (element.hasOwnProperty("Name") === false) { element.Name = element.DataAttribute };

                return element;
            });

            LocalReturnData = CommonReportsVouchersConsiderTransform.Transform({ inColumns: LocalTransformedColumns, inData: LocalData });
        };
    };

    return LocalReturnData;
};

let WithDisplayJSON = ({ inJsonConfig, inItemConfig, inUserPK }) => {
    let LocalReturnObject = { KTF: false, KMessage: "", DataFromServer: "" };

    if (inUserPK > 0) {
        let LocalDataFromTransformToUi;
        let LocalDataFromServer = [];
        let LocalReturnArrayObject = { HTMLControlType: "Table", KData: {} };

        let LocalDisplayDataNeeded = LocalPrepareTableConfig({ inJsonConfig, inItemConfig, inUserPK });

        let LocalData = LocalPrepareTableData({ inJsonConfig, inItemConfig, inUserPK, inColumns: LocalDisplayDataNeeded.TableColumns, inTableInfo: LocalDisplayDataNeeded.TableInfo });
        LocalDataFromTransformToUi = CommonPullDataTransformData.FromTransformToUi({ inData: LocalData, inDisplayJsonData: LocalDisplayDataNeeded, inUserPK });

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

    return LocalReturnObject;
};

let OnlyJsonData = ({ inJsonConfig, inItemConfig, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalData = CommonFilesPullData.ReturnDataFromJsonWithItemNameAsArray({ inJsonConfig, inItemConfig, inUserPK });
        return { KTF: true, KMessage: "", DataFromServer: LocalData };
    }
};

let OnlyJsonDataAndTransform = ({ inJsonConfig, inItemConfig, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalDisplayDataNeeded = LocalPrepareTableConfig({ inJsonConfig, inItemConfig, inUserPK });

        let LocalData = LocalPrepareTableData({ inJsonConfig, inItemConfig, inUserPK, inColumns: LocalDisplayDataNeeded.TableColumns, inTableInfo: LocalDisplayDataNeeded.TableInfo });

        return { KTF: true, KMessage: "", DataFromServer: LocalData };
    }
};

let LocalDataTransformToScreen = async ({ inData, inScreenColumns }) => {
    let LocalLoopObject;
    //   console.log("inData : ", inData);
    let LocalReturnData;

    if (Array.isArray(inData)) {
        LocalReturnData = inData.map(LoopItemData => {
            LocalLoopObject = {};
            inScreenColumns.forEach(LoopItemColumn => {
                LocalLoopObject[LoopItemColumn] = LoopItemData[LoopItemColumn];
            });

            return LocalLoopObject
        });
    } else {
        LocalReturnData = Object.entries(inData).map(([key, value]) => {
            value.pk = key;

            return value;
        });
    };

    return await LocalReturnData;
};

let LocalPrepareTableDataForShowColumns = async ({ inJsonConfig, inItemConfig, inUserPK, inColumns }) => {
    //let LocalData = CommonFilesPullData.ReturnDataFromJsonWithItemNameAsArray({ inJsonConfig, inItemConfig, inUserPK });
    let LocalData = await CommonPullData.FullJsonData({ inJsonConfig, inUserPK });
    let LocalReturnData;
    let LocalItemName = inItemConfig.inItemName;

    if (LocalData.KTF) {
        if (LocalItemName in LocalData.KResult) {
            let LocalShowColumns = inColumns.filter(element => element.ShowInTable).map(LoopItem => LoopItem.DataAttribute);

            if (LocalData !== undefined) {
                LocalReturnData = await LocalDataTransformToScreen({ inData: LocalData.KResult[LocalItemName], inScreenColumns: LocalShowColumns });
                // console.log("LocalReturnData : ", LocalReturnData);
                return await LocalReturnData;
            } else {
                return [];
            }
        } else {
            return [];
        };
    } else {
        return [];
    };
};

let OnlyShowColumns = async ({ inJsonConfig, inItemConfig, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalDisplayDataNeeded = LocalPrepareTableConfig({ inJsonConfig, inItemConfig, inUserPK });

        let LocalData = await LocalPrepareTableDataForShowColumns({
            inJsonConfig,
            inItemConfig, inUserPK, inColumns: LocalDisplayDataNeeded.TableColumns, inTableInfo: LocalDisplayDataNeeded.TableInfo
        });

        return { KTF: true, KMessage: "", DataFromServer: LocalData };
    }
};

module.exports = { WithDisplayJSON, OnlyJsonData, OnlyJsonDataAndTransform, OnlyShowColumns };
