let CommonGroupBy = require("./GroupByFuncs/GroupBy");
let CommonPostGroupBy = require("./GroupByFuncs/PostGroupBy");
let CommonVouchersConsiderStartFunc = require("./VouchersConsider/StartFunc");

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

    LocalReturnArray = await DataFromVouchersConsider({
        inVouchersConsider: LocalVouchersConsider,
        inUserPK
    });

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
        LocalDataNeeded = await CommonVouchersConsiderStartFunc.StartFunc({
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
