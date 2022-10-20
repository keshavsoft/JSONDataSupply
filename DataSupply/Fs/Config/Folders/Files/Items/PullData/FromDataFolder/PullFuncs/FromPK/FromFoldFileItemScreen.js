let CommonPullData = require("../../../../../PullData/FromDataFolder/FromFolderAndFile");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inDataPK, inRowPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = { KTF: false, KReason: "" };

    if (LocalDataPK > 0) {
        let LocalDataFromJSON = await CommonPullData.FullJsonData({
            inFolderName, inFileNameWithExtension,
            inDataPK: LocalDataPK
        });

        if (LocalDataFromJSON.KTF === false) {
            LocalReturnObject.KReason = LocalDataFromJSON.KReason;

            return await LocalReturnObject;
        };
        
        if (inItemName in LocalDataFromJSON.KResult) {
            if (inRowPK in LocalDataFromJSON.KResult[inItemName]) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.JsonData = LocalDataFromJSON.KResult[inItemName][inRowPK];
            } else {
                LocalReturnObject.KReason = `RowPK not found : ${inRowPK}`;
            };
        } else {
            LocalReturnObject.KReason = `Item Name not found : ${inItemName}`;
        };
    };

    return await LocalReturnObject;
};

module.exports = {
    StartFunc
};