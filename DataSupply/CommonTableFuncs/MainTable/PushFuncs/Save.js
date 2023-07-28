// let CommonFilesPullData = require("../../../Fs/Config/Folders/Files/PullData/FromData");
let CommonFilesPushData = require("../../../Fs/Config/Folders/Files/PushData/ToData");
let CommonSaveFuncs = require("../../../SaveFuncs");

let CommonFilesPullData = require("../../../Fs/Config/JSONFolder/DataPkAsFolder/DataFolder/UserFolder/UserJsonFile/PullDataFromFile/FromFolderAndFile");

let SaveOnly = async ({ inJsonConfig, inOriginalData, inItemName, inPostData, inUserPK }) => {
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

let SaveWithOutScreenName = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData }) => {
    let LocalFolderName = inJsonConfig.inFolderName;
    let LocalinJsonFileName = inJsonConfig.inJsonFileName;
    let LocalReturnObject = { KTF: false, kPK: 0 };

    try {
        let LocalUserData;

        if (inUserPK > 0) {
            LocalUserData = CommonFilesPullData.StartFunc({
                inFolderName: LocalFolderName,
                inFileNameOnly: LocalinJsonFileName, inDataPK: inUserPK
            });

            LocalReturnObject = { ...LocalUserData };
            LocalReturnObject.KTF = false;

            if (LocalUserData.KTF === false) {
                return await LocalReturnObject;
            };

            return await SaveOnly({
                inJsonConfig,
                inOriginalData: LocalReturnObject.JsonData,
                inItemName: inItemConfig.inItemName, inPostData, inUserPK
            });
        };
    } catch (error) {
        console.log("error : ", error);
    }
};

module.exports = {
    SaveWithOutScreenName
};
