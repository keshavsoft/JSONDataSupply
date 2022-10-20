let CommonTableFuncs = require("../CommonTableFuncs/Save");
let CommonTableFuncsSaveFirstRow = require("../CommonTableFuncs/SaveFirstRow");
let CommonTableFuncsSaveFirstRowFromEnterToServer = require("../CommonTableFuncs/SaveFirstRowFromEnterToServer");

let CheckAndSave = ({ inJsonConfig, inItemConfig, inUserPK, inPostData }) => {
    return new Promise((resolve, reject) => {
        CommonTableFuncs.Save({ inJsonConfig, inItemConfig, inUserPK, inPostData }).then(PromiseData => {
            if (PromiseData.KTF) {
                resolve(PromiseData);
            };
        }).catch(reject);
    });
};

let SaveFirstRow = ({ inJsonConfig, inItemConfig, inUserPK, inInsertKey, inPostData }) => {
    return new Promise((resolve, reject) => {
        CommonTableFuncsSaveFirstRow.Save({ inJsonConfig, inItemConfig, inUserPK, inInsertKey, inPostData }).then(PromiseData => {
            if (PromiseData.KTF) {
                resolve(PromiseData);
            };
        }).catch(reject);
    });
};

let SaveFirstRowFromEnterToServer = ({ inJsonConfig, inItemConfig, inUserPK, inInsertKey, inPostData }) => {
    return new Promise((resolve, reject) => {

        CommonTableFuncsSaveFirstRowFromEnterToServer.Save({ inJsonConfig, inItemConfig, inUserPK, inInsertKey, inPostData }).then(PromiseData => {
            if (PromiseData.KTF) {
                resolve(PromiseData);
            };
        }).catch(reject);
    });
};

module.exports = { CheckAndSave, SaveFirstRow, SaveFirstRowFromEnterToServer };