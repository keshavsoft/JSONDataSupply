let fs = require("fs");
let CommonFolder = require("../../Check/InConfigFolder/Check");

let StartFunc = async ({ inFolderName, inFileNameOnly, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", CreatedLog: {} };
    try {
        let LocalFolderInfo = CommonFolder.ForExistence({ inFolderName, inUserPK });
        LocalReturnData.DirPath = LocalFolderInfo.DirPath;
        LocalReturnData.FolderPath = `${LocalReturnData.DirPath}/${inFileNameOnly}`;
        LocalReturnData.FilePath = `${LocalReturnData.FolderPath}/Display.json`;
        LocalReturnData.ReturnDataPath = `${LocalReturnData.FolderPath}/ReturnData.json`;
        if (LocalFolderInfo.KTF) {
            if (fs.existsSync(LocalReturnData.FolderPath)) {
                if (fs.statSync(LocalReturnData.FolderPath).isDirectory()) {
                    LocalReturnData.KTF = true;
                };
            };
        };
    } catch (error) {
        console.log("error in datasupply : ", error);
    };

    return await LocalReturnData;
};

module.exports = { StartFunc };