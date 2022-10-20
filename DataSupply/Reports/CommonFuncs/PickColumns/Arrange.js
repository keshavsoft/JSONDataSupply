let _ = require("lodash");

let FromTableColumns = ({ inData, inTableColumns }) => {
    console.log("aaaaaaaaaaaa : ");
    let LocalLoopObject = {};
    let LocalColumnsArray;

    let LocalSortedColumns = LocalSortArray({ inTableColumns });

    LocalColumnsArray = LocalSortedColumns.map(element => element.DataAttribute);

    let LocalReturnData = inData.map(LoopItem => {
        LocalLoopObject = {};
        //console.log("LocalColumnsArray : ", LocalColumnsArray);
        LocalColumnsArray.forEach(element => {
            LocalLoopObject[element] = LoopItem[element];
        });
        return LocalLoopObject
    });

    return LocalReturnData;
};

let LocalSortArray = ({ inTableColumns }) => {
    let LocalFirstValue;
    let LocalSecondValue;

    let LocalSortedColumns = inTableColumns.sort((a, b) => {
        LocalFirstValue = 0;
        LocalSecondValue = 0;

        if ("OrderNumber" in a) {
            LocalFirstValue = a.OrderNumber;
        };

        if ("OrderNumber" in b) {
            LocalSecondValue = b.OrderNumber;
        };

        if (LocalFirstValue > LocalSecondValue) {
            return 1
        } else {
            return -1
        };
        //a.OrderNumber < b.OrderNumber ? 1 : -1
    });

    return LocalSortedColumns;
};

module.exports = { FromTableColumns };