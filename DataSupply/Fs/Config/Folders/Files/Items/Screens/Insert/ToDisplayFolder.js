let CommonPullData = require("../../../PullData/FromConfig");
let CommonPushData = require("../../../PushData/ToConfig");

let CommonColumnJsonFuncs = require("../../../../../../../Fix/Json/SupplyJson");
//let CommonTemplatePath = "";
let CommonFromScreens = require("../../../../../../Templates/FromScreens");
//const TableInfoObject = require('../../../../Fix/Json/TableInfo.json');

let CommonPullDataFromConfigFolder = require("../../../PullData/FromConfigFolder/FromDisplayJson/AsJson");

let CommonFuns = {
    ConfigureJson: {
        TableInfo: {
            StartFunc: ({ inTableInfoObject, inJsonConfig, inItemName, inScreenName }) => {
                inTableInfoObject.SearchRowArray.Label.KTF = true;
                inTableInfoObject.SearchRowArray.Label.DisplayObject.DisplayText = `${inJsonConfig.inFolderName} - ${inJsonConfig.inJsonFileName} - ${inItemName} - ${inScreenName}`;
                inTableInfoObject.SearchRowArray.Label.DisplayObject.ColClass = "md-5 col-sm-12 col-12";

                inTableInfoObject.SearchRowArray.Search.KTF = true;
                inTableInfoObject.SearchRowArray.Search.KTF = true;

                inTableInfoObject.SearchRowArray.Button.Footer.WithApi.KTF = true;
                inTableInfoObject.SearchRowArray.Button.Footer.WithApi.DisplayObject.Table = true;
                inTableInfoObject.SearchRowArray.Button.Footer.WithApi.DisplayObject.SvgPlus = true;

                inTableInfoObject.SearchRowArray.Button.NewWindow.KTF = true;
                inTableInfoObject.SearchRowArray.Button.NewWindow.DisplayObject.NewWindow = true;
                inTableInfoObject.SearchRowArray.Button.NewWindow.DisplayObject.SvgPlus = true;

                inTableInfoObject.SearchRowArray.Button.PopUp.KTF = true;
                inTableInfoObject.SearchRowArray.Button.PopUp.DisplayObject.Chat = true;
                inTableInfoObject.SearchRowArray.Button.PopUp.DisplayObject.SvgPlus = true;

                inTableInfoObject.Vertical.VerticalCreate.saveFromKeyAsTree = true;

                inTableInfoObject.TableRowOptions.Delete.Simple = true;
                inTableInfoObject.TableRowOptions.Show.Rowshow = true;
                inTableInfoObject.TableRowOptions.PopUp.Rowshow = true;
            }
        },
        TableColumn: {
            PkColumn: ({ inTableColumnObject }) => {
                inTableColumnObject.DisplayName = "pk";
                inTableColumnObject.DataAttribute = "pk";
                inTableColumnObject.CreateNew = false;
            }
        }
    }
};

class TableColumnFuncs {
    static FChange = ({ inObjToChange, inObjWithValues }) => {
        Object.entries(inObjToChange).forEach(
            ([key, value]) => {
                if (key in inObjWithValues) {
                    if (typeof value === "object") {
                        this.FChange({
                            inObjToChange: inObjToChange[key],
                            inObjWithValues: inObjWithValues[key]
                        });
                    } else {
                        inObjToChange[key] = inObjWithValues[key];
                    };

                };
            });
    }

    InsertDefaultValue = ({ inInsertMode, inLoopItem, inKey }) => {
        switch (inInsertMode) {
            case "FromKey":
                inLoopItem.DefaultValue = inKey;
                break;

            default:
                break;
        }
    }

    ForTableColumns = {
        ForPredefinedValues: {
            InFiles: ({ inJsonFileName, inFolderName, inScreenName, inUserPK }) => {
                let LocalReturnObject = {
                    KTF: false,
                    KResult: {}
                };

                let LocalFromScreens = CommonTemplates.FoldersAsObject({ inUserPK });

                if (inFolderName in LocalFromScreens) {
                    if (path.parse(inJsonFileName).name in LocalFromScreens[inFolderName]) {
                        if (inScreenName in LocalFromScreens[inFolderName][path.parse(inJsonFileName).name]) {
                            LocalReturnObject.KTF = true;
                            LocalReturnObject.KResult = LocalFromScreens[inFolderName][path.parse(inJsonFileName).name][inScreenName].TableColumns;
                        };
                    }
                };

                return LocalReturnObject;
            }
        }
    }

