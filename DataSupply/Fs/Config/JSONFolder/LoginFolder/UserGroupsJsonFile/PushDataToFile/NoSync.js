let fs = require("fs");
let CommonCheckForFile = require("../Check");

let StartFunc = ({ inOriginalData, inDataToUpdate }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromCheck = CommonCheckForFile.ForExistence();

    LocalReturnData = { ...LocalFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCheck.KTF === false) {
        return LocalReturnData;
    };

    LocalReturnData.FilePath = LocalFromCheck.FilePath;

    LocalCheckBeforeInsert({ inOriginalData, inDataToUpdate });

    try {
        fs.writeFileSync(LocalReturnData.UserGroupJsonFilePath, JSON.stringify(inDataToUpdate));
        LocalReturnData.KTF = true;
    } catch (err) {
        console.log("err:", err);
    };

    return LocalReturnData;
};

let LocalCheckBeforeInsert = ({ inOriginalData, inDataToUpdate }) => {
    let LocalReturnObject = { KTF: true };
    //debug("inserted length : ", JSON.stringify(inDataToUpdate).length, inOriginalData.length, JSON.stringify(inDataToUpdate).length - inOriginalData.length);

    //debug("inserted length : ", JSON.stringify(inDataToUpdate).length, JSON.stringify(inOriginalData).length, JSON.stringify(inDataToUpdate).length - inOriginalData.length, Math.abs(JSON.stringify(inDataToUpdate).length - inOriginalData.length));

    return LocalReturnObject;
};

module.exports = { StartFunc };
