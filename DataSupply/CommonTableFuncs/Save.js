let CommonCheckBeforeSave = require("../Vertical/CheckBeforeSave");
let CommonDefaultValue = require("../ToUi/CalculateDefaultValue");

let CommonDisplayPullData = require("../Fs/Config/Folders/Files/ConfigFromDisplayJson/Screens/Items/PullData/FromDisplayJson/FromJson");
let CommonFilesPullData = require("../Fs/Config/Folders/Files/PullData/FromData");
let CommonFilesPushData = require("../Fs/Config/Folders/Files/PushData/ToData");
let CommonSaveFuncs = require("../SaveFuncs");
let CommonInsertWithPk = require("../Fs/Config/JSONFolder/DataPkAsFolder/DataFolder/UserFolder/UserJsonFile/ItemName/PushData/InsertWithPk");
let CommonFromFolderFileItemName = require("../Fs/Config/JSONFolder/DataPkAsFolder/DataFolder/UserFolder/UserJsonFile/ItemName/PushData/FromFolderFileItemName");

let Save = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData }) => {
    let LocalReturnObject = { KTF: false, kPK: 0 };
    let LocalFromSaveOnly;

    let LocalUserData;
    let LocalUserDataWithItemName;
    let LocalConfigData;
    let LocalConfigDataColumns;
    let LocalObject = {};
    let LocalFromServerSideCheck;

    if (inUserPK > 0) {
        LocalUserData = await CommonFilesPullData.AsJsonAsync({ inJsonConfig, inUserPK });
        LocalConfigData = await CommonDisplayPullData.AsJsonAsync({ inJsonConfig, inItemConfig, inDataPK: inUserPK });

        LocalConfigDataColumns = LocalConfigData.TableColumns;
        LocalUserDataWithItemName = LocalUserData[inItemConfig.inItemName];

        CommonDefaultValue.CalculateDefaultValue({
            inColumns: LocalConfigDataColumns,
            inData: LocalUserDataWithItemName, inPostData
        });

        LocalObject = InsertDefaultValueBeforeSaveConsiderInsert({ inDisplayColumns: LocalConfigDataColumns, inPostData });

        LocalObject = CommonSaveFuncs.LocalTransformObjectBeforeSaving({ inDisplayColumns: LocalConfigDataColumns, inObjectToInsert: LocalObject });
        LocalObject = CommonSaveFuncs.InsertUserInfoWithDateStamp({ inObjectToInsert: LocalObject, inUserPK });

        LocalFromServerSideCheck = CommonCheckBeforeSave.ServerSideCheck({
            inItemConfig, inUserData: LocalUserData,
            inConfigData: LocalConfigData, inObjectToInsert: LocalObject, inUserPK
        });

        LocalReturnObject = { ...LocalFromServerSideCheck };
        console.log('LocalReturnObject',LocalReturnObject);
        LocalReturnObject.KTF = false;

        if (LocalFromServerSideCheck.KTF === false) {
            return await LocalReturnObject;
        };

        LocalFromSaveOnly = await SaveOnly({ inJsonConfig, inOriginalData: LocalUserData, inItemName: inItemConfig.inItemName, inPostData: LocalObject, inUserPK });
        LocalReturnObject = { ...LocalFromSaveOnly };
        LocalReturnObject.KTF = false;

        if (LocalFromSaveOnly.KTF === false) {
            delete LocalReturnObject.JsonData;
            return await LocalReturnObject;
        };

        LocalReturnObject.KTF = true;
        // LocalReturnObject.kPK = LocalFromSaveOnly.kPK;
        LocalReturnObject.kPK = LocalFromSaveOnly.NewRowPK;
        delete LocalReturnObject.JsonData;
    };

    return await LocalReturnObject;
};

let CheckOnly = ({ inJsonConfig, inItemConfig, inUserPK, inPostData }) => {
    return new Promise((resolve, reject) => {
        let LocalUserData;
        let LocalUserDataWithItemName;
        let LocalConfigData;
        let LocalConfigDataColumns;
        let LocalObject = {};
        let LocalFromServerSideCheck;

        if (inUserPK > 0) {
            LocalUserData = CommonFilesPullData.AsJsonAsync({ inJsonConfig, inUserPK });
            LocalConfigData = CommonDisplayPullData.AsJsonAsync({ inJsonConfig, inItemConfig, inUserPK });
            LocalConfigDataColumns = LocalConfigData.TableColumns;
            LocalUserDataWithItemName = LocalUserData[inItemConfig.inItemName];

            CommonDefaultValue.CalculateDefaultValue({ inColumns: LocalConfigDataColumns, inData: LocalUserDataWithItemName, inPostData });

            LocalObject = InsertDefaultValueBeforeSaveConsiderInsert({ inDisplayColumns: LocalConfigDataColumns, inPostData });

            LocalObject = CommonSaveFuncs.LocalTransformObjectBeforeSaving({ inDisplayColumns: LocalConfigDataColumns, inObjectToInsert: LocalObject });
            LocalObject = CommonSaveFuncs.InsertUserInfoWithDateStamp({ inObjectToInsert: LocalObject, inUserPK });

            LocalFromServerSideCheck = CommonCheckBeforeSave.ServerSideCheck({
                inItemConfig, inUserData: LocalUserData,
                inConfigData: LocalConfigData, inObjectToInsert: LocalObject, inUserPK
            });

            if (LocalFromServerSideCheck.KTF) {
                LocalFromServerSideCheck.ObjectToInsert = LocalObject;
                resolve(LocalFromServerSideCheck);
            } else {
                reject(LocalFromServerSideCheck);
            };
        };
    });
};

