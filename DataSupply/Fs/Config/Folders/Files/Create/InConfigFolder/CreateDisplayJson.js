let fs = require("fs");
let CommonFromFolderCheck = require("../../../Check/InConfigFolder/Check");
let CommonFileCheck = require("../../Check/ForDisplayJson")
let path = require("path");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", CreatedLog: {}, AlreadyPresent: false };
    let LocalFromFolder;
    let LocalFromFile;
    
    try {
        LocalFromFolder = await CommonFromFolderCheck.ForExistenceElseCreate({ inFolderName, inUserPK });
        if (LocalFromFolder.KTF) {
            LocalFromFile = await CommonFileCheck.StartFunc({ inFolderName, inFileNameOnly: path.parse(inFileNameWithExtension).name, inUserPK });
            if (LocalFromFile.KTF === false) {
                fs.writeFileSync(LocalFromFile.FilePath, JSON.stringify({}));
                LocalReturnData.DirPath = LocalFromFile.DirPath;
                LocalReturnData.FilePath = LocalFromFile.FilePath
                LocalReturnData.KTF = true;
            };
        } else {
            if (LocalFromFolder.AlreadyPresent) {
                LocalFromFile = await CommonFileCheck.StartFunc({ inFolderName, inFileNameOnly: path.parse(inFileNameWithExtension).name, inUserPK });
                //      console.log("44444444 : ", await LocalFromFile);
                if (LocalFromFile.KTF === false) {
                    fs.writeFileSync(LocalFromFile.FilePath, JSON.stringify({}));
                    LocalReturnData.DirPath = LocalFromFile.DirPath;
                    LocalReturnData.FilePath = LocalFromFile.FilePath
                    LocalReturnData.KTF = true;
                };
            } else {
                LocalReturnData.KReason = "From folder";
            };
        };
    } catch (error) {
        LocalReturnData.KError = error;
    };
    return await LocalReturnData;
};

module.exports = { StartFunc };