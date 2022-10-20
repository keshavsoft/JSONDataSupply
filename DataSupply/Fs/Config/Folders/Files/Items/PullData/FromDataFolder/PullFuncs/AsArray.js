let CommonPullData = require("../../../../PullData/FromData");
//let CommonPullDataFromFolderAndFile = require("../../../../PullData/FromDataFolder/FromFolderAndFile");
let CommonPullDataWithConfig = require("../../../../PullData/FromDataFolder/WithConfig");

let FromFolderFile = async ({ inFolderName, inFileNameWithExtension, inDataPK }) => {
    let LocalDataPK = inDataPK;

    if (LocalDataPK > 0) {
        let LocalReturnData;

        let LocalDataFromJSON = await CommonPullData.AsJsonAsyncFromFolderAndFile({
            inFolderName, inFileNameWithExtension,
            inUserPK: LocalDataPK
        });

        LocalReturnData = Object.keys(LocalDataFromJSON);

        return await LocalReturnData;
    };
};

let FromJsonConfig = async ({ inJsonConfig, inItemName, inDataPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalDataPK = inDataPK;

    if (LocalDataPK > 0) {
        let LocalDataFromJSON = await CommonPullDataWithConfig.FullJsonData({
            inJsonConfig,
            inDataPK: LocalDataPK
        });
        
        if (LocalDataFromJSON.KTF === false) {
            LocalReturnData.KReason = LocalDataFromJSON.KReason;
            return await LocalReturnData;
        };

        if ((inItemName in LocalDataFromJSON.KResult) === false) {
            LocalReturnData.KReason = `${inItemName} : ItemName not found in data`;
            return await LocalReturnData;
        };

        LocalReturnData.ReturnArray = Object.values(LocalDataFromJSON.KResult[inItemName]);
        LocalReturnData.KTF = true;

        return await LocalReturnData;
    };
};

let MockFuncFromFolderFile = async () => {
    return await FromFolderFile({
        inFolderName: "Masters",
        inFileNameWithExtension: "Customers.json",
        inDataPK: 1018
    });
};

//MockFuncFromFolderFile().then(p => { console.log(p);})

module.exports = {
    FromFolderFile,
    FromJsonConfig
};