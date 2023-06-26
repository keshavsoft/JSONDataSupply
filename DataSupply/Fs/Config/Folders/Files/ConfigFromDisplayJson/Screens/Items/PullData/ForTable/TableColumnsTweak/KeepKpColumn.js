let CommonReOrder = require("../../../../../../../../../../CommonTableFuncs/TableFuncs/ReOrder");

let StartFunc = ({ inTableColumns, inTableInfo }) => {
    let LocalNewColumnsArray = [];

    let LocalPkColumn = inTableColumns.find(element => element.DataAttribute === "pk");
    LocalPkColumn.ShowInTable = true;

    LocalNewColumnsArray = inTableColumns.filter(element => element.ShowInTable);

    LocalNewColumnsArray = CommonReOrder.StartFunc({
        inTableColumns: LocalNewColumnsArray,
        inTableInfo
    });

    return LocalNewColumnsArray;
};

module.exports = { StartFunc };
