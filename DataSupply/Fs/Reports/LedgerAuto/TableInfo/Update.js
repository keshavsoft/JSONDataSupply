let CommonPullDataReports = require("../../../Fs/PullData/Reports");
let CommonPushDataReports = require("../../../Fs/PushData/Reports");
let CommonUpdate = require("../../Update");

let PushData = ({ inJsonConfig, inItemConfig, inUserPK, inQueryObject, inObjectToUpdate }) => {
    return new Promise((resolve, reject) => {
        console.log("inObjectToUpdate : ", inObjectToUpdate, inQueryObject, inItemConfig);
        let LocalDataFromJSON = CommonPullDataReports.PullDataReport({ inJsonConfig, inUserPK });

        let LocalUpdatedData = CommonUpdate.PushData({ inItemConfig, inQueryObject, inDisplayData: LocalDataFromJSON, inObjectToUpdate });

        CommonPushDataReports.PushDataReport({ inJsonConfig, inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalUpdatedData }).then((PromiseData) => {
            resolve(PromiseData);
        }).catch((error) => {
            reject(error);
        })
    });
};

module.exports = { PushData };