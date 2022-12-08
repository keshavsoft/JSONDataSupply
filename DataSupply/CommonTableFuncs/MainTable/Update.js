let CommonPullData = require("../../Fs/Data/Items/PullData");
let CommonPushData = require("../../Fs/Data/Items/PushData");
let CommonSaveFuncs = require("../../SaveFuncs");
let CommonDisplayPullData = require("../../Fs/DefultFileNames/Display/PullData");
let CommonFromData = require("../../Fs/Config/Folders/Files/PullData/FromData");

let CommonFilesPullData = require("../../Fs/Config/Folders/Files/PullData/FromData");
let CommonFilesPushData = require("../../Fs/Config/Folders/Files/PushData/ToData");

//let CommonReturnDataFuncs = require("../../../CommonData/ReturnDataFuncs");
//require("../../")

let WithOutScreen = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData, inRowPK }) => {
    let LocalReturnObject = { KTF: false, kPK: 0 };
    let LocalUserData;
    let LocalUserDataWithItemName;
    let LocalUpdatedData;

    if (inUserPK > 0) {
        LocalUserData = await CommonFilesPullData.AsJsonAsync({ inJsonConfig, inUserPK });

        LocalUpdatedData = JSON.parse(JSON.stringify(LocalUserData));
        LocalUserDataWithItemName = LocalUpdatedData[inItemConfig.inItemName];

        LocalUpdateRow({
            inOriginalData: LocalUserDataWithItemName[inRowPK],
            inPostData
        });

        let PromiseData = await CommonFilesPushData.AsAsync({
            inJsonConfig,
            inUserPK, inOriginalData: LocalUserData,
            inDataToUpdate: LocalUpdatedData
        });

        if (PromiseData.KTF === true) {
            LocalReturnObject.KTF = true;
        };
    };

    return await LocalReturnObject;
};

let OnlyKeys = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData, inPK }) => {
    let LocalUserData;
    let LocalUserDataWithItemName;
    let LocalUpdateData;
    console.log("inUserPK-- : ", inUserPK, inJsonConfig);

    if (inUserPK > 0) {
        try {
            LocalUserData = await CommonFromData.AsJsonAsync({ inJsonConfig, inUserPK });
            //LocalUserData = CommonPullData.ReturnDataFromJson({ inJsonConfig, inUserPK });

            console.log("LocalUserData-- : ", LocalUserData);

            LocalUpdateData = JSON.parse(JSON.stringify(LocalUserData));
            LocalUserDataWithItemName = LocalUpdateData[inItemConfig.inItemName];
            //LocalUserDataWithItemName[inPK] = inPostData;
            console.log("start : ", LocalUserDataWithItemName[inPK]);
            LocalUpdateRow({ inOriginalData: LocalUserDataWithItemName[inPK], inPostData });
            console.log("end : ", LocalUserDataWithItemName[inPK]);

            return await CommonPushData.PushDataAsync({
                inJsonConfig, inUserPK, inOriginalData: LocalUserData,
                inDataToUpdate: LocalUpdateData
            });

        } catch (error) {
            console.log("error : ", error);
            reject(error);
        };
    };
};

let LocalUpdateRow = ({ inOriginalData, inPostData }) => {
    Object.entries(inPostData).forEach(
        ([key, value]) => {
            inOriginalData[key] = value;
        }
    );
};

let WithTransformBeforeSave = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData, inPK }) => {
    try {
        let LocalUserData;
        let LocalUserDataWithItemName;
        let LocalUpdateData;
        let LocalFromSaveFuncs;
        let LocalConfigData;
        let LocalConfigDataColumns;
        let LocalFromUpdate;
        let LocalReturnObject = { KTF: false };

        if (inUserPK > 0) {
            LocalUserData = CommonPullData.ReturnDataFromJson({ inJsonConfig, inUserPK });
            LocalConfigData = CommonDisplayPullData.ReturnDataFromJsonAndItemName({ inJsonConfig, inItemConfig, inUserPK });
            LocalConfigDataColumns = LocalConfigData.TableColumns;

            LocalUpdateData = JSON.parse(JSON.stringify(LocalUserData));
            LocalUserDataWithItemName = LocalUpdateData[inItemConfig.inItemName];
            //LocalUserDataWithItemName[inPK] = inPostData;

            LocalFromSaveFuncs = CommonSaveFuncs.LocalTransformObjectBeforeSaving({
                inDisplayColumns: LocalConfigDataColumns,
                inObjectToInsert: inPostData
            });
            //console.log("LocalFromSaveFuncs : ", LocalFromSaveFuncs);
            LocalUpdateRow({
                inOriginalData: LocalUserDataWithItemName[inPK],
                inPostData: LocalFromSaveFuncs
            });

            // return await CommonPushData.PushDataAsync({
            //     inJsonConfig, inUserPK, inOriginalData: LocalUserData,
            //     inDataToUpdate: LocalUpdateData
            // });

            LocalFromUpdate = await CommonPushData.PushDataAsync({
                inJsonConfig, inUserPK, inOriginalData: LocalUserData,
                inDataToUpdate: LocalUpdateData
            });
            //console.log(" LocalFromUpdate : ", LocalFromUpdate);

            if (LocalFromUpdate.KTF) {
                LocalReturnObject.KTF = true;
            };
        };

        return await LocalFromUpdate;
    } catch (error) {
        console.log("WithTransformBeforeSave-error : ", error);
    };

};

let LocalMockFuncForOnlyKeys = async () => {
    await WithOutScreen({
        inJsonConfig: {
            inFolderName: "Loans",
            inJsonFileName: "6.json"
        }, inItemConfig: {
            inItemName: "PageInfo"

        }, inUserPK: 2051,
        inPostData: "aaaaaaaaaaa",
        inPK: "BranchId"
    });
};

LocalMockFuncForOnlyKeys().then();

module.exports = { OnlyKeys, WithTransformBeforeSave };
