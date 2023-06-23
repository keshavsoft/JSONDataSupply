let _ = require("lodash");
let GlobalJoinTableFuncs = require("../CommonFuncs/JoinTableFuncs");

let CommonPullUserData = require("../../Fs/Config/Folders/Files/PullData/FromData");
let CommonFolderIncludeAllFiles = require("../../Fs/Config/Folders/PullData/FromDataFolder/IncludeAllFiles");

let CommonVouchersConsiderTransform = require("./VouchersConsider/Transform");
let CommonGroupBy = require("./GroupByFuncs/GroupBy");
let CommonPostGroupBy = require("./GroupByFuncs/PostGroupBy");
let CommonFromFolder = require("../../Fs/Config/Folders/PullData/getDirectories");
let CommonPullItemData = require("../../Fs/Config/Folders/Files/Items/PullData/FromDataFolder/PullFuncs/AsArray");
let CommonVouchersConsiderBaseData = require("./VouchersConsider/BaseData/StartFunc");

let LocalLedgerHelperFuncs = {
    ReturnData: {
        FromItemName: async ({ inUserPK, inJVarDataToInsert = {} }) => {
            let LocalReturnArray = [];
            let LocalDataNeeded;
            let LocalVouchersConsider;

            for (const property in LocalVouchersConsider) {
                if (Object.keys(inJVarDataToInsert).length == 0) {
                    LocalDataNeeded = LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsiderLoopWithoutFilter({ inVouchersConsiderLoopObject: LocalVouchersConsider[property], inUserPK });
                } else {
                    LocalDataNeeded = await LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsiderLoop({ inVouchersConsiderLoopObject: LocalVouchersConsider[property], inFilterObject: inJVarDataToInsert, inUserPK });
                };

                LocalReturnArray = LocalReturnArray.concat(LocalDataNeeded);
            };

            return await LocalReturnArray;
        }
    },
    JoinTablesFuncs: {
        PrepareBaseData: async ({ inJoinTablesArray, inUserPK, inJVarDataToInsert }) => {
            let LocalReturnObjectAtEnd = {};
            let LocalJoinTableArrayObject;
            let LocalJoinTableKey;

            if (inJoinTablesArray !== undefined) {
                let LocalToArray = await Promise.all(inJoinTablesArray.map(async LoopItemObject => {
                    let LocalReturnObject = {};

                    LocalJoinTableArrayObject = Object.values(LoopItemObject);
                    LocalJoinTableKey = Object.keys(LoopItemObject);

                    // if (LocalJoinTableArrayObject[0].JsonConfig.UserFolderName === "Reports") {
                    //     LocalReturnObject[LocalJoinTableKey[0]] = await LocalLedgerHelperFuncs.ReturnData.FromItemName({ inItemName: LoopItem, inUserPK, inJVarDataToInsert });
                    // } else {
                    //     LocalReturnObject[LocalJoinTableKey[0]] = await CommonPullUserData.AsJsonAsync({
                    //         inJsonConfig: LocalJoinTableArrayObject[0].JsonConfig,
                    //         inUserPK
                    //     });
                    // };

                    if (LocalJoinTableArrayObject[0].JsonConfig.UserFolderName === "Reports") {
                        LocalReturnObject[LocalJoinTableKey[0]] = await LocalLedgerHelperFuncs.ReturnData.FromItemName({ inItemName: LoopItem, inUserPK, inJVarDataToInsert });
                    } else {
                        LocalReturnObject[LocalJoinTableKey[0]] = await CommonPullUserData.AsJsonAsync({
                            inJsonConfig: LocalJoinTableArrayObject[0].JsonConfig,
                            inUserPK
                        });
                    };

                    return await LocalReturnObject;
                }));

                LocalToArray.forEach(element => {
                    LocalReturnObjectAtEnd = { LocalReturnObjectAtEnd, ...element };
                });
            };

            return await LocalReturnObjectAtEnd;
        }
    },
    VouchersConsiderFuncs: {
        VouchersConsiderLoopWithoutFilter: async ({ inVouchersConsiderLoopObject, inUserPK }) => {
            try {
                let LocalDataArrayToPullFrom = [];
                let LocalDataFromTableJoin;
                // keshav 23Jun2023
                // LocalDataArrayToPullFrom = await LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsider.StartFunc({
                //     inVouchersConsiderLine: inVouchersConsiderLoopObject,
                //     inUserPK
                // });

                LocalDataArrayToPullFrom = await CommonVouchersConsiderBaseData.StartFunc({
                    inVouchersConsiderLine: inVouchersConsiderLoopObject,
                    inUserPK
                });

                // console.log("LocalDataArrayToPullFrom------- : ", LocalDataArrayToPullFrom);
                LocalDataTransformedToPullFrom = CommonVouchersConsiderTransform.Transform({
                    inColumns: inVouchersConsiderLoopObject.Columns,
                    inData: LocalDataArrayToPullFrom
                });
                //  console.log("LocalDataTransformedToPullFrom------- : ", LocalDataTransformedToPullFrom);

                LocalDataFromTableJoin = await LocalLedgerHelperFuncs.VouchersConsiderFuncs.CommonFuncs.JoinTableFuncs({
                    inData: LocalDataTransformedToPullFrom,
                    inVouchersConsiderLoopObject, inUserPK
                });

                return await LocalDataFromTableJoin;
            } catch (error) {
                console.log("error : ", error);
            };
        },
        VouchersConsiderLoop: async ({ inVouchersConsiderLoopObject, inFiltersData, inUserPK }) => {
            let LocalDataArray = [];
            let LocalFilteredData = [];
            let LocalJoinTablesObject;
            let LocalDataNeeded;

            LocalDataArray = await LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsiderLoopWithoutFilter({ inVouchersConsiderLoopObject, inUserPK });
            LocalDataNeeded = LocalLedgerHelperFuncs.FilterFuncs.StartFunc({ inDataArray: LocalDataArray, inFilterObject: inFiltersData })
            return await LocalDataNeeded;
        },
        VouchersConsider: {
            PickColumns: ({ inDataArray, inColumnsNeeded }) => {
                let LocalReturnArray = [];
                let LocalColumnsNeededArray = _.map(inColumnsNeeded, "Name");
                LocalReturnArray = _.map(inDataArray, LoopItem => _.pick(LoopItem, LocalColumnsNeededArray));

                return LocalReturnArray;
            },
            StartFunc: async ({ inVouchersConsiderLine, inUserPK }) => {
                let LocalDataFromVouchersConsider;
                let LocalReturnArray = [];

                LocalDataFromVouchersConsider = await LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsider.SubFuncs.PullDataFromVouchersConsiderJsonFileName({
                    inVouchersConsiderLine,
                    inUserPK
                });

                if (LocalDataFromVouchersConsider.KTF) {
                    if (inVouchersConsiderLine.ColumnNameToPick.trim() === "") {
                        LocalReturnArray = LocalDataFromVouchersConsider.KResult;
                    } else {
                        LocalReturnArray = LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsider.SubFuncs.GridData.StartFunc({
                            inOriginalDataAsArray: LocalDataFromVouchersConsider.KResult,
                            inGridColumnName: inVouchersConsiderLine.ColumnNameToPick
                        });
                    };
                };

                return await LocalReturnArray;
            },
            SubFuncs: {
                LoopReturnDataFuncWithItemName: ({ inReturnData, inItemName }) => {
                    let LocalReturnObject = { KTF: false, KReason: "", KResult: [] };

                    if (inItemName in inReturnData) {
                        LocalReturnObject.KTF = true;
                        LocalReturnObject.KResult = [];

                        Object.entries(inReturnData[inItemName]).forEach(
                            ([key, value]) => {
                                value.pk = key;
                                LocalReturnObject.KResult.push(value);
                            }
                        );
                    } else {
                        LocalReturnObject.KReason = "Item name not found!";
                    };

                    return LocalReturnObject;
                },
                LoopReturnDataFuncFromJsonFileComplete: ({ inReturnData }) => {
                    let LocalReturnObject = { KTF: true, KReason: "", KResult: [] };

                    Object.values(inReturnData).forEach(LoopElement => {
                        Object.entries(LoopElement).forEach(
                            ([key, value]) => {
                                value.pk = key;
                                LocalReturnObject.KResult.push(value);
                            }
                        );
                    });

                    return LocalReturnObject;
                },
                LoopReturnDataFuncFromFolder: ({ inUserPK, inFolderName }) => {
                    let LocalReturnObject = { KTF: true, KReason: "", KResult: [] };
                    let LocalFromFolder = CommonFromFolder.StartFunc({ inDataPk: inUserPK });

                    Object.values(LocalFromFolder).forEach(LoopFileElement => {
                        Object.values(LoopFileElement).forEach(LoopElement => {
                            Object.entries(LoopElement).forEach(
                                ([key, value]) => {
                                    value.pk = key;
                                    LocalReturnObject.KResult.push(value);
                                }
                            );
                        });
                    });

                    return LocalReturnObject;
                },
                PullDataFromVouchersConsiderJsonFileName: async ({ inVouchersConsiderLine, inUserPK }) => {
                    let LocalReturnData;
                    let LocalReturnObject = { KTF: false, KReason: "", KResult: [] };
                    let LocalFromLoopFunc;
                    let LocalFolderName = inVouchersConsiderLine.FolderName;

                    let LocalJsonConfig = {
                        inFolderName: LocalFolderName,
                        inJsonFileName: inVouchersConsiderLine.FileName
                    };

                    if ("FromFolder" in inVouchersConsiderLine) {
                        if (inVouchersConsiderLine.FromFolder) {
                            if ("FolderConfig" in inVouchersConsiderLine) {
                                if ("ConsiderFilesArray" in inVouchersConsiderLine.FolderConfig) {
                                    LocalFromLoopFunc = await CommonFolderIncludeAllFiles.AsArray({
                                        inFolderName: LocalFolderName,
                                        inDataPK: inUserPK,
                                        inConsiderFilesArray: inVouchersConsiderLine.FolderConfig.ConsiderFilesArray
                                    });

                                    if (LocalFromLoopFunc.KTF) {
                                        LocalReturnObject.KTF = true;
                                        LocalReturnObject.KResult = LocalFromLoopFunc.ReturnArray;
                                    } else {
                                        LocalReturnObject.KReason = LocalFromLoopFunc.KReason;
                                    };
                                } else {
                                    LocalReturnObject.KReason = `ConsiderFilesArray not found in VouchersConsiderArray.FolderConfig`;
                                };
                            } else {
                                LocalReturnObject.KReason = `FolderConfig not found in VouchersConsiderArray`;
                            };

                        } else {
                            if ("ItemNameConsider" in inVouchersConsiderLine) {
                                if (inVouchersConsiderLine.ItemNameConsider) {
                                    LocalFromLoopFunc = await CommonPullItemData.FromJsonConfig({
                                        inJsonConfig: LocalJsonConfig,
                                        inItemName: inVouchersConsiderLine.ItemName,
                                        inDataPK: inUserPK
                                    });

                                    if (LocalFromLoopFunc.KTF) {
                                        LocalReturnObject.KTF = true;
                                        LocalReturnObject.KResult = LocalFromLoopFunc.ReturnArray;
                                    } else {
                                        LocalReturnObject.KReason = LocalFromLoopFunc.KReason;
                                    };
                                } else {
                                    LocalFromLoopFunc = LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsider.SubFuncs.LoopReturnDataFuncFromJsonFileComplete({
                                        inReturnData: LocalReturnData
                                    });
                                    if (LocalFromLoopFunc.KTF) {
                                        LocalReturnObject.KTF = true;
                                        LocalReturnObject.KResult = LocalFromLoopFunc.KResult;
                                    } else {
                                        LocalReturnObject.KReason = LocalFromLoopFunc.KReason;
                                    };
                                }
                            } else {
                                LocalFromLoopFunc = LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsider.SubFuncs.LoopReturnDataFuncWithItemName({
                                    inReturnData: LocalReturnData,
                                    inItemName: inVouchersConsiderLine.ItemName
                                });

                                if (LocalFromLoopFunc.KTF) {
                                    LocalReturnObject.KTF = true;
                                    LocalReturnObject.KResult = LocalFromLoopFunc.KResult;
                                } else {
                                    LocalReturnObject.KReason = LocalFromLoopFunc.KReason;
                                };
                            };
                        }
                    } else {
                        if ("ItemNameConsider" in inVouchersConsiderLine) {
                            if (inVouchersConsiderLine.ItemNameConsider) {
                                LocalFromLoopFunc = LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsider.SubFuncs.LoopReturnDataFuncWithItemName({
                                    inReturnData: LocalReturnData,
                                    inItemName: inVouchersConsiderLine.ItemName
                                });

                                if (LocalFromLoopFunc.KTF) {
                                    LocalReturnObject.KTF = true;
                                    LocalReturnObject.KResult = LocalFromLoopFunc.KResult;
                                } else {
                                    LocalReturnObject.KReason = LocalFromLoopFunc.KReason;
                                };
                            } else {
                                LocalFromLoopFunc = LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsider.SubFuncs.LoopReturnDataFuncFromJsonFileComplete({
                                    inReturnData: LocalReturnData
                                });
                                if (LocalFromLoopFunc.KTF) {
                                    LocalReturnObject.KTF = true;
                                    LocalReturnObject.KResult = LocalFromLoopFunc.KResult;
                                } else {
                                    LocalReturnObject.KReason = LocalFromLoopFunc.KReason;
                                };
                            }
                        } else {
                            LocalFromLoopFunc = LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsider.SubFuncs.LoopReturnDataFuncWithItemName({
                                inReturnData: LocalReturnData,
                                inItemName: inVouchersConsiderLine.ItemName
                            });

                            if (LocalFromLoopFunc.KTF) {
                                LocalReturnObject.KTF = true;
                                LocalReturnObject.KResult = LocalFromLoopFunc.KResult;
                            } else {
                                LocalReturnObject.KReason = LocalFromLoopFunc.KReason;
                            };
                        };
                    };

                    return await LocalReturnObject;
                },
                HeadData: {
                    StartFuncAsObject: ({ inOriginalDataAsObject }) => {
                        let LocalHeadObject;
                        let LocalReturnArray = [];

                        for (const Headproperty in inOriginalDataAsObject) {
                            LocalHeadObject = inOriginalDataAsObject[Headproperty];

                            LocalReturnArray.push(LocalHeadObject);
                        };

                        return LocalReturnArray;
                    },
                    StartFunc: ({ inOriginalDataAsArray }) => {
                        let LocalHeadObject;
                        let LocalReturnArray = [];

                        for (const Headproperty in inOriginalDataAsObject) {
                            LocalHeadObject = inOriginalDataAsObject[Headproperty];

                            LocalReturnArray.push(LocalHeadObject);
                        };

                        return LocalReturnArray;
                    }
                },
                GridData: {
                    StartFuncFromObject: ({ inOriginalDataAsObject, inGridColumnName }) => {
                        let LocalHeadObject;
                        let LocalInvGridObject = {};
                        let LocalReturnArray = [];
                        let LocalInvGridArray = [];

                        for (const Headproperty in inOriginalDataAsObject) {
                            LocalHeadObject = inOriginalDataAsObject[Headproperty];
                            LocalInvGridObject = LocalHeadObject[inGridColumnName];

                            LocalInvGridArray = LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsider.SubFuncs.GridData.SubFuncs.InvRowObject({ inInvGridObject: LocalInvGridObject, inGridColumnName, inHeadObject: LocalHeadObject });
                            LocalReturnArray = LocalReturnArray.concat(LocalInvGridArray);
                        };

                        return LocalReturnArray;
                    },
                    StartFunc: ({ inOriginalDataAsArray, inGridColumnName }) => {
                        let LocalInvGridObject = {};
                        let LocalReturnArray = [];
                        let LocalInvGridArray = [];

                        inOriginalDataAsArray.forEach(LoopElement => {
                            LocalInvGridObject = LoopElement[inGridColumnName];

                            LocalInvGridArray = LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsider.SubFuncs.GridData.SubFuncs.InvRowObject({ inInvGridObject: LocalInvGridObject, inGridColumnName, inHeadObject: LoopElement });
                            LocalReturnArray = LocalReturnArray.concat(LocalInvGridArray);
                        });

                        return LocalReturnArray;
                    },
                    SubFuncs: {
                        InvRowObject: ({ inInvGridObject, inGridColumnName, inHeadObject }) => {
                            let LocalInvGridObjectTransformed;
                            let LocalInvGridRow;
                            let LocalReturnArray = [];
                            let LocalHeadObject;

                            for (const GridPropertyPK in inInvGridObject) {
                                LocalHeadObject = _.clone(inHeadObject);
                                LocalInvGridObjectTransformed = {};
                                LocalInvGridRow = inInvGridObject[GridPropertyPK];

                                for (const InvGridProperty in LocalInvGridRow) {
                                    LocalInvGridObjectTransformed[`${inGridColumnName}.${InvGridProperty}`] = LocalInvGridRow[InvGridProperty];
                                };

                                LocalReturnArray.push(Object.assign(LocalHeadObject, LocalInvGridObjectTransformed));
                            };

                            return LocalReturnArray;
                        }
                    }
                }
            },
            LoopFunc: {
                StartFunc: ({ inLoopData, inVouchersConsiderLine }) => {
                    if (inVouchersConsiderLine.ColumnNameToPick === "") {
                        //if ColumnNameToPick is empty that means pick the columns only from root object(not from invgrid)
                        return inLoopData;
                    } else {
                        return LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsider.LoopFunc.SubFuncs.ColumnNameToPick({ inLoopData, inVouchersConsiderLine });
                    };
                },
                SubFuncs: {
                    ColumnNameToPick: ({ inLoopData, inVouchersConsiderLine }) => {
                        let LocalLoopObject;
                        let LocalInvGridObject = {};
                        let LocalInvGridObjectTransformed = {};
                        let LocalReturnArray = [];

                        LocalLoopObject = inLoopData[inVouchersConsiderLine.ColumnNameToPick];

                        if (typeof LocalLoopObject === "object") {
                            for (const property1 in LocalLoopObject) {
                                LocalInvGridObject = LocalLoopObject[property1];
                                LocalInvGridObjectTransformed = {};

                                for (const property2 in LocalInvGridObject) {
                                    LocalInvGridObjectTransformed[`${inVouchersConsiderLine.ColumnNameToPick}.${property2}`] = LocalInvGridObject[property2];
                                };
                                LocalReturnArray.push(LocalInvGridObjectTransformed);
                            };
                        };
                        return LocalReturnArray;
                    }
                }

            }
        },
        CommonFuncs: {
            JoinTableFuncs: async ({ inData, inVouchersConsiderLoopObject, inUserPK }) => {
                let LocalReturnData = inData;

                if (inVouchersConsiderLoopObject.JoinTables !== undefined && inVouchersConsiderLoopObject.JoinTables.length > 0) {
                    LocalJoinTablesObject = await LocalLedgerHelperFuncs.JoinTablesFuncs.PrepareBaseData({
                        inJoinTablesArray: inVouchersConsiderLoopObject.JoinTables,
                        inUserPK
                    });

                    LocalReturnData = GlobalJoinTableFuncs.InsertData({
                        inData,
                        inJoinTableData: LocalJoinTablesObject,
                        inVouchersConsiderColumns: inVouchersConsiderLoopObject.JoinTablesColumns
                    });
                };

                return await LocalReturnData;
            }
        }
    },
    FilterFuncs: {
        BeforeTransfer: {
            StartFunc: ({ inDataArray, inFilterObject }) => {
                let LocalFilteredArray;
                LocalFilteredArray = _.filter(inDataArray, function (loopitem) {
                    return LocalLedgerHelperFuncs.FilterFuncs.LoopFunc({ inLoopObject: loopitem, inFilterObject })
                });
                return LocalFilteredArray;
            }
        },
        StartFunc: ({ inDataArray, inFilterObject }) => {
            let LocalFilteredArray;
            let LocalRetTF;

            LocalFilteredArray = _.filter(inDataArray, function (loopitem) {
                LocalRetTF = LocalLedgerHelperFuncs.FilterFuncs.LoopFunc({
                    inLoopObject: loopitem,
                    inFilterObject
                })
                return LocalRetTF;
            });
            return LocalFilteredArray;
        },
        LoopFunc: ({ inLoopObject, inFilterObject }) => {
            let LocalRetTF = true;

            if (inLoopObject === undefined) {

            } else {
                let LocalDate;
                let LocalFilterDate;
                for (const inFilterObjectProperty in inFilterObject) {

                    switch (inFilterObjectProperty) {
                        case "FromDate":
                            LocalDate = new Date(new Date(inLoopObject.Date).getTime() - new Date(inLoopObject.Date).getTimezoneOffset() * 60000)
                            LocalFilterDate = new Date(new Date(inFilterObject.FromDate).getTime() - new Date(inFilterObject.FromDate).getTimezoneOffset() * 60000)

                            if (!isNaN(LocalDate.getTime()) && !isNaN(LocalFilterDate.getTime())) {
                                if (LocalDate.getTime() < LocalFilterDate.getTime()) {
                                    LocalRetTF = false;
                                };
                            } else {
                                LocalRetTF = false;
                            };

                            break;
                        case "ToDate":
                            LocalDate = new Date(new Date(inLoopObject.Date).getTime() - new Date(inLoopObject.Date).getTimezoneOffset() * 60000)
                            LocalFilterDate = new Date(new Date(inFilterObject.ToDate).getTime() - new Date(inFilterObject.ToDate).getTimezoneOffset() * 60000)
                            if (!isNaN(LocalDate.getTime()) && !isNaN(LocalFilterDate.getTime())) {
                                if (LocalDate.getTime() > LocalFilterDate.getTime()) { LocalRetTF = false; };
                            } else {
                                LocalRetTF = false;
                            };
                            break;
                        case "ProductName":
                            LocalProductName = inLoopObject.ProductName
                            LocalFilterProductName = inFilterObject.ProductName;

                            if (LocalProductName !== LocalFilterProductName) { return false };

                            break;
                        case "AccountName":
                            let LocalAccountName = inLoopObject.AccountName
                            let LocalFilterAccountName = inFilterObject.AccountName;

                            if (LocalAccountName !== LocalFilterAccountName) { return false };

                            break;
                        default:
                            if (inLoopObject[inFilterObjectProperty] !== inFilterObject[inFilterObjectProperty]) {
                                LocalRetTF = false;
                            } else {
                                LocalRetTF = false;
                            };

                            break;
                    }
                };
            };

            return LocalRetTF;
        }
    }
};

