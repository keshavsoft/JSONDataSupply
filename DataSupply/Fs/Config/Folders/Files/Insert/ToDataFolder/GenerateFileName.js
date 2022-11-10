const fs = require('fs-extra');
let CommonCheck = require("../../Check");
let CommonListFiles = require("../../PullData/ListFiles");
//let CommonFromCreate = require("../../Create/InDataFolder/CreateJsonFile");

let StartFunc = async ({ inFolderName, inData, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", DataFolder: true };

    let LocalFromListFiles = CommonListFiles.ReturnAsArrayOfFileNameOnly({
        inDataPk: inUserPK,
        inFolderName
    });

    let LocalArrayAsNumbers = LocalFromListFiles.map((i) => Number(i));
    const max = Math.max(...LocalArrayAsNumbers);

    let LocalFromCheck = CommonCheck.ForFile({
        inFolderName,
        inFileNameWithExtension: `${max + 1}.json`,
        inUserPK
    });

    if (LocalFromCheck.KTF === false) {
        fs.writeFileSync(LocalFromCheck.FilePath, JSON.stringify(inData));
        LocalReturnData.DirCreate = LocalFromCheck.DirPath;
        LocalReturnData.FilePath = LocalFromCheck.FilePath;

        LocalReturnData.KTF = true;
    } else {
        LocalReturnData.FilePresent = true;
    }

    return await LocalReturnData;
};

module.exports = {
    StartFunc
};
