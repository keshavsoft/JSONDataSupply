let CommonPullDataAdmin = require("../../../DefultFileNames/Display/PullData");
let CommonPushDataAdmin = require("../../../DefultFileNames/Display/PushData");
//let CommonFixColumn = require("../../../../Fix/CommonFuncs/TableColumns");
//let CommonFromItemConfig = require("../../../PullData/FromItemConfig");
let CommonColumnJsonFuncs = require("../../../../Fix/Json/SupplyJson");

let FixColumnData = ({ inColumnObject }) => {
    inColumnObject.CreateNew = true;
    inColumnObject.Insert = true;
    inColumnObject.ShowInTable = true;
};

let Insert = async ({ inJsonConfig, inItemConfig, inColumnName, inUserPK }) => {
    try {
        let LocalReturnData = { KTF: false, LocalCreateItem: "" };
        let LocalReturnFromPush;
        let LocalNewColumnObject = CommonColumnJsonFuncs.TableColumn();
        
        // CommonFixColumn.FixSingleColumn({ inObjectToFix: LocalNewColumnObject });
        FixColumnData({ inColumnObject: LocalNewColumnObject });
        console.log("LocalNewColumnObject : ", LocalNewColumnObject.ServerSide);

        LocalNewColumnObject.DisplayName = inColumnName;
        LocalNewColumnObject.DataAttribute = inColumnName;

        let LocalDisplayData = await CommonPullDataAdmin.ReturnDataAsyncOriginal({ inJsonConfig, inUserPK });

        let LocalDisplayDataObject = JSON.parse(JSON.stringify(LocalDisplayData));
        let LocalItemScreenData = LocalDisplayDataObject[inItemConfig.inItemName][inItemConfig.inScreenName];

        LocalItemScreenData.TableColumns.push(LocalNewColumnObject);

        LocalReturnFromPush = await CommonPushDataAdmin.PushDataFuncAsync({
            inJsonConfig, inUserPK,
            inOriginalData: LocalDisplayData, inDataToUpdate: LocalDisplayDataObject
        });

        return await LocalReturnFromPush;

    } catch (error) {
        console.log("error : ", error);
    };

};

module.exports = { Insert };