let CommonPullData = require("../../../../PullData/FromData");

let AsJsonAsyncAsObject = async ({ inJsonConfig, inItemName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    if (LocalDataPK > 0) {
        let LocalReturnData;

        let LocalDataFromJSON = await CommonPullData.AsJsonAsync({
            inJsonConfig, inUserPK: LocalDataPK
        });

        if (inItemName in LocalDataFromJSON) {
            LocalReturnData = LocalDataFromJSON[inItemName];
        };

        return await LocalReturnData;
    };
};

let FromFolderAndFileAsObject = async ({ inFolderName, inFileNameWithExtension, inItemName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnData;

    if (LocalDataPK > 0) {

        let LocalDataFromJSON = await CommonPullData.AsJsonAsyncFromFolderAndFile({
            inFolderName, inFileNameWithExtension,
            inUserPK: LocalDataPK
        });
        
        if ((LocalDataFromJSON === undefined) === false) {
            if (inItemName in LocalDataFromJSON) {
                LocalReturnData = LocalDataFromJSON[inItemName];
            };
        };
    };

    return await LocalReturnData;
};

module.exports = {
    AsJsonAsyncAsObject,
    FromFolderAndFileAsObject
};