let PurchasesKeysJson = require("./PurchasesKeys.json");
let CommonDataFolder = require("../../../../DataFolder/UserFolder/UserJsonFile/PullDataFromFile/FromFolderAndFile");

let StartFunc = ({ inDataPk, inFileNameOnly }) => {
    let localDatapk = inDataPk;
    let LocalFileNameOnly = inFileNameOnly;

    let LocalPurchasesData = CommonDataFolder.StartFunc({
        inFolderName: PurchasesKeysJson.inFolderName,
        inFileNameOnly: LocalFileNameOnly,
        inDataPK: localDatapk
    });

    return LocalPurchasesData;
};

module.exports = { StartFunc };
