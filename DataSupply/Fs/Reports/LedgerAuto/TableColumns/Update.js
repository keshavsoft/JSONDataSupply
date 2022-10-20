let CommonPullDataAdmin = require("../../../../Fs/PullData/Admin");
let CommonPushDataAdmin = require("../../../../Fs/PushData/Admin");
let CommonPullData = require("../../../../Fs/PullData/Reports");
let CommonPushData = require("../../../../Fs/PushData/Reports");
let _ = require("lodash");
let debug = require("debug")("KS22");
let CommonUpdate = require("../../../Config/Update");
let CommonPushDataReports = require("../../../../Fs/PushData/Reports");

let PushData = ({ inJsonConfig, inItemConfig, inUserPK, inKeyName, inObjectToUpdate }) => {
    return new Promise((resolve, reject) => {
        let LocalDataFromJSON = CommonPullDataAdmin.DisplayJson({ inJsonConfig, inUserPK });
        let LocalUpdatedData = JSON.parse(JSON.stringify(LocalDataFromJSON));
        let LocalKeyData = LocalUpdatedData[inItemConfig.inItemName][inItemConfig.inScreenName].TableInfo.FooterType;

        for (var property in inObjectToUpdate) {
            LocalKeyData[property] = inObjectToUpdate[property];
        };

        CommonPushDataAdmin.PushData({ inJsonConfig, inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalUpdatedData }).then((PromiseData) => {
            resolve(PromiseData);
        }).catch((error) => {
            reject(error);
        })
    });
};

let DisplayType = ({ inItemConfig, inColumnPk, inUserPK, inObjectToUpdate }) => {
    return new Promise((resolve, reject) => {
        let LocalTableColumnData = "TableColumns";
        let LocalKey = "DisplayType";
        let LocalKeyData;
        debug("inObjectToUpdate : ", inObjectToUpdate);
        let LocalDataFromJSON = CommonPullData.PullDataReport({ inUserPK });
        let LocalUpdatedData = JSON.parse(JSON.stringify(LocalDataFromJSON));
        //debug("LocalUpdatedData : ", LocalUpdatedData, inItemConfig);
        let LocalColumnData = LocalUpdatedData[inItemConfig][LocalTableColumnData];

        LocalTableColumnArray = _.find(LocalColumnData, { pk: parseInt(inColumnPk) });

        if (LocalTableColumnArray.hasOwnProperty(LocalKey) === false) {
            LocalTableColumnArray[LocalKey] = {};
        };

        LocalKeyData = LocalTableColumnArray[LocalKey];

        for (var property in inObjectToUpdate) {
            LocalKeyData[property] = inObjectToUpdate[property];
        };

        CommonPushData.PushDataReport({ inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalUpdatedData }).then((PromiseData) => {
            resolve(PromiseData);
        }).catch((error) => {
            reject(error);
        })

    });
};

let PushDataReports = ({ inJsonConfig, inReportConfig, inUserPK, inQueryObject, inObjectToUpdate }) => {
    return new Promise((resolve, reject) => {
        // let LocalDataFromJSON = CommonPullDataAdmin.DisplayJson({ inJsonConfig, inUserPK });
        let LocalDataFromJSON = CommonPullData.PullDataReport({ inUserPK });

        if ("pk" in inObjectToUpdate) {
            inObjectToUpdate.pk = parseInt(inObjectToUpdate.pk);
        };

        let LocalUpdatedData = CommonUpdate.PushData({ inItemConfig: inReportConfig, inQueryObject, inDisplayData: LocalDataFromJSON, inObjectToUpdate });
        
        CommonPushDataReports.PushDataReport({ inJsonConfig, inUserPK, inOriginalData: LocalDataFromJSON, inDataToUpdate: LocalUpdatedData }).then((PromiseData) => {
            resolve(PromiseData);
        }).catch((error) => {
            reject(error);
        })
    });
};

module.exports = { PushData, DisplayType, PushDataReports };