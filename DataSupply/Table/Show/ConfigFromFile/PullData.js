let CommonPullDataTransformData = require("../../../PullData/TransformData");
let CommonDisplayPullData = require("../../../Fs/DefultFileNames/Display/PullData");

let CommonDisplayPullDataNew = require("../../../Fs/Config/Folders/Files/PullData/From-ConfigFromFile");

let CommonReOrder = require("../../../CommonTableFuncs/TableFuncs/ReOrder");
let CommonFilesPullData = require("../../../Fs/Files/PullData");

let LocalPrepareTableConfig = async ({ inJsonConfig, inItemConfig, inUserPK }) => {
    let LocalDisplayDataNeeded;
    let LocalReturnObject = {
        TableColumns: [],
        TableInfo: {},
        JoinTables: []
    };
    let LocalScreenName = inItemConfig.inScreenName;

    console.log("inItemConfig : ", inItemConfig);
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

let StartFunc = async ({ inJsonConfig, inItemConfig, inUserPK }) => {
    let LocalReturnObject = { KTF: false, KMessage: "", DataFromServer: "" };

    if (inUserPK > 0) {
        let LocalDataFromTransformToUi;
        let LocalDataFromServer = [];
        let LocalReturnArrayObject = { HTMLControlType: "Table", KData: {} };

        let LocalDisplayDataNeeded = await LocalPrepareTableConfig({ inJsonConfig, inItemConfig, inUserPK });

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

    return await LocalReturnObject;
};

module.exports = { StartFunc };
