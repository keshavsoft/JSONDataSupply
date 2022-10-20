let CommonCheck = require("../../Check");

let fs = require("fs");

let FullJsonData = async ({ inFolderName, inFileNameWithExtension, inDataPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalDataPK = inDataPK;

    if (LocalDataPK > 0) {
        let LocalCommonCheck;
        let LocalDataFromJSON;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalFilePath;

        LocalCommonCheck = CommonCheck.ForFile({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inUserPK: LocalDataPK
        });
        
        if (LocalCommonCheck.KTF) {
            LocalFilePath = LocalCommonCheck.FilePath

            try {
                LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
                LocalReturnData.KResult = JSON.parse(LocalDataFromJSON);
                LocalReturnData.KTF = true;
            } catch (error) {
                LocalReturnData.KReason = error;
            };
        } else {
            LocalReturnData.KReason = LocalCommonCheck.KReason;
        };
    };
    
    return await LocalReturnData;
};

module.exports = {
    FullJsonData
};