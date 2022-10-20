let CommonGroupBy = require("./GroupBy");
//let CommonPostGroupBy = require("./PostGroupBy");
let CommonTransform = require("../VouchersConsider/Transform");

let CommonFuncs = {
    ForAddNewColumns: ({ inLast, inJsonData }) => {
        let LocalColumnsArray;
        let LocalAddNewColumnsKTF;
        let LocalReturnArray;

        if ("AddNewColumns" in inLast) {
            LocalColumnsArray = inLast.AddNewColumns.ColumnsArray;
            LocalAddNewColumnsKTF = inLast.AddNewColumns.KTF;
        };

        if (LocalAddNewColumnsKTF) {
            LocalReturnArray = CommonTransform.Transform({
                inColumns: LocalColumnsArray,
                inData: inJsonData
            });
        };
        //   console.log("LocalReturnArray : ", LocalReturnArray);
        return LocalReturnArray;
    }
}

let LocalStartFunc = ({ inLedgerAutoJsonWithItemName, inDataToSort, inDisplayColumns }) => {
    let LocalGroupByColumn;
    let LocalGroupByKTF;
    let LocalGroupByAsFloat;
    let LocalReturnArray = inDataToSort;
    let LocalDisplayColumns = inDisplayColumns;
    let LocalReturnFromForAddNewColumns;
    let LocalNewArray = inDataToSort;
    let LocalColumnsDataFreezed;

    if ("GroupBy" in inLedgerAutoJsonWithItemName.BeforeLast) {
        LocalGroupByColumn = inLedgerAutoJsonWithItemName.BeforeLast.GroupBy.ColumnName;
        LocalGroupByKTF = inLedgerAutoJsonWithItemName.BeforeLast.GroupBy.KTF;
        LocalGroupByAsFloat = inLedgerAutoJsonWithItemName.BeforeLast.GroupBy.ColumnsToGroupByAsFloat;
        LocalColumnsDataFreezed = inLedgerAutoJsonWithItemName.BeforeLast.GroupBy.ColumnsDataFreezed;

    };
    //console.log("LocalColumnsDataFreezed : ", LocalColumnsDataFreezed);
    if (LocalGroupByKTF) {
        LocalReturnArray = CommonGroupBy.SingleColumnAndMultipleColumnsReturn({
            inDataToSort,
            inGroupByColumn: LocalGroupByColumn,
            inColumnsToGroupByAsFloat: LocalGroupByAsFloat,
            inColumnsDataFreezed: LocalColumnsDataFreezed
        });
    };

    LocalNewArray = LocalReturnArray;
    
    if ("AddNewColumns" in inLedgerAutoJsonWithItemName.BeforeLast) {
        LocalReturnFromForAddNewColumns = CommonFuncs.ForAddNewColumns({
            inLast: inLedgerAutoJsonWithItemName.BeforeLast,
            inJsonData: LocalReturnArray
        });

        if (LocalReturnFromForAddNewColumns !== undefined) {
            if (LocalReturnArray.length === LocalReturnFromForAddNewColumns.length) {
                LocalNewArray = LocalReturnArray.map((element, LoopIndex) => {
                    return { ...element, ...LocalReturnFromForAddNewColumns[LoopIndex] };
                });
            };
        };
    };

    return LocalNewArray;
    //console.log('LocalReturnArray : ', LocalReturnArray[0]);
};

module.exports = {
    StartFunc: LocalStartFunc
}