let PrepareObjectBeforeSave = ({ inJsonConfig, inItemConfig, inUserPK, inPostData = {} }) => {
    return new Promise((resolve, reject) => {
        let LocalUserData;
        let LocalUserDataWithItemName;
        let LocalConfigData;
        let LocalConfigDataColumns;
        let LocalObject = {};
        let LocalFromServerSideCheck;

        if (inUserPK > 0) {
            LocalUserData = CommonFilesPullData.AsJsonAsync({ inJsonConfig, inUserPK });
            LocalConfigData = CommonDisplayPullData.AsJsonAsync({ inJsonConfig, inItemConfig, inUserPK });
            LocalConfigDataColumns = LocalConfigData.TableColumns;
            LocalUserDataWithItemName = LocalUserData[inItemConfig.inItemName];

            CommonDefaultValue.CalculateDefaultValue({ inColumns: LocalConfigDataColumns, inData: LocalUserDataWithItemName, inPostData });

            LocalObject = InsertDefaultValueBeforeSaveConsiderInsert({ inDisplayColumns: LocalConfigDataColumns, inPostData });

            LocalObject = CommonSaveFuncs.LocalTransformObjectBeforeSaving({ inDisplayColumns: LocalConfigDataColumns, inObjectToInsert: LocalObject });
            LocalObject = CommonSaveFuncs.InsertUserInfoWithDateStamp({ inObjectToInsert: LocalObject, inUserPK });
            LocalFromServerSideCheck = CommonCheckBeforeSave.ServerSideCheck({ inItemConfig, inUserData: LocalUserData, inConfigData: LocalConfigData, inObjectToInsert: LocalObject, inUserPK });

            if (LocalFromServerSideCheck.KTF) {
                resolve(LocalObject);
            } else {
                reject(LocalFromServerSideCheck);
            };
        };
    });
};

let SaveOnly_Keshav_18May2023 = async ({ inJsonConfig, inOriginalData, inItemName, inPostData, inUserPK }) => {
    let LocalDataToBeInserted = JSON.parse(JSON.stringify(inOriginalData));
    let LocalDataWithKey = LocalDataToBeInserted[inItemName];
    let LocalNewPk = CommonSaveFuncs.GeneratePk({ inDataWithKey: LocalDataWithKey });
    let LocalReturnObject = { KTF: false, kPK: 0 };

    LocalDataWithKey[LocalNewPk] = inPostData;

    if ("pk" in inPostData) {
        inPostData.pk = LocalNewPk;
    };

    let PromiseData = await CommonFilesPushData.AsAsync({ inJsonConfig, inUserPK, inOriginalData, inDataToUpdate: LocalDataToBeInserted });

    if (PromiseData.KTF === true) {
        LocalReturnObject.KTF = true;
        LocalReturnObject.kPK = LocalNewPk;
    };

    return await LocalReturnObject;
};

let SaveOnly = async ({ inJsonConfig, inItemName, inPostData, inUserPK }) => {
    let LocalFolderName = inJsonConfig.inFolderName;
    //    let LocalJsonFileName = path.parse(inJsonConfig.inJsonFileName).name;
    let LocalJsonFileName = inJsonConfig.inJsonFileName.substring(0, inJsonConfig.inJsonFileName.lastIndexOf("."));

    if ("pk" in inPostData) {
        if (inPostData.pk === "" === false) {
            return await CommonInsertWithPk.StartFunc({
                inFolderName: LocalFolderName,
                inFileNameOnly: LocalJsonFileName,
                inItemName, inDataPK: inUserPK,
                inDataToInsert: inPostData
            });
        };

        //        return await SaveOnlyWithPk({ inJsonConfig, inOriginalData, inItemName, inPostData, inUserPK });
    } else {
        return CommonFromFolderFileItemName.StartFuncNoAsync({
            inFolderName: LocalFolderName,
            inFileNameOnly: LocalJsonFileName,
            inItemName, inDataPK: inUserPK,
            inDataToInsert: inPostData
        });

        //return await SaveOnlyWithOutPk({ inJsonConfig, inOriginalData, inItemName, inPostData, inUserPK });
    };
};

