let CommonCheckBeforeSave = require("../../Vertical/CheckBeforeSave");
let CommonDefaultValue = require("../../ToUi/CalculateDefaultValue");

let CommonDisplayPullData = require("../../Fs/Config/Folders/Files/ConfigFromDisplayJson/Screens/Items/PullData/FromDisplayJson/FromJson");
let CommonFilesPullData = require("../../Fs/Config/Folders/Files/PullData/FromData");
let CommonFilesPushData = require("../../Fs/Config/Folders/Files/PushData/ToData");
let CommonSaveFuncs = require("../../SaveFuncs");

let LocalUpdateRow = ({ inOriginalData, inPostData }) => {
    Object.entries(inPostData).forEach(
        ([key, value]) => {
            inOriginalData[key] = value;
        }
    );
};

let WithTransformBeforeSave = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData, inRowPK, inSubTableKey, inSubTableRowPK }) => {
    let LocalReturnObject = { KTF: false, kPK: 0 };
    let LocalUserData;
    let LocalUserDataWithItemName;
    let LocalConfigData;
    let LocalConfigDataColumns;
    let LocalFromServerSideCheck;
    let LocalUpdatedData;
    let LocalSubTableColumnsKey = "SubTableColumns";
    console.log("inUserPK -------------: ", inUserPK);
    if ((inUserPK > 0) === false) {
        LocalReturnObject.KReason = `${inUserPK} not found in Data as folder!`;
        return await LocalReturnObject;
    };

    LocalUserData = await CommonFilesPullData.AsJsonAsync({ inJsonConfig, inUserPK });
    LocalConfigData = await CommonDisplayPullData.AsReturnObject({ inJsonConfig, inItemConfig, inDataPK: inUserPK });

    if (LocalConfigData.KTF) {
        if ((LocalSubTableColumnsKey in LocalConfigData.JsonData) === false) {
            LocalReturnObject.KReason = `SubTableColumns not found in Config`;
            return await LocalReturnObject;
        };

        if ((inSubTableKey in LocalConfigData.JsonData[LocalSubTableColumnsKey]) === false) {
            LocalReturnObject.KReason = `inSubTableKey : ${inSubTableKey} in not found in Config`;
            return await LocalReturnObject;
        };

        LocalConfigDataColumns = LocalConfigData.JsonData[LocalSubTableColumnsKey][inSubTableKey].TableColumns;

        LocalUpdatedData = JSON.parse(JSON.stringify(LocalUserData));
        LocalUserDataWithItemName = LocalUpdatedData[inItemConfig.inItemName];

        CommonDefaultValue.CalculateDefaultValue({
            inColumns: LocalConfigDataColumns,
            inData: LocalUserDataWithItemName, inPostData
        });

        inPostData = CommonSaveFuncs.LocalTransformObjectBeforeSaving({
            inDisplayColumns: LocalConfigDataColumns,
            inObjectToInsert: inPostData
        });

        LocalFromServerSideCheck = CommonCheckBeforeSave.ServerSideCheck({
            inItemConfig,
            inUserData: LocalUpdatedData,
            inConfigData: LocalConfigData.JsonData,
            inObjectToInsert: inPostData, inUserPK
        });

        if ((inSubTableKey in LocalUserDataWithItemName[inRowPK]) === false) {
            LocalReturnObject.KReason = `inSubTableKey : ${inSubTableKey} in not found in PK : ${inRowPK}`;
            return await LocalReturnObject;
        };

        if ((inSubTableRowPK in LocalUserDataWithItemName[inRowPK][inSubTableKey]) === false) {
            LocalReturnObject.KReason = `inSubTableRowPK : ${inSubTableRowPK} in not found in PK : ${inSubTableKey}`;
            return await LocalReturnObject;
        }
        console.log("start : ", inPostData, LocalUserDataWithItemName[inRowPK][inSubTableKey][inSubTableRowPK]);
        LocalUpdateRow({
            inOriginalData: LocalUserDataWithItemName[inRowPK][inSubTableKey][inSubTableRowPK],
            inPostData: inPostData
        });
        console.log("end : ", LocalUserDataWithItemName[inRowPK][inSubTableKey][inSubTableRowPK]);
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

let MockFuncWithTransformBeforeSave = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData, inRowPK, inSubTableKey, inSubTableRowPK }) => {
    return await WithTransformBeforeSave({ inJsonConfig, inItemConfig, inUserPK, inPostData, inRowPK, inSubTableKey, inSubTableRowPK });
};

// MockFuncWithTransformBeforeSave({
//     inJsonConfig: {
//         inFolderName: "Transactions",
//         inJsonFileName: "GST-SALES.json"
//     },
//     inItemConfig: {
//         inItemName: "GST-SALE",
//         inScreenName: "Alter"
//     },
//     inUserPK: 1024,
//     inPostData: {
//         ProductCode: 16,
//     },
//     inRowPK: 42786,
//     inSubTableKey: "InvGrid",
//     inSubTableRowPK: 40977
// }).then(p => { console.log(p); });

module.exports = {
    WithTransformBeforeSave
};
