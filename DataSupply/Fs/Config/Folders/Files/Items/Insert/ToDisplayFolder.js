let CommonPullData = require("../../PullData/FromConfig");
let CommonPushData = require("../../PushData/ToConfig");

let CommonPullDataFromDisplayJson = require("../../PullData/FromConfigFolder/FromDisplayJson/AsJson");
let CommonPushDataFromDisplayJson = require("../../PushData/ToConfigFolder/ToDisplayJson/AsFoldFile");

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
    },
    FoldFileItemasync: async ({ inFolderName, inFileNameWithExtension, inToName, inDataPK }) => {
        let LocalReturnData = { KTF: false, LocalCreateItem: "" };
        let LocalFromPushDataFuncAsync;

        let LocalDataFromJSON = await CommonPullDataFromDisplayJson.FromFoldFile({
            inFolderName, inFileNameWithExtension,
            inDataPK
        });

        if (LocalDataFromJSON.KTF === false) {
            LocalDataFromJSON.KReason = LocalDataFromJSON.KReason;
            return await LocalReturnData;
        };

        console.log("LocalDataFromJSON-------------------- : ", LocalDataFromJSON);
        let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON.JsonData));

        if (inToName in LocalDataFromJSONObject === false) {
            LocalDataFromJSONObject[inToName] = {};

            LocalFromPushDataFuncAsync = await CommonPushDataFromDisplayJson.AsAsync({
                inFolderName,
                inJsonFileName: inFileNameWithExtension,
                inUserPK: inDataPK,
                inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalDataFromJSONObject
            });

            if (LocalFromPushDataFuncAsync.KTF) {
                LocalReturnData.KTF = true;
            };
        };

        return await LocalReturnData;
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

let FoldFileItem = async ({ inFolderName, inFileNameWithExtension, inToName, inDataPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };

    let LocalReturnDataFromDisplay = await CommonFuns.FoldFileItemasync({
        inFolderName,
        inFileNameWithExtension, inToName, inDataPK
    });

    if (LocalReturnDataFromDisplay.KTF) {
        LocalReturnData.KTF = true;
    };

    return LocalReturnData;
};

module.exports = { Insert, FoldFileItem };