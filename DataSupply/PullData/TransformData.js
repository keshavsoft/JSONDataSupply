let _ = require("lodash");

let GlobalToUiTableShow = require("../ToUi/TableShow");
let GlobalPrepareJoinTableData = require("./PrepareJoinTableData");
let GlobalJoinTableReturnData = require("./JoinTable/ReturnData");

let LocalPullData = {
    StartFunc: ({ inData, inDisplayJsonDataNeeded, inUserPK }) => {
        let LocalJoinTablesArray = inDisplayJsonDataNeeded["JoinTables"];
        let LocalOriginalData = LocalPullData.SubFuncs.ShowOriginalData.StartFunc({
            inData,
            inDisplayJsonDataNeeded
        });
        let LocalReturnData;
        LocalReturnData = LocalOriginalData;

        if (LocalJoinTablesArray !== undefined) {
            if (LocalJoinTablesArray.length > 0) {
                LocalReturnData = LocalPullData.SubFuncs.ForJoinTable.PullData({
                    inDisplayJsonDataNeeded,
                    inUserPK, inOriginalData: LocalOriginalData
                });
            };
        };
        // console.log("LocalReturnData : ", LocalReturnData);
        return LocalReturnData;
    },
    SubFuncs: {
        ShowOriginalData: {
            StartFunc: ({ inData, inDisplayJsonDataNeeded }) => {
                let LocalReturnData = inData;
                let LocalDataTransformed;
                let LocalTableInfoServerSide;
                let LocalTableColumns;
                LocalTableColumns = inDisplayJsonDataNeeded["TableColumns"];

                if (inDisplayJsonDataNeeded.TableInfo.hasOwnProperty("TableInfoServerSide")) {
                    LocalTableInfoServerSide = inDisplayJsonDataNeeded.TableInfo.TableInfoServerSide;

                    if (LocalTableInfoServerSide.hasOwnProperty("TransformToUi")) {
                        if (LocalTableInfoServerSide.TransformToUi) {
                            LocalDataTransformed = LocalPullData.SubFuncs.ShowOriginalData.SubFuncs.TransformToUi({
                                inData: LocalReturnData,
                                inTableColumns: LocalTableColumns
                            });
                            LocalReturnData = LocalDataTransformed;
                        };
                    };
                };
                return LocalReturnData;
            },
            SubFuncs: {
                TransformToUi: ({ inData, inTableColumns }) => {
                    let LocalReturnData;

                    // let LocalTableColumnsToTransform = inTableColumns.filter(LoopItem => {
                    //     if ("DefaultValueShow" in LoopItem.ServerSide) {
                    //         return LoopItem.ServerSide.DefaultValueShow.Transform;
                    //     };
                    // });

                    let LocalFilterObject = {
                        ServerSide: {
                            DefaultValueShow: {
                                Transform: true
                            }
                        }
                    };

                    let LocalTableColumnsToTransform = _.filter(inTableColumns, LocalFilterObject);

                    //console.log("k1---------- : ", LocalTableColumnsToTransform);
                    if (Array.isArray(inData)) {
                        LocalReturnData = inData.map(LoopItemData => {
                            return GlobalToUiTableShow.TransformData({
                                inLoopItemData: LoopItemData,
                                inTableColumnsToTransform: LocalTableColumnsToTransform
                            });
                        });
                    } else {
                        LocalReturnData = [];

                        for (const property in inData) {
                            inData[property].pk = property;

                            LocalReturnData.push(GlobalToUiTableShow.TransformData({ inLoopItemData: inData[property], inTableColumnsToTransform: LocalTableColumnsToTransform }));
                        }
                    };

                    return LocalReturnData;
                }
            }
        },
        ForJoinTable: {
            PullData: ({ inDisplayJsonDataNeeded, inUserPK, inOriginalData }) => {
                let LocalJoinTableData = GlobalPrepareJoinTableData.PrepareJoinTableData({ inDisplayJsonDataNeeded, inUserPK });

                let LocalOriginalData = LocalPullData.SubFuncs.ForJoinTable.SubFuncs.BuildOriginialData({ inDisplayJsonDataNeeded, inOriginalData });
                let LocalReturnData = LocalPullData.SubFuncs.ForJoinTable.SubFuncs.InsertFromTableJoinData({ inDisplayJsonDataNeeded, inLocalOriginalData: LocalOriginalData, inLocalJoinTableData: LocalJoinTableData, inUserPK });

                return LocalReturnData;
            },
            SubFuncs: {
                BuildOriginialData: ({ inDisplayJsonDataNeeded, inOriginalData }) => {
                    let LocalTableColumnsArray = inDisplayJsonDataNeeded.TableColumns;
                    let LocalLoopRowObject = {};
                    let LocalReturnData;

                    LocalReturnData = inOriginalData.map((LoopItemDataRow) => {
                        LocalLoopRowObject = LocalPullData.SubFuncs.ForJoinTable.SubFuncs.PrepareTableRowObjectFuncs.CreateRow({ inTableColumnsArray: LocalTableColumnsArray, inLoopItemDataRow: LoopItemDataRow });

                        return LocalLoopRowObject;
                    });

                    return LocalReturnData;
                },
                InsertFromTableJoinData: ({ inDisplayJsonDataNeeded, inLocalOriginalData, inLocalJoinTableData }) => {
                    let LocalTableColumnsArray = inDisplayJsonDataNeeded.TableColumns;
                    //let LocalTableColumnsArray = inDbForTransactionsDisplay.get(`${inKeyAsTree}.TableColumns`).value();
                    let LocalOriginalData = inLocalOriginalData;

                    let LocalReturnDataArray = [];
                    let LocalLoopObject = {};
                    let LocalValueFromTableJoinFuns;

                    LocalReturnDataArray = LocalOriginalData.map((LoopItemRow) => {
                        LocalLoopObject = {};
                        for (const property in LoopItemRow) {
                            //debug("property : ", property);
                            LocalLoopObject[property] = LoopItemRow[property];

                            //LocalValueFromTableJoinFuns = GlobalJoinTableReturnData.PrepareJoinTableData({ inDisplayJsonDataNeeded, inUserPK });
                            LocalValueFromTableJoinFuns = GlobalJoinTableReturnData.StartFunc({ inTableColumnsArray: LocalTableColumnsArray, inOriginalValue: LoopItemRow[property], inProperty: property, inLocalJoinTableData })

                            if (LocalValueFromTableJoinFuns !== undefined) {
                                LocalLoopObject[property] = LocalValueFromTableJoinFuns;
                            };
                        };

                        return LocalLoopObject;
                    });

                    return LocalReturnDataArray;
                },
                PrepareTableRowObjectFuncs: {
                    CreateRow: ({ inTableColumnsArray, inLoopItemDataRow }) => {
                        let LocalRowObjectFromDisplayTableColumns = {};

                        inTableColumnsArray.forEach((LoopItem) => {
                            LocalRowObjectFromDisplayTableColumns[LoopItem.DisplayName] = inLoopItemDataRow[LoopItem.DataAttribute];
                        });

                        return LocalRowObjectFromDisplayTableColumns;
                    }
                }
            }
        }
    }
};

let FromTransformToUi = ({ inData, inDisplayJsonData, inUserPK }) => {
    return LocalPullData.StartFunc({
        inData,
        inDisplayJsonDataNeeded: inDisplayJsonData, inUserPK
    });
};

module.exports = { FromTransformToUi };
