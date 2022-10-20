let path = require("path");
let CommonPullDataAdmin = require("../../DefultFileNames/Display/PullData");
let CommonPushDataAdmin = require("../../DefultFileNames/Display/PushData");
let CommonPullReturnData = require("../../DefultFileNames/ReturnData/PullData");
let CommonPushReturnData = require("../../DefultFileNames/ReturnData/PushData");
let CommonTemplates = require("../../Templates/ReturnDisplay");

let CommonFromScreens = require("../../Templates/FromScreens");
let CommonNewColumns = require("../../Templates/NewColumns");

const ColumnObject = require('../../../Fix/Json/TableColumn.json');
const TableInfoObject = require('../../../Fix/Json/TableInfo.json');

let CommonPullData = require("./PullData");
let CommonPushData = require("./PushData");

class TableColumnFuncs {
    InsertDefaultValue({ inInsertMode, inLoopItem, inKey }) {
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
};

let CommonTableColumnFuncsObject = new TableColumnFuncs();

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

let FuncScreenForObject = ({ inColumnsArray }) => {
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

let CommonFuns = {
    ToDisplay: async ({ inJsonConfig, inToName, inUserPK }) => {
        let LocalReturnData = { KTF: false, LocalCreateItem: "" };
        let LocalFromPushDataFuncAsync;

        let LocalDataFromJSON = await CommonPullDataAdmin.ReturnDataAsyncOriginal({ inJsonConfig, inUserPK });
        let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));

        if (inToName in LocalDataFromJSONObject === false) {
            LocalDataFromJSONObject[inToName] = {};

            LocalFromPushDataFuncAsync = await CommonPushDataAdmin.PushDataFuncAsync({ inJsonConfig, inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalDataFromJSONObject });

            if (LocalFromPushDataFuncAsync.KTF) {
                LocalReturnData.KTF = true;
            }
        };

        return LocalReturnData;
    },
    ToReturnData: async ({ inJsonConfig, inToName, inUserPK }) => {
        let LocalReturnData = { KTF: false, LocalCreateItem: "" };
        let LocalFromPushDataFuncAsync;

        let LocalDataFromJSON = CommonPullReturnData.ReturnDataFromJson({ inJsonConfig, inUserPK });
        let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));

        if (inToName in LocalDataFromJSONObject === false) {
            LocalDataFromJSONObject[inToName] = {};

            LocalFromPushDataFuncAsync = await CommonPushReturnData.PushDataFunc({ inJsonConfig, inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalDataFromJSONObject });
            if (LocalFromPushDataFuncAsync.KTF) {
                LocalReturnData.KTF = true;
            }
        };

        return await LocalReturnData;
    },
    ToDataJson: async ({ inJsonConfig, inToName, inUserPK }) => {
        let LocalReturnData = { KTF: false, LocalCreateItem: "" };
        let LocalFromPushDataFuncAsync;

        let LocalDataFromJSON = await CommonPullData.ReturnDataFromJsonAsync({ inJsonConfig, inUserPK });
        let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));

        if (inToName in LocalDataFromJSONObject === false) {
            LocalDataFromJSONObject[inToName] = {};

            LocalFromPushDataFuncAsync = await CommonPushData.PushDataAsync({
                inJsonConfig,
                inUserPK,
                inOriginalData: LocalDataFromJSON,
                inDataToUpdate: LocalDataFromJSONObject
            });
            if (LocalFromPushDataFuncAsync.KTF) {
                LocalReturnData.KTF = true;
            }
        };

        return LocalReturnData;
    },
    Bulk: {
        ToDataJson: async ({ inJsonConfig, inToName, inUserPK, inItemData }) => {
            let LocalReturnData = { KTF: false, LocalCreateItem: "" };

            try {
                let LocalFromPushDataFuncAsync;

                let LocalDataFromJSON = CommonPullData.ReturnDataFromJson({ inJsonConfig, inUserPK });
                let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));

                if (inToName in LocalDataFromJSONObject) {
                    LocalDataFromJSONObject[inToName] = inItemData;

                    LocalFromPushDataFuncAsync = await CommonPushData.PushDataAsync({
                        inJsonConfig,
                        inUserPK,
                        inOriginalData: LocalDataFromJSON,
                        inDataToUpdate: LocalDataFromJSONObject
                    });

                    if (LocalFromPushDataFuncAsync.KTF) {
                        LocalReturnData.KTF = true;
                    }
                };

            } catch (error) {
                LocalReturnData.Kerror = error;
            };

            return LocalReturnData;
        },
        ToDataJsonWithKeys: async ({ inJsonConfig, inUserPK, inItemData }) => {
            let LocalReturnData = { KTF: false, LocalCreateItem: "" };

            try {
                let LocalFromPushDataFuncAsync;

                let LocalDataFromJSON = CommonPullData.ReturnDataFromJson({ inJsonConfig, inUserPK });
                let LocalDataFromJSONObject = { ...LocalDataFromJSON, ...inItemData };

                LocalFromPushDataFuncAsync = await CommonPushData.PushDataAsync({
                    inJsonConfig,
                    inUserPK,
                    inOriginalData: LocalDataFromJSON,
                    inDataToUpdate: LocalDataFromJSONObject
                });

                if (LocalFromPushDataFuncAsync.KTF) {
                    LocalReturnData.KTF = true;
                }

            } catch (error) {
                LocalReturnData.Kerror = error;
            };

            return LocalReturnData;
        },
        ToDisplayData: async ({ inJsonConfig, inUserPK, inItemData }) => {
            let LocalReturnData = { KTF: false, LocalCreateItem: "" };
            let LocalFromPushDataFuncAsync;

            let LocalDataFromJSON = await CommonPullDataAdmin.ReturnDataAsyncOriginal({ inJsonConfig, inUserPK });
            let LocalDataToUpdate = JSON.parse(JSON.stringify(LocalDataFromJSON));
            let LocalObjectFromLoop;

            Object.entries(inItemData).forEach(
                ([key, value]) => {
                    LocalObjectFromLoop = CommonFuns.Bulk.CommonFuncs.ToDisplayData.LoopFunc({
                        inJsonConfig,
                        inKey: key,
                        inUserPK,
                        inItemDataValue: value
                    });

                    LocalDataToUpdate = { ...LocalDataToUpdate, ...LocalObjectFromLoop };
                }
            );

            LocalFromPushDataFuncAsync = await CommonPushDataAdmin.PushDataFuncAsync({
                inJsonConfig, inUserPK, inOriginalData: LocalDataFromJSON,
                inDataToUpdate: LocalDataToUpdate
            });

            if (LocalFromPushDataFuncAsync.KTF) {
                LocalReturnData.KTF = true;
            };

            return LocalReturnData;
        },
        CommonFuncs: {
            ToDisplayData: {
                LoopFunc: ({ inJsonConfig, inKey, inUserPK, inItemDataValue }) => {
                    let LocalReturnObject = {};

                    TableInfoObject.SearchRowArray.Label.DisplayObject.DisplayText = inKey;

                    LocalReturnObject[inKey] = CommonFuns.Bulk.CommonFuncs.ToDisplayData.ColumnsFuncs.ForScreens({
                        inUserPK, inJsonConfig, inItemDataValue
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

                        let LocalReturnArray = FuncScreenForObject({ inColumnsArray: LocalNewColumns });
                        return LocalReturnArray;
                    },
                    ForScreens: ({ inUserPK, inJsonConfig, inItemDataValue }) => {
                        let LocalReturnObject = {};
                        let LocalFolderName = inJsonConfig.inFolderName;
                        let LocalJsonFileName = inJsonConfig.inJsonFileName;
                        let LocalTableInfoObject;
                        let LocalTableColumns = [];

                        let LocalFromScreens = CommonFromScreens.FoldersAsObject({ inUserPK });

                        if (LocalFolderName in LocalFromScreens) {
                            Object.entries(LocalFromScreens[LocalFolderName]).forEach(
                                async ([key, value]) => {
                                    LocalTableInfoObject = CommonTableColumnFuncsObject.ForTableInfo.WithPredefinedValues({
                                        inScreenValue: value
                                    });

                                    LocalTableColumns = CommonFuns.Bulk.CommonFuncs.ToDisplayData.ColumnsFuncs.ForTableColumns.WithPredefinedValues({
                                        inScreenName: key,
                                        inItemDataValue,
                                        inUserPK,
                                        inJsonFileName: LocalJsonFileName,
                                        inFolderName: LocalFolderName
                                    });

                                    LocalReturnObject[key] = {
                                        TableColumns: LocalTableColumns,
                                        TableInfo: LocalTableInfoObject
                                    };
                                }
                            );
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

                            let LocalPredefinedValues;

                            let LocalTableColumnsWithPredefinedValues = LocalTableColumns;

                            if (LocalFromCheck.KTF) {
                                LocalPredefinedValues = LocalFromCheck.KResult;

                                LocalTableColumnsWithPredefinedValues = LocalTableColumns.map(LoopItem => {
                                    if (LoopItem.DataAttribute in LocalPredefinedValues) {
                                        if ("DefaultValueInsert" in LocalPredefinedValues[LoopItem.DataAttribute]) {
                                            CommonTableColumnFuncsObject.InsertDefaultValue({
                                                inInsertMode: LocalPredefinedValues[LoopItem.DataAttribute].DefaultValueInsert.InsertMode,
                                                inLoopItem: LoopItem,
                                                inKey
                                            });
                                        };

                                        FChange({
                                            inObjToChange: LoopItem,
                                            inObjWithValues: LocalPredefinedValues[LoopItem.DataAttribute]
                                        });
                                    };

                                    return LoopItem;
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

let Insert = async ({ inJsonConfig, inToName, inUserPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalReturnDataFromDisplay = await CommonFuns.ToDisplay({ inJsonConfig, inToName, inUserPK });
    let LocalRetrunFromToReturnData = await CommonFuns.ToReturnData({ inJsonConfig, inToName, inUserPK });
    let LocalRetrunFromToDataJson = await CommonFuns.ToDataJson({ inJsonConfig, inToName, inUserPK });

    if (LocalReturnDataFromDisplay.KTF || LocalRetrunFromToReturnData.KTF || LocalRetrunFromToDataJson.KTF) {
        LocalReturnData.KTF = true;
        LocalReturnData.KResult.push(LocalReturnDataFromDisplay);
        LocalReturnData.KResult.push(LocalRetrunFromToReturnData);
        LocalReturnData.KResult.push(LocalRetrunFromToDataJson);
    };

    return LocalReturnData;
};

let Bulk = async ({ inJsonConfig, inToName, inItemData, inUserPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalRetrunFromToDataJson = await CommonFuns.ToDataJson({ inJsonConfig, inToName, inUserPK });
    let LocalReturnFromBulk;

    if (LocalRetrunFromToDataJson.KTF) {
        LocalReturnFromBulk = await CommonFuns.Bulk.ToDataJson({ inJsonConfig, inToName, inItemData, inUserPK });

        if (LocalReturnFromBulk.KTF) {
            LocalReturnData.KTF = true;
        };
    };

    return LocalReturnData;
};

let BulkWithKeys = async ({ inJsonConfig, inItemData, inUserPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalReturnFromToDisplayData;

    Object.entries(inItemData).forEach(
        async ([key, value]) => {
            await CommonFuns.ToDisplay({ inJsonConfig, inToName: key, inUserPK });
            await CommonFuns.ToReturnData({ inJsonConfig, inToName: key, inUserPK });
            await CommonFuns.ToDataJson({ inJsonConfig, inToName: key, inUserPK });
        }
    );

    let LocalReturnFromBulk = await CommonFuns.Bulk.ToDataJsonWithKeys({
        inJsonConfig,
        inItemData, inUserPK
    });

    if (LocalReturnFromBulk.KTF) {
        LocalReturnData.KTF = true;
        LocalReturnData.KResult.push(LocalReturnFromBulk);

        LocalReturnFromToDisplayData = await CommonFuns.Bulk.ToDisplayData({
            inJsonConfig,
            inItemData, inUserPK
        });
    };

    return LocalReturnData;
};

module.exports = { Insert, Bulk, BulkWithKeys };