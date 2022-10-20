let fs = require("fs");
let CommonFromCheckConfigFromFile = require("../../Check/ConfigFromFile");
let CommonCreateJsonFileAsFolder = require("./CreateJsonFileAsFolder");

let path = require("path");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", CreatedLog: {}, AlreadyPresent: false };
    let LoalFromJsonFileAsFolder;
    let LocalFromCheckConfigFromFile;

    try {
        LoalFromJsonFileAsFolder = await CommonCreateJsonFileAsFolder.StartFunc({
            inFolderName,
            inFileNameWithExtension, inUserPK
        });

        LocalReturnData.DirPath = LoalFromJsonFileAsFolder.DirPath;
        LocalReturnData.FolderPath = LoalFromJsonFileAsFolder.FolderPath;
        LocalReturnData.FilePath = LoalFromJsonFileAsFolder.FilePath;
        LocalReturnData.ReturnDataPath = LoalFromJsonFileAsFolder.ReturnDataPath;

        //  console.log("LoalFromJsonFileAsFolder  ", LoalFromJsonFileAsFolder);

        if (LoalFromJsonFileAsFolder.KTF || LoalFromJsonFileAsFolder.AlreadyPresent) {
            LocalFromCheckConfigFromFile = await CommonFromCheckConfigFromFile.StartFunc({
                inFolderName,
                inFileNameOnly: path.parse(inFileNameWithExtension).name, inUserPK
            });

            if (LocalFromCheckConfigFromFile.KTF === false) {
                fs.writeFileSync(LocalReturnData.FilePath, JSON.stringify({}));
                LocalReturnData.KTF = true;
            } else {
                LocalReturnData.AlreadyPresent = true;
            };
        };
    } catch (error) {
        LocalReturnData.KError = error;
    };
    return await LocalReturnData;
};

module.exports = { StartFunc };