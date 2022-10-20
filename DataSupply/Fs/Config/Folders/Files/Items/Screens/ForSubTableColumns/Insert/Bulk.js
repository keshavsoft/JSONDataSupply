let CommonPullDataAdmin = require("../../../../PullData/FromConfig");
let CommonToConfig = require("../../../../PushData/ToConfig");

let CommonColumnJsonFuncs = require("../../../../../../../../Fix/Json/SupplyJson");
//require("../../../../../../../../Fix")
let FixColumnData = ({ inColumnObject }) => {
    inColumnObject.CreateNew = true;
    inColumnObject.Insert = true;
    inColumnObject.ShowInTable = true;
};

let Insert = async ({ inJsonConfig, inItemConfig, inSubTableColumnArray, inUserPK }) => {
    try {
        let LocalReturnData = { KTF: false, LocalCreateItem: "" };
        let LocalReturnFromPush;
        let LocalNewTableInfo = CommonColumnJsonFuncs.TableInfo();
        let LocalNewColumnsArray;
        let LocalNewSubTableColumnsObject = {};
        let LocalLoopFirstRow;

        let LocalDisplayData = await CommonPullDataAdmin.AsJsonAsync({ inJsonConfig, inUserPK });

        let LocalDisplayDataObject = JSON.parse(JSON.stringify(LocalDisplayData));
        let LocalItemScreenData = LocalDisplayDataObject[inItemConfig.inItemName][inItemConfig.inScreenName];

        inSubTableColumnArray.forEach(LoopSubTableColumns => {
            if (LoopSubTableColumns.ValueAsArray.length > 0) {

                LocalLoopFirstRow = Object.keys(LoopSubTableColumns.ValueAsArray[0]);
                LocalNewTableInfo = CommonColumnJsonFuncs.TableColumn();

                LocalNewColumnsArray = LocalLoopFirstRow.map(element => {
                    LocalNewColumnObject = CommonColumnJsonFuncs.TableColumn();

                    FixColumnData({ inColumnObject: LocalNewColumnObject });

                    LocalNewColumnObject.DisplayName = element;
                    LocalNewColumnObject.DataAttribute = element;

                    return LocalNewColumnObject;
                });

                LocalNewSubTableColumnsObject[LoopSubTableColumns.ColumnName] = {
                    TableColumns: [...LocalNewColumnsArray],
                    TableInfo: LocalNewTableInfo
                };

            };
        });

        LocalItemScreenData.SubTableColumns = LocalNewSubTableColumnsObject;

        LocalReturnFromPush = await CommonToConfig.AsAsync({
            inJsonConfig, inUserPK,
            inOriginalData: LocalDisplayData,
            inDataToUpdate: LocalDisplayDataObject
        });

        return await LocalReturnFromPush;

    } catch (error) {
        console.log("error : ", error);
    };

};

module.exports = { Insert };