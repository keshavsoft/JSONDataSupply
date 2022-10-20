let path = require("path");
let CommonFromScreens = require("../../../Templates/FromScreens");
const TableInfoObject = require('../../../../Fix/Json/TableInfo.json');
let CommonNewColumns = require("../../../Templates/NewColumns");
const ColumnObject = require('../../../../Fix/Json/TableColumn.json');

let CommonTemplates = require("../../../Templates/ReturnDisplay");

class CommonFunsClass {
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

    static StartFunc = ({ inColumnsArray, inUserPK, inJsonFileName, inFolderName }) => {
        //let LocalColumnsArray = Object.keys(Object.values(inItemDataValue)[0]);

        let LocalColumnsArray = inColumnsArray;

        let LocalNewColumns = this.ForTableColumns.InsertNewColumns({
            inTableColumns: LocalColumnsArray,
            inUserPK,
            inJsonFileName, inFolderName
        });

        let LocalReturnArray = this.FuncScreenForObject({ inColumnsArray: LocalNewColumns });
        return LocalReturnArray;
    }

    static ForTableInfo = {
        WithPredefinedValues: ({ inScreenValue }) => {
            let LocalTableInfoObject = JSON.parse(JSON.stringify(TableInfoObject));

            if ("TableInfo" in inScreenValue) {
                this.FChange({
                    inObjToChange: LocalTableInfoObject,
                    inObjWithValues: inScreenValue.TableInfo
                });
            };

            return LocalTableInfoObject;
        }
    }

    static ForTableColumns = {
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
                console.log("LocalReturnObject : ", LocalReturnObject);
                return LocalReturnObject;
            }
        },
        WithPredefinedValues: ({ inScreenValue }) => {
            let LocalReturnArray;
            let LoopColumn;

            if ("TableColumns" in inScreenValue) {
                if (Array.isArray(inScreenValue.TableColumns)) {
                    //LocalReturnArray = inScreenValue.TableColumns

                    LocalReturnArray = inScreenValue.TableColumns.map(element => {
                        LoopColumn = JSON.parse(JSON.stringify(ColumnObject));

                        this.FChange({
                            inObjToChange: LoopColumn,
                            inObjWithValues: element
                        });

                        return LoopColumn;
                    });
                };


                // this.FChange({
                //     inObjToChange: LocalTableInfoObject,
                //     inObjWithValues: inScreenValue.TableInfo
                // });
            };
            return LocalReturnArray;
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

    static ForSubTableColumns = {
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
        },
        WithPredefinedValues: ({ inScreenValue }) => {
            let LocalReturnArray;
            let LoopColumn;

            if ("SubTableColumns" in inScreenValue) {
                Object.entries(inScreenValue.SubTableColumns).forEach(
                    ([key, value]) => {
                        if ("TableColumns" in value) {
                            if (Array.isArray(value.TableColumns)) {
                                value.TableColumns = value.TableColumns.map(element => {
                                    LoopColumn = JSON.parse(JSON.stringify(ColumnObject));

                                    this.FChange({
                                        inObjToChange: LoopColumn,
                                        inObjWithValues: element
                                    });

                                    return LoopColumn;
                                });
                            };
                        }
                    }
                );
            };
            return inScreenValue.SubTableColumns;
        },
        WithPredefinedValues1: ({ inScreenValue }) => {
            let LocalReturnArray;
            let LoopColumn;

            if ("SubTableColumns" in inScreenValue) {
                // LocalReturnArray = inScreenValue.SubTableColumns;

                if (Array.isArray(inScreenValue.SubTableColumns)) {
                    LocalReturnArray = inScreenValue.TableColumns.map(element => {
                        LoopColumn = JSON.parse(JSON.stringify(ColumnObject));

                        this.FChange({
                            inObjToChange: LoopColumn,
                            inObjWithValues: element
                        });

                        return LoopColumn;
                    });
                };
            };
            return LocalReturnArray;
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

    static FuncScreenForObject = ({ inColumnsArray }) => {
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

};

let StartFunc = ({ inUserPK, inJsonConfig, inColumnsArray, inItemName }) => {
    let LocalReturnObject = {};

    try {
        let LocalFolderName = inJsonConfig.inFolderName;
        let LocalJsonFileName = inJsonConfig.inJsonFileName;
        let LocalTableInfoObject;
        let LocalTableColumns = [];
        let LocalSubTableColumns;

        let LocalFromScreens = CommonFromScreens.FoldersAsObject({ inUserPK });
       // console.log("LocalFromScreens : ", LocalFromScreens);
        if (LocalFolderName in LocalFromScreens) {
            Object.entries(LocalFromScreens[LocalFolderName]).forEach(
                async ([keyFromScreens, valueFromScreens]) => {
                    LocalTableInfoObject = CommonFunsClass.ForTableInfo.WithPredefinedValues({
                        inScreenValue: valueFromScreens
                    });
                    //console.log("1 : ", LocalReturnObject);
                    LocalTableColumns = CommonFunsClass.ForTableColumns.WithPredefinedValues({
                        inScreenValue: valueFromScreens
                    });

                    LocalSubTableColumns = CommonFunsClass.ForSubTableColumns.WithPredefinedValues({
                        inScreenValue: valueFromScreens
                    });

                    LocalTableInfoObject.SearchRowArray.Label.DisplayObject.DisplayText = inItemName;

                    LocalReturnObject[keyFromScreens] = {
                        TableColumns: LocalTableColumns,
                        TableInfo: LocalTableInfoObject,
                        SubTableColumns: LocalSubTableColumns
                    };
                    //console.log("5 : ", LocalReturnObject);
                }
            );
        };


    } catch (error) {
        console.log("For Bulk error : ", error);
    };

    return LocalReturnObject;
};

module.exports = { StartFunc }