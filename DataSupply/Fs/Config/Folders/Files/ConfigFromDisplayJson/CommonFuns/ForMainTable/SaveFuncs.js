let CommonPullDataAdmin = require("../../../ConfigFromDisplayJson/Screens/Items/PullData/FromDisplayJson/FromJson");
let CommonPullUserData = require("../../../PullData/FromData");
let CommonPushUserData = require("../../../PushData/ToData");

let CommonCheckBeforeSave = require("../ForTable/CommonTableFuncs/Vertical/CheckBeforeSave");

let CommonSaveFuncs = require("../SaveFuncs");

let LocalPrepareObjectToSave = ({ inConfigDataColumns, inPostData, inUserPK }) => {
    let LocalObject = {};

    LocalObject = InsertDefaultValueBeforeSave({ inDisplayColumns: inConfigDataColumns, inPostData });
    LocalObject = CommonSaveFuncs.LocalTransformObjectBeforeSaving({ inDisplayColumns: inConfigDataColumns, inObjectToInsert: LocalObject });
    LocalObject = CommonSaveFuncs.InsertUserInfoWithDateStamp({ inObjectToInsert: LocalObject, inUserPK });

    return LocalObject;
};

let Save = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData, inInsertKey, inPK }) => {
    let LocalDataPK = inUserPK;
    let LocalUserData;
    let LocalConfigData;
    let LocalConfigDataColumns;
    let LocalObject = {};
    let LocalReturnObject = { KTF: false, kPK: 0 };

    console.log("inInsertKey----------- : ", inInsertKey);
    if (LocalDataPK > 0) {
        LocalUserData = await CommonPullUserData.AsJsonAsync({ inJsonConfig, inUserPK: LocalDataPK });

        LocalConfigData = await CommonPullDataAdmin.AsJsonAsync({
            inJsonConfig,
            inItemConfig,
            inDataPK: LocalDataPK
        });

        LocalConfigDataColumns = LocalConfigData.SubTableColumns[inInsertKey]["TableColumns"];

        LocalObject = LocalPrepareObjectToSave({ inConfigDataColumns: LocalConfigDataColumns, inPostData, inUserPK });

        let PromiseData = await CommonCheckBeforeSave.ServerSideCheckAsync({
            inItemConfig,
            inUserData: LocalUserData,
            inConfigTableColumns: LocalConfigDataColumns,
            inObjectToInsert: LocalObject, inUserPK: LocalDataPK
        });

        if (PromiseData.KTF) {
            let LocalFromSave = await LocalSaveOnly({
                inJsonConfig,
                inOriginalData: LocalUserData,
                inItemName: inItemConfig.inItemName, inPostData: LocalObject,
                inUserPK, inInsertKey, inPK
            });

            LocalReturnObject.KReason = LocalFromSave.KReason;

            if (LocalFromSave.KTF) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.kPK = LocalFromSave.kPK;
            };
        };
    };

    return await LocalReturnObject;
};

let LocalSaveOnly = async ({ inJsonConfig, inOriginalData, inItemName, inPostData, inUserPK, inInsertKey, inPK }) => {
    let LocalReturnObject = { KTF: false, kPK: 0 };

    try {
        let LocalDataToBeInserted = JSON.parse(JSON.stringify(inOriginalData));
        let LocalDataWithKey = LocalDataToBeInserted[inItemName];
        let LocalUserDataByPk = LocalDataWithKey[inPK];
        let LocalNewPk;

        let LocalUserDataByPkAndInsertKey = LocalUserDataByPk[inInsertKey];

        if (typeof LocalUserDataByPkAndInsertKey === "object") {

            LocalNewPk = CommonSaveFuncs.GeneratePk({ inDataWithKey: LocalUserDataByPkAndInsertKey });

            LocalUserDataByPkAndInsertKey[LocalNewPk] = inPostData;

            let PromiseData = await CommonPushUserData.AsAsync({ inJsonConfig, inUserPK, inOriginalData, inDataToUpdate: LocalDataToBeInserted });

            if (PromiseData.KTF) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.kPK = LocalNewPk;
            };
        } else {
            LocalReturnObject.KReason = `${inInsertKey} is not object`;
        };
    } catch (error) {
        LocalReturnObject.KReason = error;
        //  console.log("localsaveonly error : ", error);
    };

    return await LocalReturnObject;
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

module.exports = { Save };
