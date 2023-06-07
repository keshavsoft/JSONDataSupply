const fs = require("fs");
let CommonFromCheck = require("./Check");
//let CommonFromUserFileAsFolder = require("./UserFileAsFolder/DisplayJsonFile/PullData/AsTree");
let CommonFromUserFileAsFolder = require("./UserFileAsFolder/AsTree");

let AsArray = async ({ inFolderName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalFolderName = inFolderName;

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inFolderName: LocalFolderName,
        inDataPK: LocalDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        return [];
    };

    let LocalDataPath = LocalFromCommonFromCheck.FolderPath;

    return fs.readdirSync(LocalDataPath).map((file) => {
        return file;
    });
};

let AsObjects = async ({ inFolderName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalFolderName = inFolderName;
    let LocalReturnObject = {};

    let LocalArray = await AsArray({
        inFolderName: LocalFolderName,
        inDataPK: LocalDataPK
    });

    const result = await Promise.all(LocalArray.map(async (file) => {
        let LoopInsideFile = await CommonFromUserFileAsFolder.AsObjects({
            inFolderName: LocalFolderName,
            inFileNameOnly: file,
            inDataPK: LocalDataPK
        });

        if (LoopInsideFile.KTF) {
            return await {
                FileName: file,
                Items: LoopInsideFile.JsonData
            };
            //return await LoopInsideFile.JsonData;
        } else {
            return await undefined;
        };
    }));

    let LocalRemoveUndefined = result.filter(element => element !== undefined);

    LocalRemoveUndefined.forEach(element => {
        LocalReturnObject[element.FileName] = element;
    });

    return await LocalReturnObject;
};

module.exports = { AsObjects };
