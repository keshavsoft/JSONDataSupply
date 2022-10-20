let path = require("path");
let CommonAbsolutePath = require("../DataPath");

let fs = require("fs");

let LocalCheckBeforeInsert = ({ inOriginalData, inDataToUpdate }) => {
    let LocalReturnObject = { KTF: true };
    //debug("inserted length : ", JSON.stringify(inDataToUpdate).length, inOriginalData.length, JSON.stringify(inDataToUpdate).length - inOriginalData.length);

    //debug("inserted length : ", JSON.stringify(inDataToUpdate).length, inOriginalData.length, JSON.stringify(inDataToUpdate).length - inOriginalData.length, Math.abs(JSON.stringify(inDataToUpdate).length - inOriginalData.length));

    return LocalReturnObject;
};

let PushDataAsync = async ({ inUserPK, inOriginalData, inDataToUpdate }) => {
    if (inUserPK > 0) {
        let LocalReturnObject = { KTF: false };

        let LocalFolderName = "Reports";
        let LocalFileName = "LedgerAuto.json";

        let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp();
        let LocalFilePath = path.resolve(__dirname, `${LocalDataPath}/${inUserPK}/${LocalFolderName}/${LocalFileName}`);

        LocalCheckBeforeInsert({ inOriginalData, inDataToUpdate });

        fs.writeFileSync(LocalFilePath, JSON.stringify(inDataToUpdate));
        LocalReturnObject.KTF = true;
        return await LocalReturnObject;
    };
};

module.exports = { PushDataAsync };