let CommonPullDataFromItem = require("../../../../DataFolder/UserFolder/UserJsonFile/ItemName/PullData/FromFolderFileItemName");
let QrCodeKeysJson = require("./QrCodeKeys.json");

let StartFunc = ({ inDataPk }) => {
    let localDatapk = inDataPk;

    let LocalToFolderName = QrCodeKeysJson.inFolderName;
    let LocalToFileName = QrCodeKeysJson.inFileNameOnly;
    let LocalToItemName = QrCodeKeysJson.inItemName;

    let LocalQrCodeData = CommonPullDataFromItem.StartFunc({
        inFolderName: LocalToFolderName,
        inFileNameOnly: LocalToFileName,
        inItemName: LocalToItemName,
        inDataPK: localDatapk
    });

   return LocalQrCodeData;
};

module.exports = { StartFunc };
