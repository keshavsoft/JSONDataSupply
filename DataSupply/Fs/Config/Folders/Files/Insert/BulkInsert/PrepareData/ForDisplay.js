let path = require("path");

const ColumnObject = require('../../../../../../../Fix/Json/TableColumn.json');
const TableInfoObject = require('../../../../../../../Fix/Json/TableInfo.json');

let CommonTemplates = require("../../../../../../Templates/ReturnDisplay");
let CommonFromScreens = require("../../../../../../Templates/FromScreens");
let CommonNewColumns = require("../../../../../../Templates/NewColumns");

let FChange = ({ inObjToChange, inObjWithValues }) => {
    Object.entries(inObjToChange).forEach(
        ([key, value]) => {
            if (key in inObjWithValues) {
                if (typeof value === "object") {
                    FChange({
                        inObjToChange: inObjToChange[key],
                        inObjWithValues: inObjWithValues[key]
                    });
                } else {
                    inObjToChange[key] = inObjWithValues[key];
                };

            };
        });
};

class TableColumnFuncs {
    FChange = ({ inObjToChange, inObjWithValues }) => {
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
                console.log("inJsonFileName : ", inJsonFileName);

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

    ForTableInfo = {
        WithPredefinedValues: ({ inScreenValue }) => {
            let LocalTableInfoObject = JSON.parse(JSON.stringify(TableInfoObject));

            if ("TableInfo" in inScreenValue) {
                FChange({
                    inObjToChange: LocalTableInfoObject,
                    inObjWithValues: inScreenValue.TableInfo
                });
            };

            return LocalTableInfoObject;
        }
    }

    ForSubTableColumns = {
        StartFunc: ({ inJsonFileName, inFolderName, inScreenName, inSubTableColumns, inUserPK, inFirstRow, inScreenValue }) => {
            //SubTableColumnsTableInfo
            let LocalReturnObject = {};

            try {
                let LocalColumnsArray = [];
                let LocalColumnsArrayOfObjects = [];
                let LocalFirstRowInsideSubTableValues;
                let LocalFirstRowInsideSubTable;

                let LocalTableInfoObject;

                inSubTableColumns.map(LoopItemSubTableColumn => {
                    if (LoopItemSubTableColumn in inFirstRow) {
                        LocalFirstRowInsideSubTable = inFirstRow[LoopItemSubTableColumn];
                        //console.log("LocalFirstRowInsideSubTable------------ : ", LocalFirstRowInsideSubTable);
                        LocalFirstRowInsideSubTableValues = Object.values(LocalFirstRowInsideSubTable);
                        //console.log("LocalFirstRowInsideSubTable------------ : ", LocalFirstRowInsideSubTable);
                        if (LocalFirstRowInsideSubTableValues.length > 0) {
                            LocalColumnsArray = Object.keys(LocalFirstRowInsideSubTableValues[0]);

                            LocalColumnsArrayOfObjects = this.ForSubTableColumns.PrepareTableColumns({
                                inColumnsArray: LocalColumnsArray, inJsonFileName, inFolderName, inScreenName,
                                inUserPK,
                                inSubTableColumnName: LoopItemSubTableColumn
                            });

                            LocalTableInfoObject = CommonTableColumnFuncsObject.ForSubTableColumns.ForTableInfo.WithPredefinedValues({ inScreenValue });

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

                            if ("SubTableColumns" in LocalFromScreens[inFolderName][path.parse(inJsonFileName).name][inScreenName]) {
                                LocalReturnObject.KResult = LocalFromScreens[inFolderName][path.parse(inJsonFileName).name][inScreenName].SubTableColumns;
                            };
                        };
                    }
                };

                return LocalReturnObject;
            }
        },
        ForTableInfo: {
            WithPredefinedValues1: ({ inScreenValue }) => {
                let LocalTableInfoObject = JSON.parse(JSON.stringify(TableInfoObject));

                return LocalTableInfoObject;
            },
            WithPredefinedValues: ({ inScreenValue }) => {
                let LocalTableInfoObject = JSON.parse(JSON.stringify(TableInfoObject));
                let LocalKeyNeeded = "SubTableColumnsTableInfo";
                console.log("SubTableColumnsTableInfo : ", Object.keys(inScreenValue));
                if (LocalKeyNeeded in inScreenValue) {
                    FChange({
                        inObjToChange: LocalTableInfoObject,
                        inObjWithValues: inScreenValue[LocalKeyNeeded]
                    });
                };

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
                        // if (LoopItem.DataAttribute === "ProductName") {
                        //     console.log("start : ", LoopItem.DataAttribute, LocalPredefinedValues);

                        //     console.log("end : ", LoopItem.ServerSide);
                        // };

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

let CommonTableColumnFuncsObject = new TableColumnFuncs();

let CommonFuns = {
    Bulk: {
        CommonFuncs: {
            ToDisplayData: {
                LoopFunc: ({ inJsonConfig, inKey, inUserPK, inItemDataValue }) => {
                    let LocalReturnObject = {};

                    LocalReturnObject[inKey] = CommonFuns.Bulk.CommonFuncs.ToDisplayData.ColumnsFuncs.ForScreens({
                        inUserPK, inJsonConfig, inItemDataValue,
                        inItemName: inKey
                    });

                    return LocalReturnObject;
                },
                ColumnsFuncs: {
                    StartFunc: ({ inItemDataValue, inUserPK, inJsonFileName, inFolderName }) => {
                        let LocalColumnsArray = Object.keys(Object.values(inItemDataValue)[0]);

                        let LocalNewColumns = CommonFuns.Bulk.CommonFuncs.ToDisplayData.ColumnsFuncs.ForTableColumns.InsertNewColumns({
                            inTableColumns: LocalColumnsArray,
                            inUserPK,
                            inJsonFileName, inFolderName
                        });
                        //console.log("LocalNewColumns---------------------- : ", LocalNewColumns);
                        let LocalReturnArray = CommonTableColumnFuncsObject.FuncScreenForObject({ inColumnsArray: LocalNewColumns });
                        return LocalReturnArray;
                    },
                    ForScreens: ({ inUserPK, inJsonConfig, inItemDataValue, inItemName }) => {
                        let LocalReturnObject = {};

                        try {
                            let LocalFolderName = inJsonConfig.inFolderName;
                            let LocalJsonFileName = inJsonConfig.inJsonFileName;
                            let LocalTableInfoObject;
                            let LocalTableColumns = [];
                            let LocalSubTableColumnsArray = CommonTableColumnFuncsObject.ForSubTableColumns.PrepareArray({ inItemDataValue });
                            //console.log("LocalSubTableColumnsArray-------------------- :", LocalJsonFileName, LocalSubTableColumnsArray, inItemDataValue);
                            let LocalFirstRow = Object.values(inItemDataValue)[0];
                            let LocalSubTableColumns;

                            let LocalFromScreens = CommonFromScreens.FoldersAsObject({ inUserPK });

                            if (LocalFolderName in LocalFromScreens) {
                                Object.entries(LocalFromScreens[LocalFolderName]).forEach(
                                    async ([keyFromScreens, valueFromScreens]) => {
                                        LocalTableInfoObject = CommonTableColumnFuncsObject.ForTableInfo.WithPredefinedValues({
                                            inScreenValue: valueFromScreens
                                        });

                                        LocalTableColumns = CommonFuns.Bulk.CommonFuncs.ToDisplayData.ColumnsFuncs.ForTableColumns.WithPredefinedValues({
                                            inScreenName: keyFromScreens,
                                            inItemDataValue,
                                            inUserPK,
                                            inJsonFileName: LocalJsonFileName,
                                            inFolderName: LocalFolderName
                                        });

                                        LocalSubTableColumns = CommonTableColumnFuncsObject.ForSubTableColumns.StartFunc({
                                            inScreenName: keyFromScreens,
                                            inItemDataValue,
                                            inUserPK,
                                            inJsonFileName: LocalJsonFileName,
                                            inFolderName: LocalFolderName,
                                            inSubTableColumns: LocalSubTableColumnsArray,
                                            inFirstRow: LocalFirstRow,
                                            inScreenValue: valueFromScreens
                                        });

                                        LocalTableInfoObject.SearchRowArray.Label.DisplayObject.DisplayText = inItemName;

                                        LocalReturnObject[keyFromScreens] = {
                                            TableColumns: LocalTableColumns,
                                            TableInfo: LocalTableInfoObject,
                                            SubTableColumns: LocalSubTableColumns
                                        };
                                    }
                                );
                            };
                        } catch (error) {
                            console.log("For Bulk error : ", error);
                        };

                        return LocalReturnObject;
                    },
                    ForTableInfo: {
                        WithPredefinedValues: ({ inScreenValue }) => {
                            let LocalTableInfoObject = JSON.parse(JSON.stringify(TableInfoObject));

                            if ("TableInfo" in inScreenValue) {
                                FChange({
                                    inObjToChange: LocalTableInfoObject,
                                    inObjWithValues: inScreenValue.TableInfo
                                });
                            };

                            return LocalTableInfoObject;
                        }
                    },
                    ForTableColumns: {
                        WithPredefinedValues: ({ inJsonFileName, inFolderName, inScreenName, inItemDataValue, inUserPK }) => {
                            let LocalTableColumns = CommonFuns.Bulk.CommonFuncs.ToDisplayData.ColumnsFuncs.StartFunc({
                                inJsonFileName, inFolderName,
                                inItemDataValue,
                                inUserPK
                            });

                            let LocalFromCheck = CommonTableColumnFuncsObject.ForTableColumns.ForPredefinedValues.InFiles({ inJsonFileName, inFolderName, inScreenName, inUserPK });

                            let LocalTableColumnsWithPredefinedValues = LocalTableColumns;
                            //console.log("LocalTableColumns------------------------- : ", LocalTableColumns);
                            if (LocalFromCheck.KTF) {
                                LocalTableColumnsWithPredefinedValues = CommonTableColumnFuncsObject.ColumnFuncs.TableColumns.InsertProperties({
                                    inTableColumns: LocalTableColumns,
                                    inPredefinedValues: LocalFromCheck.KResult
                                });
                            };

                            return LocalTableColumnsWithPredefinedValues;
                        },
                        InsertNewColumns: ({ inTableColumns, inUserPK, inJsonFileName, inFolderName }) => {
                            let LocalReturnArray = [...inTableColumns];
                            let LocalNewColumns;
                            let LocalFromCommonNewColumns = CommonNewColumns.FoldersAsObject({ inUserPK });

                            if (inFolderName in LocalFromCommonNewColumns) {
                                if (path.parse(inJsonFileName).name in LocalFromCommonNewColumns[inFolderName]) {
                                    LocalNewColumns = Object.keys(LocalFromCommonNewColumns[inFolderName][path.parse(inJsonFileName).name]);

                                    LocalReturnArray = [...inTableColumns, ...LocalNewColumns];
                                }
                            }

                            return LocalReturnArray;
                        }
                    }
                }
            }
        }
    }
};

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inDataToInsert, inUserPK }) => {
    let LocalReturnObject = { KTF: false, KResultObject: {} };

    try {
        let LocalJsonConfig = {
            inFolderName,
            inJsonFileName: inFileNameWithExtension
        };

        Object.entries(inDataToInsert).forEach(
            ([key, value]) => {
                LocalObjectFromLoop = CommonFuns.Bulk.CommonFuncs.ToDisplayData.LoopFunc({
                    inJsonConfig: LocalJsonConfig,
                    inKey: key,
                    inUserPK,
                    inItemDataValue: value
                });
                LocalReturnObject.KTF = true;
                LocalReturnObject.KResultObject = { ...LocalReturnObject.KResultObject, ...LocalObjectFromLoop };
            }
        );

    } catch (error) {
        console.log("For Bulk error : ", error);
    };
    return await LocalReturnObject;
};

module.exports = { StartFunc };
