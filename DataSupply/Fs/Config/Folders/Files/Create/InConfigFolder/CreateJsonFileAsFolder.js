let fs = require("fs");
let CommonFromFolderCheck = require("../../../Check/InConfigFolder/Check");
let CommonFromCheckJsonFileAsFolder = require("../../Check/JsonFileAsFolder");
let path = require("path");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", CreatedLog: {}, AlreadyPresent: false };
    let LocalFromFolder;
    let LocalFromCheckJsonFileAsFolder;

    try {
        LocalFromFolder = await CommonFromFolderCheck.ForExistenceElseCreate({ inFolderName, inUserPK });

        if (LocalFromFolder.KTF || LocalFromFolder.AlreadyPresent) {
            LocalFromCheckJsonFileAsFolder = await CommonFromCheckJsonFileAsFolder.StartFunc({
                inFolderName,
                inFileNameOnly: path.parse(inFileNameWithExtension).name, inUserPK
            });

            LocalReturnData.DirPath = LocalFromCheckJsonFileAsFolder.DirPath;
            LocalReturnData.FolderPath = LocalFromCheckJsonFileAsFolder.FolderPath;
            LocalReturnData.FilePath = LocalFromCheckJsonFileAsFolder.FilePath;
            LocalReturnData.ReturnDataPath = LocalFromCheckJsonFileAsFolder.ReturnDataPath;

            if (LocalFromCheckJsonFileAsFolder.KTF === false) {
                fs.mkdirSync(LocalFromCheckJsonFileAsFolder.FolderPath, {
                    recursive: true
                });

                LocalReturnData.KTF = true;
            } else {
                LocalReturnData.AlreadyPresent = true;
            }
        };
    } catch (error) {
        LocalReturnData.KError = error;
    };
    return await LocalReturnData;
};

module.exports = { StartFunc };