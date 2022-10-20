let CommonPullData = require("../../PullData/FromData");
let CommonPushData = require("../../PushData/ToData");

let CommonPullDataFromFolderAndFile = require("../../PullData/FromDataFolder/FromFolderAndFile");
let CommonPushDataFromFolderAndFile = require("../../PushData/ToDataFolder/FromFolderAndFile");

let Insert = async ({ inJsonConfig, inToName, inUserPK }) => {
    let LocalReturnData = { KTF: false, LocalCreateItem: "" };
    let LocalFromPushDataFuncAsync;

    let LocalDataFromJSON = await CommonPullData.AsJsonAsync({ inJsonConfig, inUserPK });
    let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));
    if (inToName in LocalDataFromJSONObject === false) {
        LocalDataFromJSONObject[inToName] = {};

        LocalFromPushDataFuncAsync = await CommonPushData.AsAsync({ inJsonConfig, inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalDataFromJSONObject });
        console.log("LocalFromPushDataFuncAsync: ", LocalFromPushDataFuncAsync);

        if (LocalFromPushDataFuncAsync.KTF) {
            LocalReturnData.KTF = true;
        };
    };

    return LocalReturnData;
};

let FoldFileItem = async ({ inFolderName, inFileNameWithExtension, inToName, inDataPK }) => {
    let LocalReturnData = { KTF: false, LocalCreateItem: "" };
    let LocalFromPushDataFuncAsync;

    let LocalDataFromJSON = await CommonPullDataFromFolderAndFile.FullJsonData({
        inFolderName, inFileNameWithExtension,
        inDataPK
    });

    if (LocalDataFromJSON.KTF === false) {
        LocalReturnData.KReason = LocalDataFromJSON.KReason;
        return await LocalReturnData;
    };

    let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON.KResult));

    if (inToName in LocalDataFromJSONObject === false) {
        LocalDataFromJSONObject[inToName] = {};

        LocalFromPushDataFuncAsync = await CommonPushDataFromFolderAndFile.AsAsync({
            inFolderName, inFileNameWithExtension,
            inDataPK,
            inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalDataFromJSONObject
        });

        if (LocalFromPushDataFuncAsync.KTF) {
            LocalReturnData.KTF = true;
        };
    };

    return await LocalReturnData;
};

module.exports = { Insert, FoldFileItem };