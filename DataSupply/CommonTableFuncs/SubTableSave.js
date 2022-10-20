let CommonPullDataAdmin = require("../Fs/DefultFileNames/Display/PullData");
let CommonPushUserData = require("../Fs/Files/PushData");
let CommonPullUserData = require("../Fs/Files/PullData");
let CommonCheckBeforeSave = require("../Vertical/CheckBeforeSave");

let CommonSaveFuncs = require("../SaveFuncs");

let LocalPrepareObjectToSave = ({ inConfigDataColumns, inPostData, inUserPK }) => {
    let LocalObject = {};

    LocalObject = InsertDefaultValueBeforeSave({ inDisplayColumns: inConfigDataColumns, inPostData });
    LocalObject = CommonSaveFuncs.LocalTransformObjectBeforeSaving({ inDisplayColumns: inConfigDataColumns, inObjectToInsert: LocalObject });
    LocalObject = CommonSaveFuncs.InsertUserInfoWithDateStamp({ inObjectToInsert: LocalObject, inUserPK });

    return LocalObject;
};

let Save = ({ inJsonConfig, inItemConfig, inUserPK, inPostData, inInsertKey, inPK }) => {
    return new Promise((resolve, reject) => {
        let LocalUserData;
        let LocalConfigData;
        let LocalConfigDataColumns;
        let LocalObject = {};

        if (inUserPK > 0) {
            LocalUserData = CommonPullUserData.ReturnDataFromJson({ inJsonConfig, inUserPK });
            LocalConfigData = CommonPullDataAdmin.ReturnDataFromJson({ inJsonConfig, inUserPK });

            LocalConfigDataColumns = LocalConfigData[inItemConfig.inItemName][inItemConfig.inScreenName].SubTableColumns[inInsertKey]["TableColumns"];

            LocalObject = LocalPrepareObjectToSave({ inConfigDataColumns: LocalConfigDataColumns, inPostData, inUserPK });

            CommonCheckBeforeSave.ServerSideCheckAsync({
                inItemConfig,
                inUserData: LocalUserData,
                inConfigTableColumns: LocalConfigDataColumns,
                inObjectToInsert: LocalObject, inUserPK
            }).then(PromiseData => {
                if (PromiseData.KTF) {
                    LocalSaveOnly({
                        inJsonConfig,
                        inOriginalData: LocalUserData,
                        inItemName: inItemConfig.inItemName, inPostData: LocalObject,
                        inUserPK, inInsertKey, inPK
                    }).then(resolve).catch(reject);
                } else {
                    reject(PromiseData);
                };
            }).catch();

        };
    });
};

let LocalSaveOnly = ({ inJsonConfig, inOriginalData, inItemName, inPostData, inUserPK, inInsertKey, inPK }) => {
    return new Promise((resolve, reject) => {
        try {
            let LocalDataToBeInserted = JSON.parse(JSON.stringify(inOriginalData));
            let LocalDataWithKey = LocalDataToBeInserted[inItemName];
            let LocalUserDataByPk = LocalDataWithKey[inPK];
            let LocalNewPk;

            let LocalUserDataByPkAndInsertKey = LocalUserDataByPk[inInsertKey];

            if (typeof LocalUserDataByPkAndInsertKey === "object") {

                LocalNewPk = CommonSaveFuncs.GeneratePk({ inDataWithKey: LocalUserDataByPkAndInsertKey });

                LocalUserDataByPkAndInsertKey[LocalNewPk] = inPostData;

                CommonPushUserData.PushData({ inJsonConfig, inUserPK, inOriginalData, inDataToUpdate: LocalDataToBeInserted }).then((PromiseData) => {
                    if (PromiseData.KTF === true) {
                        resolve({ KTF: true, kPK: LocalNewPk });
                    }
                }).catch(RejectData => {
                    reject(RejectData);
                });
            } else {
                reject({ KTF: false, KReason: `${inInsertKey} is not object` });
            };
        } catch (error) {
            console.log("localsaveonly error : ", error);
        };
    });
};

let InsertDefaultValueBeforeSave = ({ inDisplayColumns, inPostData }) => {
    let LocalObject = {};

    inDisplayColumns.forEach(loopitem => {
        if (loopitem.DefaultValue === "Object") {
            LocalObject[loopitem.DataAttribute] = {};
        } else {
            if (inPostData[loopitem.DataAttribute] === undefined) {
                LocalObject[loopitem.DataAttribute] = loopitem.DefaultValue;
            } else {
                LocalObject[loopitem.DataAttribute] = inPostData[loopitem.DataAttribute];
            };
        };
    });

    return LocalObject;
};

let SaveFromEnterToServer = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData, inInsertKey, inPK }) => {
    let LocalUserData;
    let LocalConfigData;
    let LocalConfigDataColumns;
    let LocalObject = {};

    if (inUserPK > 0) {
        LocalUserData = CommonPullUserData.ReturnDataFromJson({ inJsonConfig, inUserPK });
        LocalConfigData = CommonPullDataAdmin.ReturnDataFromJson({ inJsonConfig, inUserPK });

        LocalConfigDataColumns = LocalConfigData[inItemConfig.inItemName][inItemConfig.inScreenName].SubTableColumns[inInsertKey]["TableColumns"];

        LocalObject = LocalPrepareObjectToSave({ inConfigDataColumns: LocalConfigDataColumns, inPostData, inUserPK });

        LocalSaveOnly({ inJsonConfig, inOriginalData: LocalUserData, inItemName: inItemConfig.inItemName, inPostData: LocalObject, inUserPK, inInsertKey, inPK }).then(PromiseData => {
            return PromiseData;
        }).catch(PromiseError => {

        });
    };
};

module.exports = { Save, SaveFromEnterToServer, SaveOnly: LocalSaveOnly, PrepareObjectToSave: LocalPrepareObjectToSave };
