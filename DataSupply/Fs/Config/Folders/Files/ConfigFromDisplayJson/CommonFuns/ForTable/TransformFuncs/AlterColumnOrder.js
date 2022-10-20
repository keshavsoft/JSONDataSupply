let GlobalToUiTableShow = require("./ToUi/TableShow");
let GlobalPrepareJoinTableData = require("./PrepareJoinTableData");
let GlobalJoinTableReturnData = require("./JoinTable/ReturnData");

let LocalPullData = {
    StartFunc: ({ inData, inTableColumns, inUserPK }) => {
        let LocalReturnArray = [];

        LocalReturnArray = inData.map(LoopData => {
            let LocalReturnData = {};

            inTableColumns.forEach(LoopColumn => {
                if ("DataAttribute" in LoopColumn) {
                    LocalReturnData[LoopColumn.DataAttribute] = "";
    
                    if (LoopColumn.DataAttribute in LoopData) {
                        LocalReturnData[LoopColumn.DataAttribute] = LoopData[LoopColumn.DataAttribute];
                    };
                };
            });
            return LocalReturnData;
        });
        
        return LocalReturnArray;
    },
    StartFunc1: ({ inData, inTableColumns, inUserPK }) => {
        console.log("ater----------- : ", inData);
        // console.log("LocalOriginalData : ", LocalOriginalData);
        let LocalReturnData = {};
        let LocalReturnArray = [];

        LocalReturnArray = inTableColumns.map(element => {
            if ("DataAttribute" in element) {
                LocalReturnData[element.DataAttribute] = "";

                if (element.DataAttribute in inData) {
                    LocalReturnData[element.DataAttribute] = inData[element.DataAttribute];
                };
            };
        });
        console.log("LocalReturnArray----------- : ", LocalReturnArray);
        // console.log("LocalReturnData : ", LocalReturnData);
        return LocalReturnArray;
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

                    let LocalTableColumnsToTransform = inTableColumns.filter(LoopItem => {
                        if ("DefaultValueShow" in LoopItem.ServerSide) {
                            return LoopItem.ServerSide.DefaultValueShow.Transform;
                        };
                    });

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
                            //                            console.log(`${property}: ${object[property]}`);
                        }
                    };
                    //console.log("LocalReturnData : ", LocalReturnData);
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

let FromTransformToUi = ({ inData, inTableColumns, inUserPK }) => {
    return LocalPullData.StartFunc({ inData, inTableColumns, inUserPK });
};

module.exports = { FromTransformToUi };
