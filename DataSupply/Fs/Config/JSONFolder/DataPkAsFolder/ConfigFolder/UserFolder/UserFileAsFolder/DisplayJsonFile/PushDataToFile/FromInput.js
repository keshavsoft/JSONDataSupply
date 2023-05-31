let CommonCheck = require("../Check");
let path = require("path");
let fs = require("fs");

let LocalCheckBeforeInsert = ({ inOriginalData, inDataToUpdate }) => {
    let LocalReturnObject = { KTF: true };
    console.log("ssssssssss : ", JSON.stringify(inDataToUpdate).length, JSON.stringify(inOriginalData).length);

    return LocalReturnObject;
};

let StartFuncNoSync = ({ inFolderName, inFileNameWithExtension, inOriginalData, inDataToUpdate, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalFilePath;

        LocalDataFromCommonCreate = CommonCheck.ForExistence({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(LocalFileNameWithExtension).name,
            inDataPK: LocalDataPK
        });

        let LocalReturnData = { ...LocalDataFromCommonCreate };
        LocalReturnData.KTF = false;

        if (LocalDataFromCommonCreate.KTF === false) {
            return LocalReturnObject;
        };

        LocalCheckBeforeInsert({ inOriginalData, inDataToUpdate });

        try {
            fs.writeFileSync(LocalDataFromCommonCreate.DisplayJsonPath, JSON.stringify(inDataToUpdate));
        } catch (error) {
            console.log("ssssss : ", error);
        };

        LocalReturnObject.KTF = true;
    };

    return LocalReturnObject;
};

//     console.log("pppp : ", p);
// });

module.exports = {
    StartFuncNoSync
};