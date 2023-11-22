const fs = require('fs-extra');
let CommonCheck = require("../Check");

let LocalCheckBeforeInsert = ({ inOriginalData, inDataToUpdate }) => {
    let LocalReturnObject = { KTF: true };

    return LocalReturnObject;
};

let InsertToJson = async ({ inFolderName, inFileNameOnly, inOriginalData, inDataToUpdate, inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirCreate: "", DataFolder: true };

    let LocalFromCheck = CommonCheck.ForExistence({
        inFolderName,
        inFileNameOnly,
        inDataPK: LocalinDataPK
    });

    LocalReturnData.FolderPath = LocalFromCheck.FolderPath;
    LocalReturnData.UserJsonFilePath = LocalFromCheck.UserJsonFilePath;

    if (LocalFromCheck.KTF) {
        try {
            fs.writeFileSync(LocalFromCheck.UserJsonFilePath, JSON.stringify(inDataToUpdate));

            LocalReturnData.KTF = true;
        } catch (error) {
            console.log("error : ", error);
        };
    } else {
        LocalReturnData.FilePresent = true;
    }

    return await LocalReturnData;
};

let InsertToJsonNoAsync = ({ inFolderName, inFileNameOnly, inOriginalData, inDataToUpdate, inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirCreate: "", DataFolder: true };

    let LocalFromCheck = CommonCheck.ForExistence({
        inFolderName,
        inFileNameOnly,
        inDataPK: LocalinDataPK
    });

    LocalReturnData.FolderPath = LocalFromCheck.FolderPath;
    LocalReturnData.UserJsonFilePath = LocalFromCheck.UserJsonFilePath;
    
    if (LocalFromCheck.KTF) {
        try {
            fs.writeFileSync(LocalFromCheck.UserJsonFilePath, JSON.stringify(inDataToUpdate));

            LocalReturnData.KTF = true;
        } catch (error) {
            console.log("error : ", error);
        };
    } else {
        LocalReturnData.FilePresent = true;
    }

    return LocalReturnData;
};

module.exports = {
    InsertToJson,
    InsertToJsonNoAsync
};
