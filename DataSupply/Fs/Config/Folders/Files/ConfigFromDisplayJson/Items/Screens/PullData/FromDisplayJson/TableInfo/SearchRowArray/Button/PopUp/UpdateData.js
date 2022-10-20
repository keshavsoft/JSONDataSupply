//let CommonFromPullData = require("../PullData");
let CommonFromPullData = require("../../../../../../../../../PullData/FromConfigFolder/FromDisplayJson/AsJson");
let CommonPushData = require("../../../../../../../../../PushData/ToConfigFolder/ToDisplayJson/AsFoldFile");
let CommonSearchKey;

let _ = require("lodash");

let LocalUpdateFunc = ({ inItemName, inScreenName, inOriginalData, inDataToUpdate }) => {
    let LocalItemName = inItemName;
    let LocalScreenName = inScreenName;
    let LocalUpdatedData = JSON.parse(JSON.stringify(inOriginalData))

    let LocalCommonKey = `${LocalItemName}.${LocalScreenName}.TableInfo.SearchRowArray.Button.PopUp`;
    //let LocalKTFKey = `${LocalItemName}.${LocalScreenName}.TableInfo.SearchRowArray.Button.NewWindow.KTF`;
    //CommonSearchKey = `${LocalItemName}.${LocalScreenName}.TableInfo.SearchRowArray.Button.NewWindow.DisplayObject`;
    CommonSearchKey = `${LocalCommonKey}.DisplayObject`;
    let LocalKTFKey = `${LocalCommonKey}.KTF`;

    let LocalSearchValue = _.get(LocalUpdatedData, CommonSearchKey, 'default');
    let LocalKeysNeeded = ["ColClass", "SvgPlus", "SvgPlusLarge", "NewWindow", "Chat"];

    let LocalToUpdateData = { ..._.pick(LocalSearchValue, LocalKeysNeeded), ..._.pick(inDataToUpdate, LocalKeysNeeded) };
    _.set(LocalUpdatedData, LocalKTFKey, inDataToUpdate.KTF);

    return _.set(LocalUpdatedData, CommonSearchKey, LocalToUpdateData);
};

let FromFoldFileItemScreen = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK, inDataToUpdate }) => {
    let LocalReturnObject = { KTF: false, DirCreate: "", CreatedLog: {} };
    let LocalFolderName = inFolderName;
    let LocalFileNameWithExtension = inFileNameWithExtension;
    let LocalItemName = inItemName;
    let LocalScreenName = inScreenName;
    let LocalDataPK = inDataPK;
    let LocalUpdatedData;

    if ((LocalDataPK > 0) === false) {
        LocalReturnObject.KReason = "inDataPK !== 0";
        return await LocalReturnObject;
    };

    let LocalOriginalData = await CommonFromPullData.FromFoldFile({
        inFolderName: LocalFolderName,
        inFileNameWithExtension: LocalFileNameWithExtension,
        inDataPK: LocalDataPK
    });

    if (LocalOriginalData.KTF === false) {
        LocalReturnObject.KReason = LocalOriginalData.KReason;
    };

    LocalUpdatedData = LocalUpdateFunc({
        inItemName: LocalItemName,
        inScreenName: LocalScreenName,
        inDataPK: LocalDataPK,
        inOriginalData: LocalOriginalData.JsonData,
        inDataToUpdate: inDataToUpdate
    });

    let LocalFromUpdate = await CommonPushData.AsAsync({
        inFolderName: LocalFolderName,
        inJsonFileName: LocalFileNameWithExtension,
        inOriginalData: LocalOriginalData.JsonData,
        inDataToUpdate: LocalUpdatedData,
        inUserPK: LocalDataPK
    });

    if (LocalFromUpdate.KTF === false) {
        return await LocalReturnObject;
    };

    LocalReturnObject.KTF = true;
    LocalReturnObject.UpdateInfo = `${CommonSearchKey} updated successfully...`;

    return await LocalReturnObject;
};

let MockFuncFromFolderFile = async () => {
    return await FromJsonItemConfig({
        inJsonConfig: {
            inFolderName: "Masters",
            inJsonFileName: "Customers.json"
        },
        inItemConfig: {
            inItemName: "CustomerNames",
            inScreenName: "Create"
        },
        inDataPK: 1018
    });
};

//MockFuncFromFolderFile().then(p => { console.log("p:", p) })

module.exports = {
    FromFoldFileItemScreen
};