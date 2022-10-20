let CommonPullDataAdmin = require("../../../../PullData/FromConfig");
let CommonPushDataAdmin = require("../../../../PushData/ToConfig");
let CommonColumnJsonFuncs = require("../../../../../../../../Fix/Json/SupplyJson");

let FixColumnData = ({ inColumnObject }) => {
    inColumnObject.CreateNew = true;
    inColumnObject.Insert = true;
    inColumnObject.ShowInTable = true;
};

let Insert = async ({ inJsonConfig, inItemConfig, inColumnArray, inUserPK }) => {
    try {
        let LocalReturnData = { KTF: false, LocalCreateItem: "" };
        let LocalReturnFromPush;
        let LocalNewColumnObject
        // = CommonColumnJsonFuncs.TableColumn();
        let LocalNewColumnsArray;

        let LocalDisplayData = await CommonPullDataAdmin.AsJsonAsync({ inJsonConfig, inUserPK });

        let LocalDisplayDataObject = JSON.parse(JSON.stringify(LocalDisplayData));
        let LocalItemScreenData = LocalDisplayDataObject[inItemConfig.inItemName][inItemConfig.inScreenName];

        LocalNewColumnsArray = inColumnArray.map(element => {
            LocalNewColumnObject = CommonColumnJsonFuncs.TableColumn();

            FixColumnData({ inColumnObject: LocalNewColumnObject });

            LocalNewColumnObject.DisplayName = element;
            LocalNewColumnObject.DataAttribute = element;

            return LocalNewColumnObject;
        });

        LocalItemScreenData.TableColumns.push(...LocalNewColumnsArray);

        LocalReturnFromPush = await CommonPushDataAdmin.AsAsync({
            inJsonConfig, inUserPK,
            inOriginalData: LocalDisplayData, inDataToUpdate: LocalDisplayDataObject
        });

        //console.log("LocalReturnFromPush : ", LocalReturnFromPush);
        if (LocalReturnFromPush.KTF) {
            LocalReturnData.KTF = true;
        };

        //return await LocalReturnFromPush;

        return await LocalReturnData;
    } catch (error) {
        console.log("error : ", error);
    };

};

let InsertFromTemplate = async ({ inJsonConfig, inItemConfig, inColumnArray, inUserPK }) => {
    try {
        let LocalReturnData = { KTF: false, LocalCreateItem: "" };
        let LocalReturnFromPush;
        let LocalNewColumnObject
        // = CommonColumnJsonFuncs.TableColumn();
        let LocalNewColumnsArray;

        let LocalDisplayData = await CommonPullDataAdmin.AsJsonAsync({ inJsonConfig, inUserPK });

        let LocalDisplayDataObject = JSON.parse(JSON.stringify(LocalDisplayData));
        let LocalItemScreenData = LocalDisplayDataObject[inItemConfig.inItemName][inItemConfig.inScreenName];

        LocalNewColumnsArray = inColumnArray.map(element => {
            LocalNewColumnObject = CommonColumnJsonFuncs.TableColumn();

            FixColumnData({ inColumnObject: LocalNewColumnObject });

            LocalNewColumnObject.DisplayName = element;
            LocalNewColumnObject.DataAttribute = element;

            return LocalNewColumnObject;
        });

        LocalItemScreenData.TableColumns.push(...LocalNewColumnsArray);

        LocalReturnFromPush = await CommonPushDataAdmin.AsAsync({
            inJsonConfig, inUserPK,
            inOriginalData: LocalDisplayData, inDataToUpdate: LocalDisplayDataObject
        });

        //console.log("LocalReturnFromPush : ", LocalReturnFromPush);
        if (LocalReturnFromPush.KTF) {
            LocalReturnData.KTF = true;
        };

        //return await LocalReturnFromPush;

        return await LocalReturnData;
    } catch (error) {
        console.log("error : ", error);
    };

};

module.exports = {
    Insert,
    InsertFromTemplate
};