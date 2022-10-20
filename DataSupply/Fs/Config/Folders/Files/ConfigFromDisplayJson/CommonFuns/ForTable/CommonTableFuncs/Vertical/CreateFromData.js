let CommonDefaultValue = require("../ToUi/CalculateDefaultValue");
let CommonDisplayPullData = require("../Fs/DefultFileNames/Display/PullData");
let CommonFilesPullData = require("../Fs/Files/PullData");
let CommonReOrder = require("../CommonTableFuncs/TableFuncs/ReOrder");

let LocalPrepareJsonFromHtml = {
    ForSubTable: ({ inUserPK, inDisplayData, inUserData }) => {
        let LocalReturnArrayObject = { HTMLControlType: "Vertical", KData: {} };
        let LocalReturnData = { KTF: false };

        //KReason
        if (inDisplayData.TableInfo.hasOwnProperty("DefaultValues")) {
            let LocalSaveFirstRow = inDisplayData.TableInfo.DefaultValues.TableColumns.SaveFirstRow;

            if (inUserPK > 0) {
                LocalReturnArrayObject.KData.TableColumns = inDisplayData.SubTableColumns[LocalSaveFirstRow].TableColumns;
                LocalReturnArrayObject.KData.TableInfo = inDisplayData.SubTableColumns[LocalSaveFirstRow].TableInfo;

                CommonDefaultValue.CalculateDefaultValue({ inColumns: LocalReturnArrayObject.KData.TableColumns, inData: inUserData });

                if (!LocalReturnArrayObject.KData.TableInfo.hasOwnProperty("DataAttributes")) { LocalReturnArrayObject.KData.TableInfo.DataAttributes = {} };
                LocalReturnArrayObject.KData.TableInfo.DataAttributes.InsertKey = LocalSaveFirstRow;
                LocalReturnData.KTF = true;
                LocalReturnData.DataFromServer = LocalReturnArrayObject;
                //return { KTF: true, DataFromServer: LocalReturnArrayObject };
            };
        } else {
            LocalReturnData.KReason = "TableInfo.DefaultValues not found";

            //  return { KTF: false };
        };

        return LocalReturnData;
    }
};

let LocalPrepareVertical = ({ inJsonConfig, inItemConfig, inUserPK, inDisplayData, inUserData }) => {
    let LocalReturnArrayObject = { HTMLControlType: "Vertical", KData: {} };

    if (inUserPK > 0) {
        //let LocalUserDataNeeded = inUserData[LocalItemName];
        let LocalUserDataNeeded = inUserData;

        LocalReturnArrayObject.KData.TableColumns = inDisplayData.TableColumns;
        LocalReturnArrayObject.KData.TableInfo = inDisplayData.TableInfo;

        CommonDefaultValue.CalculateDefaultValue({ inColumns: LocalReturnArrayObject.KData.TableColumns, inData: LocalUserDataNeeded });

        if (!LocalReturnArrayObject.KData.TableInfo.hasOwnProperty("DataAttributes")) { LocalReturnArrayObject.KData.TableInfo.DataAttributes = {} };

        LocalReturnArrayObject.KData.TableInfo.DataAttributes.JsonConfig = JSON.stringify(inJsonConfig);
        LocalReturnArrayObject.KData.TableInfo.DataAttributes.ItemConfig = JSON.stringify(inItemConfig);

        return LocalReturnArrayObject;
    };
};

let LocalPrepareTables = ({ inItemConfig, inUserPK, inDisplayData }) => {
    let LocalItemName = inItemConfig.inItemName;
    let LocalScreenName = inItemConfig.inScreenName;
    let LocalSubTableColumns;
    let LocalArray = [];
    let LocalReturnArrayObject;

    if (inUserPK > 0) {
        if (inDisplayData.hasOwnProperty("SubTableColumns")) {
            LocalSubTableColumns = inDisplayData.SubTableColumns;

            for (const property in LocalSubTableColumns) {
                LocalReturnArrayObject = { HTMLControlType: "Table", KData: { TableData: [], TableInfo: {} } };

                LocalReturnArrayObject.KData.TableColumns = CommonReOrder.StartFunc({
                    inTableColumns: LocalSubTableColumns[property].TableColumns,
                    inTableInfo: LocalSubTableColumns[property].TableInfo
                });

                LocalReturnArrayObject.KData.TableInfo = LocalSubTableColumns[property].TableInfo;

                LocalArray.push(LocalReturnArrayObject);
            };
        };

        return LocalArray;
    };
};

let ShowWithDataPK = ({ inJsonConfig, inItemConfig, inDataPK }) => {
    let LocalSubTableArray = [];
    if (inDataPK > 0) {
        try {
            let LocalDisplayData = CommonDisplayPullData.ReturnDataFromJsonAndItemName({ inJsonConfig, inItemConfig, inUserPK: inDataPK });

            let LocalUserData = CommonFilesPullData.ReturnDataFromJsonWithItemName({ inJsonConfig, inItemConfig, inUserPK: inDataPK });
            
            let LocalVerticalObject = LocalPrepareVertical({
                inJsonConfig, inItemConfig,
                inUserPK: inDataPK, inDisplayData: LocalDisplayData, inUserData: LocalUserData
            });

            LocalSubTableArray = LocalPrepareTables({ inJsonConfig, inItemConfig, inUserPK: inDataPK, inDisplayData: LocalDisplayData, inUserData: LocalUserData });

            return { KTF: true, DataFromServer: [LocalVerticalObject, ...LocalSubTableArray] };
        } catch (error) {
            console.log("error--------- : ", error);
        };
    };
};

let ForSubTable = ({ inJsonConfig, inItemConfig, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalDisplayData = CommonDisplayPullData.ReturnDataFromJsonAndItemName({ inJsonConfig, inItemConfig, inUserPK });
        let LocalUserData = CommonFilesPullData.ReturnDataFromJsonWithItemName({ inJsonConfig, inItemConfig, inUserPK });

        LocalReturnData = LocalPrepareJsonFromHtml.ForSubTable({ inItemConfig, inUserPK, inDisplayData: LocalDisplayData, inUserData: LocalUserData });
        if (LocalReturnData.KTF) {
            LocalReturnData.DataFromServer.KData.TableInfo.DataAttributes.JsonConfig = JSON.stringify(inJsonConfig);
            LocalReturnData.DataFromServer.KData.TableInfo.DataAttributes.ItemConfig = JSON.stringify(inItemConfig);

            return { KTF: true, DataFromServer: [LocalReturnData.DataFromServer] };
        } else {
            return LocalReturnData;
        }
    };
};

module.exports = { ShowWithDataPK, ForSubTable };