let SaveOnlyWithPk = async ({ inJsonConfig, inOriginalData, inItemName, inPostData, inUserPK }) => {
    let LocalDataToBeInserted = JSON.parse(JSON.stringify(inOriginalData));
    let LocalDataWithKey = LocalDataToBeInserted[inItemName];
    let LocalNewPk = inPostData.pk;
    let LocalReturnObject = { KTF: false, kPK: 0 };

    LocalDataWithKey[LocalNewPk] = inPostData;

    let PromiseData = await CommonFilesPushData.AsAsync({ inJsonConfig, inUserPK, inOriginalData, inDataToUpdate: LocalDataToBeInserted });

    if (PromiseData.KTF === true) {
        LocalReturnObject.KTF = true;
        LocalReturnObject.kPK = LocalNewPk;
    };

    return await LocalReturnObject;
};

let SaveOnlyWithOutPk = async ({ inJsonConfig, inOriginalData, inItemName, inPostData, inUserPK }) => {
    let LocalDataToBeInserted = JSON.parse(JSON.stringify(inOriginalData));
    let LocalDataWithKey = LocalDataToBeInserted[inItemName];
    let LocalNewPk = CommonSaveFuncs.GeneratePk({ inDataWithKey: LocalDataWithKey });
    let LocalReturnObject = { KTF: false, kPK: 0 };

    LocalDataWithKey[LocalNewPk] = inPostData;

    if ("pk" in inPostData) {
        inPostData.pk = LocalNewPk;
    };

    let PromiseData = await CommonFilesPushData.AsAsync({ inJsonConfig, inUserPK, inOriginalData, inDataToUpdate: LocalDataToBeInserted });

    if (PromiseData.KTF === true) {
        LocalReturnObject.KTF = true;
        LocalReturnObject.kPK = LocalNewPk;
    };

    return await LocalReturnObject;
};

let InsertDefaultValueBeforeSaveConsiderInsert = ({ inDisplayColumns, inPostData }) => {
    let LocalObject = {};
    let LocalFilteredForPk = inDisplayColumns.filter(element => element.DataAttribute === "pk" === false);

    if ("pk" in inPostData) {
        LocalObject.pk = inPostData.pk;
    };

    LocalFilteredForPk.forEach(loopitem => {
        if (loopitem.Insert) {
            if (loopitem.DefaultValue === "Object") {
                LocalObject[loopitem.DataAttribute] = {};
            } else {
                if (inPostData[loopitem.DataAttribute] === undefined) {
                    LocalObject[loopitem.DataAttribute] = loopitem.DefaultValue;
                } else {
                    LocalObject[loopitem.DataAttribute] = inPostData[loopitem.DataAttribute];
                };
            };
        };
    });

    return LocalObject;
};

let SaveAsync = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData }) => {
    try {
        let LocalUserData;
        let LocalUserDataWithItemName;
        let LocalConfigData;
        let LocalConfigDataColumns;
        let LocalObject = {};
        let LocalFromServerSideCheck;
        let LocalFromSaveOnly;

        if (inUserPK > 0) {
            LocalUserData = CommonFilesPullData.AsJsonAsync({ inJsonConfig, inUserPK });
            LocalConfigData = CommonDisplayPullData.AsJsonAsync({ inJsonConfig, inItemConfig, inUserPK });
            LocalConfigDataColumns = LocalConfigData.TableColumns;
            LocalUserDataWithItemName = LocalUserData[inItemConfig.inItemName];

            CommonDefaultValue.CalculateDefaultValue({ inColumns: LocalConfigDataColumns, inData: LocalUserDataWithItemName, inPostData });

            LocalObject = InsertDefaultValueBeforeSaveConsiderInsert({ inDisplayColumns: LocalConfigDataColumns, inPostData });

            LocalObject = CommonSaveFuncs.LocalTransformObjectBeforeSaving({ inDisplayColumns: LocalConfigDataColumns, inObjectToInsert: LocalObject });
            LocalObject = CommonSaveFuncs.InsertUserInfoWithDateStamp({ inObjectToInsert: LocalObject, inUserPK });

            LocalFromServerSideCheck = CommonCheckBeforeSave.ServerSideCheck({
                inItemConfig, inUserData: LocalUserData,
                inConfigData: LocalConfigData, inObjectToInsert: LocalObject, inUserPK
            });

            if (LocalFromServerSideCheck.KTF) {
                LocalFromSaveOnly = await SaveOnly({ inJsonConfig, inOriginalData: LocalUserData, inItemName: inItemConfig.inItemName, inPostData: LocalObject, inUserPK });
                return await LocalFromSaveOnly;
            } else {
                return await LocalFromServerSideCheck;
            };
        };

    } catch (error) {
        console.log("error : ", error);
    }
};

let SaveWithOutScreenName = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData }) => {
    try {
        let LocalUserData;

        if (inUserPK > 0) {
            LocalUserData = CommonFilesPullData.AsJsonAsync({ inJsonConfig, inUserPK });

            return await SaveOnly({
                inJsonConfig,
                inOriginalData: LocalUserData,
                inItemName: inItemConfig.inItemName, inPostData, inUserPK
            });
        };
    } catch (error) {
        console.log("error : ", error);
    }
};

module.exports = {
    Save,
    PrepareObjectBeforeSave,
    SaveOnly, CheckOnly,
    SaveAsync,
    SaveWithOutScreenName
};