    static ForTableInfo = {
        WithPredefinedValues: ({ inScreenValue }) => {
            try {
                let LocalTableInfoObject = JSON.parse(JSON.stringify(CommonColumnJsonFuncs.TableInfo()));
                console.log("WithPredefinedValues start");
                if ("TableInfo" in inScreenValue) {
                    this.FChange({
                        inObjToChange: LocalTableInfoObject,
                        inObjWithValues: inScreenValue.TableInfo
                    });
                };
                console.log("WithPredefinedValues end");
                return LocalTableInfoObject;

            } catch (error) {
                console.log("error : ", error);
            };
        }
    }

    ForSubTableColumns = {
        StartFunc: ({ inJsonFileName, inFolderName, inScreenName, inSubTableColumns, inUserPK, inFirstRow }) => {
            let LocalReturnObject = {};

            try {
                let LocalColumnsArray = [];
                let LocalColumnsArrayOfObjects = [];
                let LocalFirstRowInsideSubTable;
                let LocalFirstRowInsideSubTableValues;

                let LocalTableInfoObject;

                inSubTableColumns.map(LoopItemSubTableColumn => {
                    if (LoopItemSubTableColumn in inFirstRow) {
                        LocalFirstRowInsideSubTable = inFirstRow[LoopItemSubTableColumn];
                        LocalFirstRowInsideSubTableValues = Object.values(inFirstRow[LoopItemSubTableColumn]);

                        if (LocalFirstRowInsideSubTableValues.length > 0) {
                            LocalColumnsArray = Object.keys(Object.values(inFirstRow[LoopItemSubTableColumn])[0]);

                            LocalColumnsArrayOfObjects = this.ForSubTableColumns.PrepareTableColumns({
                                inColumnsArray: LocalColumnsArray, inJsonFileName, inFolderName, inScreenName,
                                inUserPK,
                                inSubTableColumnName: LoopItemSubTableColumn
                            });

                            LocalTableInfoObject = CommonTableColumnFuncsObject.ForSubTableColumns.ForTableInfo.WithPredefinedValues({});

                            LocalReturnObject[LoopItemSubTableColumn] = {
                                TableColumns: LocalColumnsArrayOfObjects,
                                TableInfo: LocalTableInfoObject
                            };
                        };
                    };
                });

            } catch (error) {
                console.log("error : ", error);
            };
            return LocalReturnObject;
        },
        PrepareArray: ({ inItemDataValue }) => {
            let LocalFirstRow = Object.values(inItemDataValue)[0];
            //  let LocalSubTableColumnsFromFirstRow =
            let LocalReturnArray = [];
            Object.entries(LocalFirstRow).forEach(
                ([key, value]) => {
                    if (typeof value === 'object') {
                        LocalReturnArray.push(key);
                    }
                });

            return LocalReturnArray;
        },
        PrepareTableColumns: ({ inColumnsArray, inJsonFileName, inFolderName, inScreenName, inUserPK, inSubTableColumnName }) => {
            let LocalColumnsArrayOfObjects = this.FuncColumnsArrayToArrayOfObjects({ inColumnsArray });
            let LocalTableColumnsWithPredefinedValues = LocalColumnsArrayOfObjects;

            let LocalFromCheck = this.ForSubTableColumns.ForPredefinedValues.InFiles({ inJsonFileName, inFolderName, inScreenName, inUserPK });

            if (LocalFromCheck.KTF) {
                if (inSubTableColumnName in LocalFromCheck.KResult) {
                    LocalTableColumnsWithPredefinedValues = CommonTableColumnFuncsObject.ColumnFuncs.TableColumns.InsertProperties({
                        inTableColumns: LocalColumnsArrayOfObjects,
                        inPredefinedValues: LocalFromCheck.KResult[inSubTableColumnName].TableColumns
                    });
                }
            };

            return LocalTableColumnsWithPredefinedValues;
        },
        ForPredefinedValues: {
            InFiles: ({ inJsonFileName, inFolderName, inScreenName, inUserPK }) => {
                let LocalReturnObject = {
                    KTF: false,
                    KResult: {}
                };

                let LocalFromScreens = CommonTemplates.FoldersAsObject({ inUserPK });

                if (inFolderName in LocalFromScreens) {
                    if (path.parse(inJsonFileName).name in LocalFromScreens[inFolderName]) {
                        if (inScreenName in LocalFromScreens[inFolderName][path.parse(inJsonFileName).name]) {
                            LocalReturnObject.KTF = true;
                            LocalReturnObject.KResult = LocalFromScreens[inFolderName][path.parse(inJsonFileName).name][inScreenName].SubTableColumns;
                        };
                    }
                };

                return LocalReturnObject;
            }
        },
        ForTableInfo: {
            WithPredefinedValues: ({ inScreenValue }) => {
                let LocalTableInfoObject = JSON.parse(JSON.stringify(TableInfoObject));

                return LocalTableInfoObject;
            }
        }

    }

