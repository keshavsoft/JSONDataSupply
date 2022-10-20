let CommonPullData = require("../../../../PullData/FromDataFolder/FromFolderAndFile");

let FromFolderAndFileAsObject = async ({ inFolderName, inFileNameWithExtension, inItemName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnData = { KTF: false, KResult: [], JsonData: {} };

    if (LocalDataPK > 0) {

        let LocalDataFromJSON = await CommonPullData.FullJsonData({
            inFolderName, inFileNameWithExtension,
            inDataPK: LocalDataPK
        });

        if (LocalDataFromJSON.KTF === false) {
            LocalReturnData.KReason = LocalDataFromJSON.KReason;

            return await LocalReturnData;
        };

        if ((inItemName in LocalDataFromJSON.KResult) === false) {
            LocalReturnData.KReason = `${inItemName} : Item Name not found in data!`;

            return await LocalReturnData;
        };

        Object.entries(LocalDataFromJSON.KResult[inItemName]).forEach(
            ([key, value]) => {
                LocalReturnData.JsonData[key] = {
                    ...value,
                    pk: key
                };
            }
        );

        LocalReturnData.KTF = true;
    };
    
    return await LocalReturnData;
};

module.exports = {
    FromFolderAndFileAsObject
};