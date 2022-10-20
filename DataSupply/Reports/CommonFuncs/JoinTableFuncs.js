let _ = require("lodash");

let InsertColumnData = ({ inData, inJoinTableData, inVouchersConsiderLine }) => {
    let LocalReturnData;
    let LocalLoopObject = {};
    let LocalJoinColumnsArray = _.filter(inVouchersConsiderLine.Columns, { ConsiderJoinTable: true });
    LocalReturnData = inData.map((LoopItemData) => {
        LocalLoopObject = _.clone(LoopItemData);

        LocalJoinColumnsArray.forEach((LoopItemJoinColumn) => {
            LocalLoopObject = FilterJoinTableData({
                inLoopItemData: LocalLoopObject,
                inJoinTableData, inLoopItemJoinColumn: LoopItemJoinColumn
            });
        });

        return LocalLoopObject;
    });
    return LocalReturnData;
};

let InsertData = ({ inData, inJoinTableData, inVouchersConsiderColumns }) => {
    let LocalReturnData;
    let LocalLoopObject = {};
    LocalReturnData = inData.map((LoopItemData) => {
        LocalLoopObject = _.clone(LoopItemData);
        inVouchersConsiderColumns.forEach((LoopItemJoinColumn) => {
            LocalLoopObject = FilterJoinTableData({ inLoopItemData: LocalLoopObject, inJoinTableData, inLoopItemJoinColumn: LoopItemJoinColumn });
        });

        return LocalLoopObject;
    });
    return LocalReturnData;
};

let FilterJoinTableData = ({ inLoopItemData, inJoinTableData, inLoopItemJoinColumn }) => {
    let LocalReturnData = inLoopItemData;
    let LocalFirstKey = inLoopItemJoinColumn.JoinTable;
    let LocalSecondKey = inLoopItemJoinColumn.PullKey;

    if (LocalFirstKey in inJoinTableData) {
        if (LocalSecondKey in inJoinTableData[LocalFirstKey]) {
            try {
                let LocalFilteredJoinTableData = Object.values(inJoinTableData[LocalFirstKey][LocalSecondKey]);
                let LocalFilterObject = {};
                let LocalJoinTableRowNeeded;
                LocalFilterObject[inLoopItemJoinColumn.JoinToCondition] = LocalReturnData[inLoopItemJoinColumn.JoinFromCondition];

                LocalJoinTableRowNeeded = _.find(LocalFilteredJoinTableData, LocalFilterObject);

                if (LocalJoinTableRowNeeded !== undefined) {
                    LocalReturnData[inLoopItemJoinColumn.DisplayColumn] = LocalJoinTableRowNeeded[inLoopItemJoinColumn.Name];
                };
            } catch (error) {
                console.log("Error in FilterJoinTableData : ", error);
            };
        };
    };

    return LocalReturnData;
};

module.exports = { InsertColumnData, FilterJoinTableData, InsertData };
