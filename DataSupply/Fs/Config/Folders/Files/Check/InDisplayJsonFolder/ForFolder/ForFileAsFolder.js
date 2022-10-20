let fs = require("fs");
let CommonFolder = require("../../../../Check/InConfigFolder/Check");

let StartFunc = async ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", CreatedLog: {} };
    try {
        let LocalFolderInfo = CommonFolder.ForExistence({ inFolderName, inUserPK: inDataPK });

        LocalReturnData.DirPath = LocalFolderInfo.DirPath;
        LocalReturnData.FolderPath = `${LocalReturnData.DirPath}/${inFileNameOnly}`;
        LocalReturnData.FilePath = `${LocalReturnData.FolderPath}/Display.json`;
        LocalReturnData.ReturnDataPath = `${LocalReturnData.FolderPath}/ReturnData.json`;

        if (LocalFolderInfo.KTF === false) {
            LocalReturnData.KReason = LocalFolderInfo.KReason;
            return await LocalReturnData;
        };

        if (fs.existsSync(LocalReturnData.FolderPath)) {
            if (fs.statSync(LocalReturnData.FolderPath).isDirectory()) {
                LocalReturnData.KTF = true;
            };
        } else {
            LocalReturnData.KReason = `${inFileNameOnly} : folder not found in folder config/${inFolderName}`;
            return await LocalReturnData;
        };
    } catch (error) {
        console.log("error in datasupply : ", error);
    };

    return await LocalReturnData;
};

module.exports = { StartFunc };