    FuncScreenForObject = ({ inColumnsArray }) => {
        var data = [];
        var ColumnsInI = inColumnsArray;

        for (var i in ColumnsInI) {
            var temp = JSON.parse(JSON.stringify(ColumnObject));

            temp.DisplayName = ColumnsInI[i];
            temp.DataAttribute = ColumnsInI[i];
            temp.ShowInTable = true;

            data.push(temp);
        }

        return data;
    };

    FuncColumnsArrayToArrayOfObjects = ({ inColumnsArray }) => {
        var data = [];
        var ColumnsInI = inColumnsArray;

        for (var i in ColumnsInI) {
            var temp = JSON.parse(JSON.stringify(ColumnObject));

            temp.DisplayName = ColumnsInI[i];
            temp.DataAttribute = ColumnsInI[i];
            temp.ShowInTable = true;

            data.push(temp);
        }

        return data;
    };

    ColumnFuncs = {
        TableColumns: {
            InsertProperties: ({ inTableColumns, inPredefinedValues }) => {
                let LocalPredefinedValues = inPredefinedValues;

                let LocalTableColumnsWithPredefinedValues = inTableColumns.map(LoopItem => {
                    if (LoopItem.DataAttribute in LocalPredefinedValues) {
                        if ("DefaultValueInsert" in LocalPredefinedValues[LoopItem.DataAttribute]) {
                            this.InsertDefaultValue({
                                inInsertMode: LocalPredefinedValues[LoopItem.DataAttribute].DefaultValueInsert.InsertMode,
                                inLoopItem: LoopItem,
                                inKey
                            });
                        };

                        this.FChange({
                            inObjToChange: LoopItem,
                            inObjWithValues: LocalPredefinedValues[LoopItem.DataAttribute]
                        });
                    };

                    return LoopItem;
                });

                return LocalTableColumnsWithPredefinedValues;
            }
        }
    }
};

let Insert = async ({ inJsonConfig, inItemName, inScreenName, inDataPK }) => {
    let LocalReturnData = { KTF: false, LocalCreateItem: "" };
    let LocalNewColumnObject = CommonColumnJsonFuncs.TableColumn();
    let LocalNewTableInfoObject = CommonColumnJsonFuncs.TableInfo();
    let LocalReturnFromPush;
    let LocalScreenName = inScreenName;

    let LocalDataFromJSON = await CommonPullDataFromConfigFolder.FromJsonConfig({
        inJsonConfig,
        inDataPK
    });

    if (LocalDataFromJSON.KTF === false) {
        LocalReturnData.KReason = LocalDataFromJSON.KReason;
        return await LocalReturnData;
    };

    let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON.JsonData));
    let LocalDataWithItemScreen;

    if (inScreenName in LocalDataFromJSONObject[inItemName] === false) {
        LocalDataFromJSONObject[inItemName][inScreenName] = {
            TableColumns: [], TableInfo: LocalNewTableInfoObject
        };

        LocalDataWithItemScreen = LocalDataFromJSONObject[inItemName][inScreenName];

        CommonFuns.ConfigureJson.TableColumn.PkColumn({
            inTableColumnObject: LocalNewColumnObject
        });

        LocalDataWithItemScreen.TableColumns.push(LocalNewColumnObject);

        CommonFuns.ConfigureJson.TableInfo.StartFunc({
            inTableInfoObject: LocalDataFromJSONObject[inItemName][LocalScreenName].TableInfo,
            inJsonConfig, inItemName, inScreenName: LocalScreenName
        });

        LocalReturnFromPush = await CommonPushData.AsAsync({
            inJsonConfig,
            inUserPK: inDataPK,
            inOriginalData: LocalDataFromJSON,
            inDataToUpdate: LocalDataFromJSONObject
        });

        if (LocalReturnFromPush.KTF) {
            LocalReturnData.KTF = true;
        }
    };

    return await LocalReturnData;
};

