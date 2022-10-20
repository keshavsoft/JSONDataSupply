//let GlobalCommonPullUserData = require("../../../../Fs/Data/Items/PullData");

let GlobalCommonPullUserData = require("../../../../../../Items/PullData/FromDataFolder/Pull");
//require("../../../../../../PullData/")
let GlobalToUiTableShow = require("../../../../../../../../../../ToUi/TableShow");

let CommonTableRowShow = require("../../../../../../../../../../Table/Row/Show");
let CommonPullDataConfigFromFile = require("../../../../../../PullData/From-ConfigFromFile");

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

exports.StartFunc = async ({ inJsonConfig, inItemConfig, inPK, inDataPk }) => {
    console.log("Route:", inJsonConfig, inItemConfig, inPK, inDataPk);
    let LocalHtmlVerticalObject;
    let LocalReturnArray = [];
    let LocallReturnData = { KTF: true };

    if (inDataPk > 0) {
        LocalHtmlVerticalObject = await LocalPrepareHTMLObject.Vertical({ inJsonConfig, inItemConfig, inPK, inDataPk });

        LocalSubTablesArray = await LocalPrepareHTMLObject.SubTables.StartFunc({
            inJsonConfig,
            inItemConfig, inPK, inDataPk
        })
        LocalReturnArray.push(LocalHtmlVerticalObject);
        LocallReturnData.DataFromServer = [...LocalReturnArray, ...LocalSubTablesArray];
    };

    return await LocallReturnData;
};

let LocalPrepareHTMLObject = {
    Vertical: async ({ inJsonConfig, inItemConfig, inPK, inDataPk }) => {
        let LocalScreenName = inItemConfig.inScreenName;

        let LocalHtmlVerticalObject = { HTMLControlType: "VerticalForShow", KData: {} };
        let LocalDisplayForFileJsonData = await CommonPullDataConfigFromFile.AsJsonAsync({ inJsonConfig, inUserPK: inDataPk });
        console.log("LocalScreenName : ", LocalScreenName, inItemConfig);

        if (LocalScreenName in LocalDisplayForFileJsonData) {
            console.log("LocalDisplayForFileJsonData : ", LocalScreenName);
            let LocalTableInfo = LocalDisplayForFileJsonData[LocalScreenName]["TableInfo"];
            LocalHtmlVerticalObject.KData.TableColumns = LocalDisplayForFileJsonData[LocalScreenName]["TableColumns"];
            LocalHtmlVerticalObject.KData.TableInfo = LocalTableInfo;

            LocalHtmlVerticalObject.KData.TableInfo.kPK = inPK;

            LocalHtmlVerticalObject.KData.TableInfo.DataAttributes.JsonConfig = JSON.stringify(inJsonConfig);
            LocalHtmlVerticalObject.KData.TableInfo.DataAttributes.ItemConfig = JSON.stringify(inItemConfig);

            await LocalPrepareHTMLObject.InsertDefaultValues.Vertical.StartFunc({
                inJsonConfig,
                inTableColumns: LocalHtmlVerticalObject.KData.TableColumns, inItemConfig, inPK, inDataPk, inTableInfo: LocalTableInfo
            })
        };

        return await LocalHtmlVerticalObject;
    },
    InsertDefaultValues: {
        Vertical: {
            StartFunc: async ({ inJsonConfig, inTableColumns, inItemConfig, inPK, inDataPk, inTableInfo }) => {
                let LocalFolderName = inJsonConfig.inFolderName;
                let LocalFileName = inJsonConfig.inJsonFileName;
                let LocalItemName = inItemConfig.inItemName;

                const LocalTransactionData = await GlobalCommonPullUserData.FromItemName({
                    inFolderName: LocalFolderName,
                    inFileNameWithExtension: LocalFileName,
                    inItemName: LocalItemName,
                    inDataPk
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
            }
        }
    },
    SubTables: {
        StartFunc: async ({ inJsonConfig, inItemConfig, inPK, inDataPk }) => {
            let LocalScreenName = inItemConfig.inScreenName;

            let LocalHtmlVerticalObject;
            let LocalReturnArray = [];
            let LocalData;
            let LocalDataToArray = [];

            let LocalDisplayForFileJsonData = await CommonPullDataConfigFromFile.AsJsonAsync({ inJsonConfig, inUserPK: inDataPk });

            if (LocalScreenName in LocalDisplayForFileJsonData) {
                let LocalSubTableColumns = LocalDisplayForFileJsonData[LocalScreenName]["SubTableColumns"];

                if (LocalSubTableColumns !== undefined) {
                    let LocalTransactionData = await CommonTableRowShow.Vertical({
                        inJsonConfig, inItemConfig, inDataPk,
                        inPK
                    });
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

                                LocalReturnArray.push(LocalHtmlVerticalObject);
                            };
                        });
                    };
                };
            };

            return await LocalReturnArray;
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