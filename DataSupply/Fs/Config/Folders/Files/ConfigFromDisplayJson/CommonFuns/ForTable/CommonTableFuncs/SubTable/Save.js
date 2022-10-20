let CommonKeyPress = require("../../Table/Footer/KeyPress");
let CommonPullDataAdmin = require("../../Fs/DefultFileNames/Display/PullData");
let CommonPullUserData = require("../../Fs/Files/PullData");
let CommonVerticalCheckBeforeSave = require("../../Vertical/CheckBeforeSave");
let CommonPushUserData = require("../../Fs/Data/Items/PushData");

let CommonSaveFuncs = require("../../SaveFuncs");

let LocalSaveOnly = ({ inJsonConfig, inOriginalData, inItemName, inPostData, inUserPK, inInsertKey, inPK }) => {
    return new Promise((resolve, reject) => {
        try {
            let LocalDataToBeInserted = JSON.parse(JSON.stringify(inOriginalData));
            let LocalDataWithKey = LocalDataToBeInserted[inItemName];
            let LocalUserDataByPk = LocalDataWithKey[inPK];

            let LocalUserDataByPkAndInsertKey = LocalUserDataByPk[inInsertKey];

            let LocalNewPk = CommonSaveFuncs.GeneratePk({ inDataWithKey: LocalUserDataByPkAndInsertKey });

            LocalUserDataByPkAndInsertKey[LocalNewPk] = inPostData;
            CommonPushUserData.PushDataAsync({ inJsonConfig, inUserPK, inOriginalData, inDataToUpdate: LocalDataToBeInserted }).then((PromiseData) => {
                if (PromiseData.KTF === true) {
                    resolve({ KTF: true, kPK: LocalNewPk });
                }
            }).catch(reject);
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

let LocalPrepareObjectToSave = ({ inConfigDataColumns, inPostData, inUserPK }) => {
    let LocalObject = {};

    LocalObject = InsertDefaultValueBeforeSave({ inDisplayColumns: inConfigDataColumns, inPostData });
    LocalObject = CommonSaveFuncs.LocalTransformObjectBeforeSaving({ inDisplayColumns: inConfigDataColumns, inObjectToInsert: LocalObject });
    LocalObject = CommonSaveFuncs.InsertUserInfoWithDateStamp({ inObjectToInsert: LocalObject, inUserPK });

    return LocalObject;
};

let FromEnterToServer = ({ inJsonConfig, inItemConfig, inUserPK, inPostData, inInsertKey, inPK }) => {
    return new Promise((resolve, reject) => {
        try {

            let LocalUserData;
            let LocalConfigData;
            let LocalConfigDataColumns;
            let LocalObject = {};

            if (inUserPK > 0) {
                LocalUserData = CommonPullUserData.ReturnDataFromJson({ inJsonConfig, inUserPK });
                LocalConfigData = CommonPullDataAdmin.ReturnDataFromJson({ inJsonConfig, inUserPK });

                LocalConfigDataColumns = LocalConfigData[inItemConfig.inItemName][inItemConfig.inScreenName].SubTableColumns[inInsertKey]["TableColumns"];

                LocalObject = LocalPrepareObjectToSave({ inConfigDataColumns: LocalConfigDataColumns, inPostData, inUserPK });

                CommonVerticalCheckBeforeSave.ServerSideCheckAsync({
                    inItemConfig,
                    inUserData: LocalUserData,
                    inConfigTableColumns: LocalConfigDataColumns,
                    inObjectToInsert: LocalObject, inUserPK
                }).then(PromiseData => {
                    if (PromiseData.KTF) {
                        CommonKeyPress.EnterToServerSubTable({ inJsonConfig, inItemConfig, inInsertKey, inUserPK, inPostData }).then(PromiseDataFromEnterToServer => {
                            if (PromiseDataFromEnterToServer.KTF) {
                                LocalSaveOnly({
                                    inJsonConfig,
                                    inOriginalData: LocalUserData,
                                    inItemName: inItemConfig.inItemName, inPostData: PromiseDataFromEnterToServer.DataFromServer[0],
                                    inUserPK, inInsertKey, inPK
                                }).then(resolve).catch(reject);
                            };
                        }).catch();
                    } else {
                        reject(PromiseData);
                    };
                }).catch();
            };
        } catch (error) {
            console.log("FromEnterToServer  error : ", error);
        };

    });
};

module.exports = { FromEnterToServer };
