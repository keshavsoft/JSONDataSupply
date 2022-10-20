let CommonCheck = require("../Check");
let path = require("path");

let fs = require("fs");

let AsAsync = async ({ inJsonConfig, inUserPK, inOriginalData, inDataToUpdate }) => {
    let LocalReturnData = { KTF: false };
    
    if (inUserPK > 0) {
        let LocalFolderName = inJsonConfig.inFolderName;
        let LocalJsonFileName = inJsonConfig.inJsonFileName;
        //let LocalJsonFileNameOnly = LocalJsonFileName.split(".")[0];

        let LocalFilePath;

        let LocalDataFromCommonCreate = CommonCheck.InConfig({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(LocalJsonFileName).name,
            inUserPK
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

module.exports = { AsAsync };