let CommonDisplayPullData = require("../../DefultFileNames/Display/PullData");
let CommonDisplayPushData = require("../../DefultFileNames/Display/PushData");
let CommonReturnPullData = require("../../DefultFileNames/ReturnData/PullData");
let CommonReturnPushData = require("../../DefultFileNames/ReturnData/PushData");
let CommonItemsPullData = require("../../Data/Items/PullData");
let CommonItemsPushData = require("../../Data/Items/PushData");

//let CommonPushDataAdmin = require("../");

let CommonFuncs = {
    ToData: async ({ inJsonConfig, inFromName, inToName, inUserPK }) => {
        let LocalDataFromJSON = CommonItemsPullData.ReturnDataFromJson({ inJsonConfig, inUserPK });
        let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));
        let LocalReturnData;

        let LocalFromData = LocalDataFromJSONObject[inFromName];

        if (LocalDataFromJSONObject.hasOwnProperty(inToName)) {
            return { KTF: false, KReason: "Already present" };
        } else {
            LocalDataFromJSONObject[inToName] = LocalFromData;

            LocalReturnData = await CommonItemsPushData.PushDataAsync({ inJsonConfig, inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalDataFromJSONObject });
            return { KTF: false, KReason: LocalReturnData };
        };
    },
    ToDisplay: ({ inJsonConfig, inFromName, inToName, inUserPK }) => {
        return new Promise((resolve, reject) => {

            let LocalDataFromJSON = CommonDisplayPullData.ReturnDataFromJson({ inJsonConfig, inUserPK });
            let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));

            if (LocalDataFromJSONObject.hasOwnProperty(inToName)) {
                reject({ KTF: false, KReason: "Already present" });
            } else {
                LocalDataFromJSONObject[inToName] = LocalDataFromJSON[inFromName];

                CommonDisplayPushData.PushDataFunc({ inJsonConfig, inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalDataFromJSONObject }).then(resolve).catch(reject);
            };
        });
    },
    ToReturnData: ({ inJsonConfig, inFromName, inToName, inUserPK }) => {
        return new Promise((resolve, reject) => {
            let LocalDataFromJSON = CommonReturnPullData.ReturnDataFromJson({ inJsonConfig, inUserPK });
            let LocalDataFromJSONObject = JSON.parse(JSON.stringify(LocalDataFromJSON));

            if (LocalDataFromJSONObject.hasOwnProperty(inToName)) {
                reject({ KTF: false, KReason: "Already present" });
            } else {
                LocalDataFromJSONObject[inToName] = LocalDataFromJSON[inFromName];

                CommonReturnPushData.PushDataFunc({ inJsonConfig, inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalDataFromJSONObject }).then(resolve).catch(reject);
            };
        });
    }
};

exports.Single = ({ inJsonConfig, inFromName, inToName, inUserPK }) => {
    return new Promise((resolve, reject) => {
        let LocalReturnFromData = { KTF: false };

        CommonFuncs.ToDisplay({ inJsonConfig, inFromName, inToName, inUserPK }).then(PromiseDataToDisplay => {
            if (PromiseDataToDisplay.KTF) {
                CommonFuncs.ToReturnData({ inJsonConfig, inFromName, inToName, inUserPK }).then(PromiseDataToReturnData => {
                    CommonFuncs.ToData({ inJsonConfig, inFromName, inToName, inUserPK }).then(PromiseData => {
                        resolve(LocalReturnFromData);
                    }).catch();
                });
            }
        });
    });
};