let FromVouchersConsiderOnly = async ({ inLedgerAutoJsonWithItemName, inUserPK }) => {
    let LocalReturnArray = [];
    let LocalVouchersConsider = inLedgerAutoJsonWithItemName.VouchersConsider;
    let LocalDisplayColumns = inLedgerAutoJsonWithItemName.DisplayColumns;
    let LocalGroupByColumn;
    let LocalGroupByKTF = false;
    let LocalGroupByAsFloat;

    if ("ReportConfig" in inLedgerAutoJsonWithItemName) {
        //console.log("sssssssssss : ", inLedgerAutoJsonWithItemName.ReportConfig.GroupBy);
        LocalGroupByColumn = inLedgerAutoJsonWithItemName.ReportConfig.GroupBy.ColumnName;
        LocalGroupByKTF = inLedgerAutoJsonWithItemName.ReportConfig.GroupBy.KTF;
        LocalGroupByAsFloat = inLedgerAutoJsonWithItemName.ReportConfig.GroupBy.GroupByAsFloat;
    };

    LocalReturnArray = await DataFromVouchersConsider({ inVouchersConsider: LocalVouchersConsider, inUserPK });

    if (LocalGroupByKTF) {
        LocalReturnArray = CommonGroupBy.SingleColumnAndMultipleDataRetruned({
            inDataToSort: LocalReturnArray,
            inGroupByColumn: LocalGroupByColumn,
            inColumnsToGroupByAsFloat: LocalGroupByAsFloat
        });

        LocalReturnArray = CommonPostGroupBy.PrepareData({ inData: LocalReturnArray, inDisplayColumns: LocalDisplayColumns });
    };

    return await LocalReturnArray;
};

