
class ReOrder {
    static TableColumns = ({ inTableColumns, inTableInfo }) => {
        let LocalNewTableColumns = JSON.parse(JSON.stringify(inTableColumns));
        let LocalReturnData = { KTF: false, KData: LocalNewTableColumns };

        if ("ColumnReOrder" in inTableInfo) {
            if (inTableInfo.ColumnReOrder) {
                LocalNewTableColumns = LocalNewTableColumns.map((LoopItem, LoopIndex) => {
                    if (("DisplayOrder" in LoopItem) === false) {
                        LoopItem.DisplayOrder = {};
                    };

                    if ("DisplayOrder" in LoopItem) {
                        if (("inTable" in LoopItem.DisplayOrder) === false) {
                            LoopItem.DisplayOrder.inTable = LoopIndex + 1;
                        };
                    };

                    return LoopItem;
                });
                //   console.log("999999999 : ", inTableInfo.ColumnReOrder);
                LocalReturnData.KData = LocalNewTableColumns.sort((a, b) => {
                    if ("DisplayOrder" in a && "DisplayOrder" in b) {
                        if ("inTable" in a.DisplayOrder && "inTable" in b.DisplayOrder) {
                            return a.DisplayOrder.inTable - b.DisplayOrder.inTable;
                        };
                    };
                });
            };
        };

        return LocalReturnData;
    };
};

let StartFunc = ({ inTableColumns, inTableInfo }) => {
    return ReOrder.TableColumns({
        inTableColumns,
        inTableInfo
    }).KData;
};

module.exports = {
    StartFunc
};
