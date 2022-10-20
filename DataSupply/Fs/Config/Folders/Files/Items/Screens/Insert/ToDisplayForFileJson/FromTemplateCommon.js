let CommonForScreensTemplateCommon = require("../../../../../../../GeneralFuns/Insert/Bulk/ForScreensTemplateCommon");
let CommonPullData = require("../../../../PullData/From-ConfigFromFile");
let CommonPushData = require("../../../../PushData/To-ConfigFromFile");

let FromTemplate = async ({ inJsonConfig, inItemName, inUserPK, inFirstRow }) => {
    let LocalReturnData = { KTF: false, LocalCreateItem: "" };

    try {
        let LocalDataFromJSON = await CommonPullData.AsJsonAsync({ inJsonConfig, inUserPK });

        if (LocalDataFromJSON !== undefined) {
            let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));
            let LocalReturnFromPush;

            let LocalFromGeneral = CommonForScreensTemplateCommon.StartFunc({
                inUserPK, inJsonConfig,
                inColumnsArray: Object.keys(inFirstRow), inItemName
            });
            if (Object.keys(LocalDataFromJSONObject).length === 0) {
                LocalDataFromJSONObject = LocalFromGeneral;

                LocalReturnFromPush = await CommonPushData.AsAsync({
                    inJsonConfig, inUserPK,
                    inOriginalData: LocalDataFromJSON,
                    inDataToUpdate: LocalDataFromJSONObject
                });

                if (LocalReturnFromPush.KTF) {
                    LocalReturnData.KTF = true;
                };
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