let InsertWithKPk = async ({ inJsonConfig, inItemName, inScreenName, inUserPK, inKPk }) => {
    let LocalReturnData = { KTF: false, LocalCreateItem: "" };
    let LocalNewColumnObject = CommonColumnJsonFuncs.TableColumn();
    let LocalNewTableInfoObject = CommonColumnJsonFuncs.TableInfo();
    let LocalReturnFromPush;
    let LocalScreenName = inScreenName;

    let LocalDataFromJSON = await CommonPullData.AsJsonAsync({ inJsonConfig, inUserPK });
    let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));
    let LocalDataWithItemScreen;

    if (inScreenName in LocalDataFromJSONObject[inItemName] === false) {
        LocalNewTableInfoObject.kPK = inKPk;

        LocalDataFromJSONObject[inItemName][inScreenName] = {
            TableColumns: [], TableInfo: LocalNewTableInfoObject
        };

        LocalDataWithItemScreen = LocalDataFromJSONObject[inItemName][inScreenName];

        CommonFuns.ConfigureJson.TableColumn.PkColumn({
            inTableColumnObject: LocalNewColumnObject
        });

        LocalDataWithItemScreen.TableColumns.push(LocalNewColumnObject);

        CommonFuns.ConfigureJson.TableInfo.StartFunc({
            inTableInfoObject: LocalDataFromJSONObject[inItemName][LocalScreenName].TableInfo,
            inJsonConfig, inItemName, inScreenName: LocalScreenName
        });

        LocalReturnFromPush = await CommonPushData.AsAsync({
            inJsonConfig, inUserPK,
            inOriginalData: LocalDataFromJSON,
            inDataToUpdate: LocalDataFromJSONObject
        });

        if (LocalReturnFromPush.KTF) {
            LocalReturnData.KTF = true;
        }
    };

    return await LocalReturnData;
};

let FromTemplate = async ({ inJsonConfig, inItemName, inUserPK, inFirstRow }) => {
    let LocalReturnData = { KTF: false, LocalCreateItem: "" };
    let LocalFolderName = inJsonConfig.inFolderName;
    let LocalFileName = inJsonConfig.inJsonFileName;

    let LocalReturnFromPush;

    let LocalTemplateForTableInfo = CommonFromScreens.FoldersAsObject({ inUserPK });

    let LocalDataFromJSON = await CommonPullData.AsJsonAsync({ inJsonConfig, inUserPK });
    let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));
    let LocalDataWithItemScreen;
    let LocalTableColumns;
    let LocalTableInfoObject;

    if (LocalFolderName in LocalTemplateForTableInfo) {
        LocalFromTemplate = LocalTemplateForTableInfo[LocalFolderName];

        if (inItemName in LocalDataFromJSONObject) {
            LocalItemData = LocalDataFromJSONObject[inItemName];
            console.log("sgtart", LocalItemData);

            Object.entries(LocalFromTemplate).forEach(
                ([key, valueFromScreens]) => {
                    LocalTableInfoObject = TableColumnFuncs.ForTableInfo.WithPredefinedValues({
                        inScreenValue: valueFromScreens
                    });

                    LocalItemData[key] = {
                        TableColumns: [],
                        TableInfo: LocalTableInfoObject
                    };

                }
            );
        };
    };
    console.log("loop");
    LocalReturnFromPush = await CommonPushData.AsAsync({
        inJsonConfig, inUserPK,
        inOriginalData: LocalDataFromJSON,
        inDataToUpdate: LocalDataFromJSONObject
    });
    console.log("loop end");
    if (LocalReturnFromPush.KTF) {
        LocalReturnData.KTF = true;
    };

    return await LocalReturnData;
};

module.exports = {
    Insert,
    InsertWithKPk,
    FromTemplate
};