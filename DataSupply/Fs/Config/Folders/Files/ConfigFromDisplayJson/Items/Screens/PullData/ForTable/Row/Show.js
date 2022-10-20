let GlobalCommonPullUserData = require("../../../../../../Items/PullData/FromDataFolder/Pull");
let GlobalToUiTableShow = require("../../../../../../../../../../ToUi/TableShow");

let CommonSubTable = require("../../../../../CommonFuns/ForTable/SubTable");

let CommonFromRowPK = require("../../../../../../Items/PullData/FromDataFolder/PullFuncs/FromRowPK");
let CommonFromDisplayJson = require("../../FromDisplayJson/ReturnAsJson");

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

exports.StartFunc = async ({ inJsonConfig, inItemConfig, inPK, inDataPK }) => {
    let LocalHtmlVerticalObject;
    let LocalReturnArray = [];
    let LocallReturnData = { KTF: true };
    let LocalSubTablesArray;
    
    if (inDataPK > 0) {
        LocalHtmlVerticalObject = await LocalPrepareHTMLObject.Vertical({
            inJsonConfig,
            inItemConfig, inPK, inDataPK
        });

        LocalSubTablesArray = await LocalPrepareHTMLObject.SubTables.StartFunc({
            inJsonConfig,
            inItemConfig, inPK, inDataPK
        });

        LocalReturnArray.push(LocalHtmlVerticalObject);
        LocallReturnData.DataFromServer = [...LocalReturnArray, ...LocalSubTablesArray];
    };

    return await LocallReturnData;
};

let LocalPrepareHTMLObject = {
    Vertical: async ({ inJsonConfig, inItemConfig, inPK, inDataPK }) => {
        let LocalHtmlVerticalObject = { KTF: false, HTMLControlType: "VerticalForShow", KData: {}, KReason: "" };

        let LocalDisplayForFileJsonData = await CommonFromDisplayJson.FromJsonItemConfig({
            inJsonConfig,
            inItemConfig,
            inDataPK
        });
        if (LocalDisplayForFileJsonData.KTF === false) {
            LocalHtmlVerticalObject.KReason = LocalDisplayForFileJsonData.KReason;
            return await LocalHtmlVerticalObject;
        };

        let LocalTableInfo = LocalDisplayForFileJsonData.DataFromServer["TableInfo"];
        LocalHtmlVerticalObject.KData.TableColumns = LocalDisplayForFileJsonData.DataFromServer["TableColumns"];
        LocalHtmlVerticalObject.KData.TableInfo = LocalTableInfo;

        LocalHtmlVerticalObject.KData.TableInfo.kPK = inPK;

        LocalHtmlVerticalObject.KData.TableInfo.DataAttributes.JsonConfig = JSON.stringify(inJsonConfig);
        LocalHtmlVerticalObject.KData.TableInfo.DataAttributes.ItemConfig = JSON.stringify(inItemConfig);

        await LocalPrepareHTMLObject.InsertDefaultValues.Vertical.StartFunc({
            inJsonConfig,
            inTableColumns: LocalHtmlVerticalObject.KData.TableColumns, inItemConfig, inPK, inDataPK,
            inTableInfo: LocalTableInfo
        });

        return await LocalHtmlVerticalObject;
    },
    InsertDefaultValues: {
        Vertical: {
            StartFunc: async ({ inJsonConfig, inTableColumns, inItemConfig, inPK, inDataPK, inTableInfo }) => {
                let LocalItemName = inItemConfig.inItemName;

                const LocalTransactionData = await GlobalCommonPullUserData.AsJsonAsyncAsObject({
                    inJsonConfig,
                    inItemName: LocalItemName,
                    inDataPK
                });
                let LocalDataToShowInDefaultValues = LocalTransactionData[inPK];
                let LocalDataToShowInDefaultValuesAfterTransform = LocalDataToShowInDefaultValues;

                let LocalDefaultValue;
                let LocalTableColumnsToTransform = inTableColumns.filter(LoopItem => {
                    if ("DefaultValueShow" in LoopItem.ServerSide) {
                        return LoopItem.ServerSide.DefaultValueShow.Transform === true;
                    };
                });

                if (inTableInfo.hasOwnProperty("TableInfoServerSide")) {
                    if (inTableInfo.TableInfoServerSide.TransformToUi) {
                        LocalDataToShowInDefaultValuesAfterTransform = GlobalToUiTableShow.TransformData({
                            inLoopItemData: LocalDataToShowInDefaultValues,
                            inTableColumnsToTransform: LocalTableColumnsToTransform
                        });

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
            }
        }
    },
    SubTables: {
        StartFunc: async ({ inJsonConfig, inItemConfig, inPK, inDataPK }) => {
            let LocalItemName = inItemConfig.inItemName;

            let LocalHtmlVerticalObject;
            let LocalReturnArray = [];
            let LocalData;
            let LocalDataToArray = [];

            let LocalDisplayForFileJsonData = await CommonFromDisplayJson.FromJsonItemConfig({
                inJsonConfig,
                inItemConfig,
                inDataPK
            });

            if (LocalDisplayForFileJsonData.KTF === false) {
                LocalHtmlVerticalObject.KReason = LocalDisplayForFileJsonData.KReason;
                return await LocalHtmlVerticalObject;
            };

            let LocalSubTableColumns = LocalDisplayForFileJsonData.DataFromServer["SubTableColumns"];
            
            if (LocalSubTableColumns !== undefined) {
                let LocalTransactionData = await CommonFromRowPK.AsJsonAsyncAsObject({
                    inJsonConfig, inItemName: LocalItemName,
                    inDataPK,
                    inRowPK: inPK
                });

                if (LocalTransactionData.KTF) {
                    if (Object.keys(LocalSubTableColumns).length > 0) {
                        Object.entries(LocalSubTableColumns).forEach(([TableColumnKey, TableColumnValue]) => {
                            if (TableColumnKey in LocalTransactionData.JsonData) {
                                LocalData = LocalTransactionData.JsonData[TableColumnKey];

                                LocalDataToArray = LocalArrayToObject({ inArray: LocalData });

                                LocalHtmlVerticalObject = LocalPrepareHTMLObject.SubTables.CommonFuncs.CreateObjectForUi({
                                    inData: LocalDataToArray,
                                    inDisplayJsonData: TableColumnValue,
                                    inTableColumnKey: TableColumnKey, inPK,
                                    inJsonConfig, inItemConfig
                                });

                                LocalReturnArray.push(LocalHtmlVerticalObject);
                            };
                        });
                    };
                };
            };
            return await LocalReturnArray;
        },
        CommonFuncs: {
            CreateObjectForUi: ({ inData, inDisplayJsonData, inTableColumnKey, inPK, inJsonConfig, inItemConfig }) => {
                let LocalHtmlVerticalObject = CommonSubTable.SubTable({
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