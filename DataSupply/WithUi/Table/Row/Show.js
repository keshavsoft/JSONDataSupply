//let GlobalCommonPullData = require("../../../Fs/DefultFileNames/Display/PullData");

let GlobalCommonPullData = require("../../../Fs/Config/Folders/Files/ConfigFromDisplayJson/Screens/Items/PullData/FromDisplayJson/FromJson");

//let GlobalCommonPullUserData = require("../../../Fs/Data/Items/PullData");
let GlobalCommonPullUserData = require("../../../Fs/Config/Folders/Files/Items/PullData/FromDataFolder/Pull");

let GlobalToUiTableShow = require("../../../ToUi/TableShow")
let CommonTableRowShow = require("../../../Table/Row/Show");

let LocalArrayToObject = ({ inArray }) => {
    let LocalDataToArray = [];

    Object.entries(inArray).forEach(
        ([key, value]) => {
            value.pk = key;
            LocalDataToArray.push(value);
        }
    );

    return LocalDataToArray;
};

exports.Show = ({ inJsonConfig, inItemConfig, inPK, inUserPK }) => {
    let LocalHtmlVerticalObject;
    let LocalReturnArray = [];
    let LocallReturnData = { KTF: true };

    if (inUserPK > 0) {
        LocalHtmlVerticalObject = LocalPrepareHTMLObject.Vertical({ inJsonConfig, inItemConfig, inPK, inUserPK });
        LocalSubTablesArray = LocalPrepareHTMLObject.SubTables.StartFunc({ inJsonConfig, inItemConfig, inPK, inUserPK })
        LocalReturnArray.push(LocalHtmlVerticalObject);
        LocallReturnData.DataFromServer = [...LocalReturnArray, ...LocalSubTablesArray];
        return LocallReturnData;
    };
};

