const fs = require("fs");

let CommonCreateInData = require("../../Files/CreateInData");

let LocalCheckBeforeInsert = ({ inOriginalData, inDataToUpdate }) => {
    let LocalReturnObject = { KTF: true };
    //debug("inserted length : ", JSON.stringify(inDataToUpdate).length, inOriginalData.length, JSON.stringify(inDataToUpdate).length - inOriginalData.length);

    //debug("inserted length : ", JSON.stringify(inDataToUpdate).length, inOriginalData.length, JSON.stringify(inDataToUpdate).length - inOriginalData.length, Math.abs(JSON.stringify(inDataToUpdate).length - inOriginalData.length));

    return LocalReturnObject;
};

let PushDataAsync = async ({ inJsonConfig, inUserPK, inOriginalData, inDataToUpdate }) => {
    let LocalReturnObject = { KTF: false };
    
    if (inUserPK > 0) {
        let LocalFolderName = inJsonConfig.inFolderName;
        let LocalFileNameWithExtension = inJsonConfig.inJsonFileName;

        LocalDataFromCommonCreate = CommonCreateInData.CreateFileIfNotPresent({ inFolderName: LocalFolderName, inFileNameWithExtension: LocalFileNameWithExtension, inUserPK });
        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.FilePath

            LocalCheckBeforeInsert({ inOriginalData, inDataToUpdate });

            fs.writeFileSync(LocalFilePath, JSON.stringify(inDataToUpdate));
            LocalReturnObject.KTF = true;

            return await LocalReturnObject;
        };
    };
};

module.exports = { PushDataAsync };
