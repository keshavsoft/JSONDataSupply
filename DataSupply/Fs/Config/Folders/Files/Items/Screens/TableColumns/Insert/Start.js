let CommonPullDataAdmin = require("../../../../PullData/FromConfig");
let CommonPushDataAdmin = require("../../../../PushData/ToConfig");
let CommonColumnJsonFuncs = require("../../../../../../../../Fix/Json/SupplyJson");

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
        
        FixColumnData({ inColumnObject: LocalNewColumnObject });

        LocalNewColumnObject.DisplayName = inColumnName;
        LocalNewColumnObject.DataAttribute = inColumnName;

        let LocalDisplayData = await CommonPullDataAdmin.AsJsonAsync({ inJsonConfig, inUserPK });

        let LocalDisplayDataObject = JSON.parse(JSON.stringify(LocalDisplayData));
        let LocalItemScreenData = LocalDisplayDataObject[inItemConfig.inItemName][inItemConfig.inScreenName];

        LocalItemScreenData.TableColumns.push(LocalNewColumnObject);

        LocalReturnFromPush = await CommonPushDataAdmin.AsAsync({
            inJsonConfig, inUserPK,
            inOriginalData: LocalDisplayData, inDataToUpdate: LocalDisplayDataObject
        });

        return await LocalReturnFromPush;

    } catch (error) {
        console.log("error : ", error);
    };

};

module.exports = { Insert };