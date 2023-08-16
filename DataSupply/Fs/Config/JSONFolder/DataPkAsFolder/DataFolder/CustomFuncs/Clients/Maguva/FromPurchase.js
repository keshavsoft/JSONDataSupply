let PurchasesKeysJson = require("./PurchasesKeys.json");
let CommonDataFolder = require("../../../../DataFolder/UserFolder/UserJsonFile/PullDataFromFile/FromFolderAndFile");

let StartFunc = ({ inDataPk }) => {

    let localDatapk = inDataPk;

    let LocalPurchasesData = CommonDataFolder.StartFunc({
        inFolderName: PurchasesKeysJson.inFolderName,
        inFileNameOnly: PurchasesKeysJson.inFileNameOnly,
        inDataPK: localDatapk
    });
    return LocalPurchasesData;
};

module.exports = { StartFunc };
