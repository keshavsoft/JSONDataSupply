let CommonGeneralFuncs = require("../../../../../../../GeneralFuns/Insert/Bulk/ForScreens");
let CommonPullData = require("../../../../PullData/FromConfig");
let CommonPushData = require("../../../../PushData/ToConfig");

let FromTemplate = async ({ inJsonConfig, inItemName, inUserPK, inFirstRow }) => {
    let LocalReturnData = { KTF: false, LocalCreateItem: "" };

    try {
        let LocalDataFromJSON = await CommonPullData.AsJsonAsync({ inJsonConfig, inUserPK });
        let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));
        let LocalReturnFromPush;
        
        let LocalFromGeneral = CommonGeneralFuncs.StartFunc({
            inUserPK, inJsonConfig,
            inColumnsArray: Object.keys(inFirstRow), inItemName
        });

        if (inItemName in LocalDataFromJSONObject) {
            LocalDataFromJSONObject[inItemName] = LocalFromGeneral;

            LocalReturnFromPush = await CommonPushData.AsAsync({
                inJsonConfig, inUserPK,
                inOriginalData: LocalDataFromJSON,
                inDataToUpdate: LocalDataFromJSONObject
            });

            if (LocalReturnFromPush.KTF) {
                LocalReturnData.KTF = true;
            };
        };

    } catch (error) {
        console.log("error : ", error);
    };

    return await LocalReturnData;
};

module.exports = {
    FromTemplate
};