let LocalPrepareHTMLObject = {
    Vertical: ({ inJsonConfig, inItemConfig, inPK, inUserPK }) => {
        let LocalHtmlVerticalObject = { HTMLControlType: "VerticalForShow", KData: {} };
        let LocalTransactionsDisplay = GlobalCommonPullData.AsJsonAsync({
            inJsonConfig,
            inItemConfig,
            inDataPK: inUserPK
        });

        let LocalTableInfo = LocalTransactionsDisplay["TableInfo"];
        LocalHtmlVerticalObject.KData.TableColumns = LocalTransactionsDisplay["TableColumns"];
        LocalHtmlVerticalObject.KData.TableInfo = LocalTableInfo;

        LocalHtmlVerticalObject.KData.TableInfo.kPK = inPK;

        LocalHtmlVerticalObject.KData.TableInfo.DataAttributes.JsonConfig = JSON.stringify(inJsonConfig);
        LocalHtmlVerticalObject.KData.TableInfo.DataAttributes.ItemConfig = JSON.stringify(inItemConfig);

        LocalPrepareHTMLObject.InsertDefaultValues.Vertical.StartFunc({ inJsonConfig, inTableColumns: LocalHtmlVerticalObject.KData.TableColumns, inItemConfig, inPK, inUserPK, inTableInfo: LocalTableInfo })
        return LocalHtmlVerticalObject;
    },
    InsertDefaultValues: {
        Vertical: {
            StartFunc: ({ inJsonConfig, inTableColumns, inItemConfig, inPK, inUserPK, inTableInfo }) => {
                let LocalItemName = inItemConfig.inItemName;

                const LocalFromUserData = GlobalCommonPullUserData.FromJsonConfigWithItemName({
                    inJsonConfig,
                    inItemName: LocalItemName,
                    inUserPK
                });

                if (LocalFromUserData.KTF) {
                    let LocalDataToShowInDefaultValues = LocalFromUserData.KResult[inPK];
                    let LocalDataToShowInDefaultValuesAfterTransform = LocalDataToShowInDefaultValues;

                    let LocalDefaultValue;

                    let LocalTableColumnsToTransform = inTableColumns.filter(LoopItem => {
                        if ("DefaultValueShow" in LoopItem.ServerSide) {
                            return LoopItem.ServerSide.DefaultValueShow.Transform === true;
                        };
                    });

                    if (inTableInfo.hasOwnProperty("TableInfoServerSide")) {
                        if (inTableInfo.TableInfoServerSide.TransformToUi) {
                            LocalDataToShowInDefaultValuesAfterTransform = GlobalToUiTableShow.TransformData({ inLoopItemData: LocalDataToShowInDefaultValues, inTableColumnsToTransform: LocalTableColumnsToTransform });
                        };
                    };

                    inTableColumns.forEach((LoopItem) => {
                        let LocalFilterObject = {};
                        LocalDefaultValue = LocalDataToShowInDefaultValuesAfterTransform[LoopItem.DataAttribute];
                        let LocalReturnValue = LocalDefaultValue;
                        let LocalLoopValue;
                        LocalFilterObject.DisplayName = LoopItem.DisplayName;
                        //LocalFilterColumnObject = _.find(inTableColumns, LocalFilterObject);
                        if (LocalLoopValue !== undefined) {
                            LocalReturnValue = LocalLoopValue;
                        }
                        LoopItem.DefaultValue = LocalReturnValue;

                    });
                };
            }
        }
    },
    SubTables: {
        StartFunc: ({ inJsonConfig, inItemConfig, inPK, inUserPK }) => {
            let LocalHtmlVerticalObject;
            let LocalReturnArray = [];
            let LocalData;
            let LocalDataToArray = [];

            let LocalTransactionsDisplay = GlobalCommonPullData.AsJsonAsync({ inJsonConfig, inItemConfig, inDataPK: inUserPK });

            let LocalSubTableColumns = LocalTransactionsDisplay["SubTableColumns"];

            if (LocalSubTableColumns !== undefined) {
                let LocalTransactionData = CommonTableRowShow.Vertical({ inJsonConfig, inItemConfig, inUserPK, inPK });

                if (Object.keys(LocalSubTableColumns).length > 0) {
                    Object.entries(LocalSubTableColumns).forEach(([TableColumnKey, TableColumnValue]) => {
                        if (TableColumnKey in LocalTransactionData) {
                            LocalData = LocalTransactionData[TableColumnKey];

                            LocalDataToArray = LocalArrayToObject({ inArray: LocalData });

                            LocalHtmlVerticalObject = LocalPrepareHTMLObject.SubTables.CommonFuncs.CreateObjectForUi({
                                inData: LocalDataToArray,
                                inDisplayJsonData: TableColumnValue,
                                inTableColumnKey: TableColumnKey, inPK,
                                inJsonConfig, inItemConfig
                            });
                            //   console.log("LocalHtmlVerticalObject : ", LocalHtmlVerticalObject);

                            LocalReturnArray.push(LocalHtmlVerticalObject);
                        };
                    });
                };
            };
            //console.log("LocalReturnArray : ", LocalReturnArray);
            return LocalReturnArray;
        },
        SubFuncs: {
            SubTableColumnsLoop: ({ inData, inDisplayJsonData, inTableColumnValue, inTableColumnKey, inPK }) => {
                let LocalHtmlVerticalObject = {
                    HTMLControlType: "Table", KData: {}
                };

                let LocalTableData;

                try {
                    LocalHtmlVerticalObject.KData.TableColumns = inTableColumnValue.TableColumns;
                    LocalHtmlVerticalObject.KData.TableInfo = inTableColumnValue.TableInfo;
                    LocalHtmlVerticalObject.KData.TableInfo.DataAttributes.InsertKey = inTableColumnKey;
                    LocalHtmlVerticalObject.KData.TableInfo.DataAttributes.PK = inPK;

                    let LocalTableColumnsToTransform = inDisplayJsonData["TableColumns"].filter(LoopItem => {
                        return LoopItem.ServerSide.DefaultValueShow.Transform === true;
                    });

                    LocalTableData = CommonTableRowShow.SubTable({ inLoopItemData: inData, inTableColumnsToTransform: LocalTableColumnsToTransform });

                    LocalHtmlVerticalObject.KData.TableData = LocalTableData;
                } catch (error) {
                };

                return LocalHtmlVerticalObject;
            }
        },
        CommonFuncs: {
            CreateObjectForUi: ({ inData, inDisplayJsonData, inTableColumnKey, inPK, inJsonConfig, inItemConfig }) => {
                let LocalHtmlVerticalObject = CommonTableRowShow.SubTable({
                    inData,
                    inDisplayJsonData, inTableColumnKey, inPK
                });

                if ("TableInfo" in LocalHtmlVerticalObject.KData) {
                    if ("DataAttributes" in LocalHtmlVerticalObject.KData.TableInfo) {
                        LocalHtmlVerticalObject.KData.TableInfo.DataAttributes.JsonConfig = JSON.stringify(inJsonConfig);
                        LocalHtmlVerticalObject.KData.TableInfo.DataAttributes.ItemConfig = JSON.stringify(inItemConfig);
                    };
                };

                return LocalHtmlVerticalObject;

            }
        }
    }
};