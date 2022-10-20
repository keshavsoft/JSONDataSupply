let fs = require("fs");
let CommonFolder = require("../../Check/InConfigFolder/Check");
let CommonJsonFileAsFolder = require("./JsonFileAsFolder");

let StartFunc = async ({ inFolderName, inFileNameOnly, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", CreatedLog: {} };
    let LocalFromJsonFileAsFolder = await CommonJsonFileAsFolder.StartFunc({ inFolderName, inFileNameOnly, inUserPK });
    if (LocalFromJsonFileAsFolder.KTF) {
        LocalReturnData.DirPath = LocalFromJsonFileAsFolder.DirPath;
        LocalReturnData.FolderPath = LocalFromJsonFileAsFolder.FolderPath;
        LocalReturnData.FilePath = LocalFromJsonFileAsFolder.FilePath;
        LocalReturnData.ReturnDataPath = LocalFromJsonFileAsFolder.ReturnDataPath;

        if (fs.existsSync(LocalReturnData.FilePath)) {
            LocalReturnData.KTF = true;
        };
    };

    return await LocalReturnData;
};

module.exports = { StartFunc };