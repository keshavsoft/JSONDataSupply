let CommonCheck = require("../../Check");

let fs = require("fs");

let AsAsync = async ({ inJsonConfig, inDataPK, inOriginalData, inDataToUpdate }) => {
    let LocalReturnData = { KTF: false };
    let LocalDataPK = inDataPK;

    if (LocalDataPK > 0) {
        let LocalFolderName = inJsonConfig.inFolderName;
        let LocalFileNameWithExtension = inJsonConfig.inJsonFileName;

        let LocalFilePath;

        LocalDataFromCommonCreate = CommonCheck.ForFile({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension, inUserPK: LocalDataPK
        });

        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.FilePath

            LocalCheckBeforeInsert({ inOriginalData, inDataToUpdate });

            try {
                fs.writeFileSync(LocalFilePath, JSON.stringify(inDataToUpdate));
                LocalReturnData.KTF = true;
            } catch (err) {
            };
        };
    };

    return await LocalReturnData;
};

let LocalCheckBeforeInsert = ({ inOriginalData, inDataToUpdate }) => {
    let LocalReturnObject = { KTF: true };
    //debug("inserted length : ", JSON.stringify(inDataToUpdate).length, inOriginalData.length, JSON.stringify(inDataToUpdate).length - inOriginalData.length);

    //debug("inserted length : ", JSON.stringify(inDataToUpdate).length, JSON.stringify(inOriginalData).length, JSON.stringify(inDataToUpdate).length - inOriginalData.length, Math.abs(JSON.stringify(inDataToUpdate).length - inOriginalData.length));

    return LocalReturnObject;
};

module.exports = {
    AsAsync
};