let CommonPullData = require("../../../../PullData/From-ConfigFromFile");
let CommonPushData = require("../../../../PushData/To-ConfigFromFile");
//let CommonPushData = require("../../PushData/ToConfig");

let CommonFuns = {
    ToDisplay: async ({ inJsonConfig, inToName, inUserPK }) => {
        let LocalReturnData = { KTF: false, LocalCreateItem: "" };
        let LocalFromPushDataFuncAsync;
        let LocalDataFromJSON = await CommonPullData.AsJsonAsync({ inJsonConfig, inUserPK });
        let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));

        if (inToName in LocalDataFromJSONObject === false) {
            LocalDataFromJSONObject[inToName] = {};

            LocalFromPushDataFuncAsync = await CommonPushData.AsAsync({
                inJsonConfig, inUserPK,
                inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalDataFromJSONObject
            });

            if (LocalFromPushDataFuncAsync.KTF) {
                LocalReturnData.KTF = true;
            };
        };

        return LocalReturnData;
    }
};

let Insert = async ({ inJsonConfig, inToName, inUserPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalReturnDataFromDisplay = await CommonFuns.ToDisplay({ inJsonConfig, inToName, inUserPK });

    if (LocalReturnDataFromDisplay.KTF) {
        LocalReturnData.KTF = true;
    };

    return LocalReturnData;
};

module.exports = { Insert };