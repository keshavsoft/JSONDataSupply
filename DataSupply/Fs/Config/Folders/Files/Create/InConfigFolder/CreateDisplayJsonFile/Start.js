let CommonFromCreate = require("../CreateJsonFileAsFolder");
let fs = require("fs");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", CreatedLog: {}, AlreadyPresent: false };
    let LocalFromFolder;

    try {
        LocalFromFolder = await CommonFromCreate.StartFunc({ inFolderName, inFileNameWithExtension, inUserPK });
        LocalReturnData.DirPath = LocalFromFolder.DirPath;
        LocalReturnData.FolderPath = LocalFromFolder.FolderPath;
        LocalReturnData.FilePath = LocalFromFolder.FilePath;
        LocalReturnData.ReturnDataPath = LocalFromFolder.ReturnDataPath;

        if (LocalFromFolder.KTF) {
            fs.writeFileSync(LocalFromFolder.FilePath, JSON.stringify({}));
            fs.writeFileSync(LocalFromFolder.ReturnDataPath, JSON.stringify({}));
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.AlreadyPresent = LocalFromFolder.AlreadyPresent;
        };
    } catch (error) {
        LocalReturnData.KError = error;
    };

    return await LocalReturnData;
};

module.exports = { StartFunc };