let DataFromVouchersConsider = async ({ inVouchersConsider, inUserPK }) => {
    let LocalReturnArray = [];
    let LocalDataNeeded;
    let LocalGroupInsideVouchersConsider;
    let LocalFromVouchersConsider;

    let LocalVouchersConsiderActive = inVouchersConsider.filter(LoopItem => {
        if (LoopItem.hasOwnProperty("Active")) {
            return LoopItem.Active;
        } else {
            return true;
        };
    });

    for (const property in LocalVouchersConsiderActive) {
        
        // LocalDataNeeded = await LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsiderLoopWithoutFilter({
        //     inVouchersConsiderLoopObject: LocalVouchersConsiderActive[property],
        //     inUserPK
        // });

        LocalDataNeeded = await LocalLedgerHelperFuncs.VouchersConsiderFuncs.VouchersConsiderLoopWithoutFilter({
            inVouchersConsiderLoopObject: LocalVouchersConsiderActive[property],
            inUserPK
        });

        //console.log("LocalDataNeeded : ", LocalDataNeeded);
        LocalGroupInsideVouchersConsider = LocalDataNeeded;

        if ("ReportConfig" in LocalVouchersConsiderActive[property]) {
            LocalFromVouchersConsider = LocalVouchersConsiderActive[property].ReportConfig.GroupBy;

            if (LocalFromVouchersConsider.KTF) {
                LocalGroupInsideVouchersConsider = CommonGroupBy.SingleColumnAndMultipleDataRetruned({
                    inDataToSort: LocalDataNeeded,
                    inGroupByColumn: LocalFromVouchersConsider.ColumnName,
                    inColumnsDataFreezed: LocalFromVouchersConsider.ColumnsDataFreezed,
                    inColumnsToGroupByAsFloat: LocalFromVouchersConsider.ColumnsToGroupByAsFloat
                });
            };
        };

        LocalReturnArray = LocalReturnArray.concat(LocalGroupInsideVouchersConsider);
    };

    return await LocalReturnArray;
};

module.exports = { FromVouchersConsiderOnly };
