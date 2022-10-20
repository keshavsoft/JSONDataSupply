let CommonLocalStorage = require("../LocalStorage/PullData");
let CommonDataSupplyPreLoadJson = require("./PullData");

let CommonPullData = require("../Config/Folders/Files/Items/PullData/FromDataFolder/PullFuncs/AccordingToConfig");

let LocalLoopfunc = async ({ inPreLoadData, inUserPK }) => {
    let LocalObject = {};
    let LocalReturnArray = [];
    for (const property in inPreLoadData) {
        LocalObject = {};

        if ("DataListInfo" in inPreLoadData[property]) {
            LocalObject.DatalistID = inPreLoadData[property].DataListInfo.DatalistID;
        };

        if ("JsonConfig" in inPreLoadData[property]) {
            // LocalObject.Data = await LocalLoopInsideFunc({
            //     inLoopItem: inPreLoadData[property],
            //     inUserPK
            // });

            LocalObject.Data = await CommonPullData.StartFunc({
                inFolderName: inPreLoadData[property].JsonConfig.inFolderName,
                inFileNameWithExtension: inPreLoadData[property].JsonConfig.inJsonFileName,
                inItemName: inPreLoadData[property].ItemConfig.ItemName,
                inDataPK: inUserPK,
                inColumns: inPreLoadData[property].Columns
            });

        };

        LocalReturnArray.push(LocalObject);
    };
    return await LocalReturnArray;
};

let Masters = async ({ inDataPk }) => {
    let LocalReturnData = { KTF: false, KMessage: "", DataFromServer: [], KReason: "" };
    let LocalDataArray = [];
    let LocalUserPK = inDataPk;
    let LocalLocalStorageData;

    if (LocalUserPK > 0) {
        let LocalDataFromJSONPreloadData = CommonDataSupplyPreLoadJson.FromJsonFile({ inUserPK: LocalUserPK });

        if (LocalDataFromJSONPreloadData.KTF) {
            LocalReturnData.KTF = true;

            if (Object.keys(LocalDataFromJSONPreloadData.KData).length > 0) {
                LocalDataArray = await LocalLoopfunc({
                    inPreLoadData: LocalDataFromJSONPreloadData.KData,
                    inUserPK: LocalUserPK
                });
            };
            LocalLocalStorageData = await CommonLocalStorage.ReturnWithData({ inUserPK: LocalUserPK });

            LocalReturnData.DataFromServer = [...LocalDataArray, ...LocalLocalStorageData];
        };
    };
    return LocalReturnData;
};

module.exports = { Masters };
