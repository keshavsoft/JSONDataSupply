let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistenceOfUserFolder = ({ inFolderName, inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    if (inFolderName === "") {
        LocalReturnData.KReason = "FolderName cannot be empty!";
        return LocalReturnData;
    }
    let LocalFromCommonFromCheck = CommonFromCheck.ForExistenceOfDataFolder({ inDataPK: LocalinDataPK });
    // console.log("ttttttttttttt : ", LocalFromCommonFromCheck);
    LocalReturnData = {
        ...LocalFromCommonFromCheck
    }
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };

    LocalReturnData.FolderPath = `${LocalFromCommonFromCheck.DirPath}/${inFolderName}`

    try {
        if (fs.statSync(LocalReturnData.FolderPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "File not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = `FolderName ${inFolderName} not found!`;
        //  LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

let ForExistence = ({ inFolderName, inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({ inDataPK: LocalinDataPK });

    LocalReturnData.DirPath = LocalFromCommonFromCheck.DirPath;

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    LocalReturnData.DataPkAsFolderPresent = true;
    LocalReturnData.FolderPath = `${LocalFromCommonFromCheck.DirPath}/${inFolderName}`

    try {
        if (fs.statSync(LocalReturnData.FolderPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = `Folder ${inFolderName} not found!`;
        }
    } catch (error) {
        LocalReturnData.KReason = `Folder ${inFolderName} not found!`;
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

// console.log("ForExistence : ", ForExistence({
//     inFolderName: "Masters",
//     inDataPK: 16
// }));

module.exports = {
    ForExistence,
    ForExistenceOfUserFolder
};
