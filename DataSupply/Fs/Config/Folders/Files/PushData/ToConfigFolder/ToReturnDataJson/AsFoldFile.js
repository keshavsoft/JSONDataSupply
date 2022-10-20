let CommonCheck = require("../../../Check/InReturnDataJson");
let path = require("path");

let fs = require("fs");

let AsAsync = async ({ inFolderName, inJsonFileName, inDataPK, inOriginalData, inDataToUpdate }) => {
    let LocalReturnData = { KTF: false };

    if (inDataPK > 0) {
        let LocalFolderName = inFolderName;
        let LocalJsonFileName = inJsonFileName;
        let LocalReturnDataPath;

        let LocalDataFromCommonCreate = await CommonCheck.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(LocalJsonFileName).name,
            inUserPK: inDataPK
        });
        
        if (LocalDataFromCommonCreate.KTF) {
            LocalReturnDataPath = LocalDataFromCommonCreate.ReturnDataPath

            LocalCheckBeforeInsert({ inOriginalData, inDataToUpdate });

            try {
                fs.writeFileSync(LocalReturnDataPath, JSON.stringify(inDataToUpdate));
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