let CommonCheckBeforeSave = require("../Vertical/CheckBeforeSave");
let CommonDefaultValue = require("../ToUi/CalculateDefaultValue");

let CommonDisplayPullData = require("../Fs/Config/Folders/Files/ConfigFromDisplayJson/Screens/Items/PullData/FromDisplayJson/FromJson");
let CommonFilesPullData = require("../Fs/Config/Folders/Files/PullData/FromData");
let CommonFilesPushData = require("../Fs/Config/Folders/Files/PushData/ToData");
let CommonSaveFuncs = require("../SaveFuncs");

let LocalUpdateRow = ({ inOriginalData, inPostData }) => {
    Object.entries(inPostData).forEach(
        ([key, value]) => {
            inOriginalData[key] = value;
        }
    );
};

let WithTransformBeforeSave = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData, inRowPK }) => {
    let LocalReturnObject = { KTF: false, kPK: 0 };
    let LocalUserData;
    let LocalUserDataWithItemName;
    let LocalConfigData;
    let LocalConfigDataColumns;
    let LocalObject = {};
    let LocalFromServerSideCheck;
    let LocalUpdatedData;

    if (inUserPK > 0) {
        LocalUserData = await CommonFilesPullData.AsJsonAsync({ inJsonConfig, inUserPK });
        LocalConfigData = await CommonDisplayPullData.AsReturnObject({ inJsonConfig, inItemConfig, inDataPK: inUserPK });

        if (LocalConfigData.KTF) {
            LocalConfigDataColumns = LocalConfigData.JsonData.TableColumns;

            LocalUpdatedData = JSON.parse(JSON.stringify(LocalUserData));
            LocalUserDataWithItemName = LocalUpdatedData[inItemConfig.inItemName];

            CommonDefaultValue.CalculateDefaultValue({
                inColumns: LocalConfigDataColumns,
                inData: LocalUserDataWithItemName, inPostData
            });

            LocalObject = InsertDefaultValueBeforeSaveConsiderInsert({
                inDisplayColumns: LocalConfigDataColumns,
                inPostData
            });

            LocalObject = CommonSaveFuncs.LocalTransformObjectBeforeSaving({ inDisplayColumns: LocalConfigDataColumns, inObjectToInsert: LocalObject });
            LocalObject = CommonSaveFuncs.InsertUserInfoWithDateStamp({ inObjectToInsert: LocalObject, inUserPK });

            LocalFromServerSideCheck = CommonCheckBeforeSave.ServerSideCheck({
                inItemConfig,
                inUserData: LocalUpdatedData,
                inConfigData: LocalConfigData.JsonData,
                inObjectToInsert: LocalObject, inUserPK
            });

            LocalUpdateRow({
                inOriginalData: LocalUserDataWithItemName[inRowPK],
                inPostData: LocalObject
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
    };

    return await LocalReturnObject;
};

let InsertDefaultValueBeforeSaveConsiderInsert = ({ inDisplayColumns, inPostData }) => {
    let LocalObject = {};

    inDisplayColumns.forEach(loopitem => {
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

let MockFuncWithTransformBeforeSave = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData, inRowPK }) => {
    return await WithTransformBeforeSave({ inJsonConfig, inItemConfig, inUserPK, inPostData, inRowPK });
};

// MockFuncWithTransformBeforeSave({
//     inJsonConfig: {
//         inFolderName: "Masters",
//         inJsonFileName: "Customers.json"
//     },
//     inItemConfig: {
//         inItemName: "CustomerNames",
//         inScreenName: "Create"
//     },
//     inUserPK: 1018,
//     inPostData: {
//         CustomerName: "Chakri",
//         City:"Kkd"
//     },
//     inRowPK: 2
// }).then(p => { console.log(p); });

module.exports = {
    WithTransformBeforeSave
};
