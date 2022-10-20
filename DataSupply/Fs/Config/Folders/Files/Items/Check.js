let fs = require("fs");
let CommonFile = require("../Check");

let ForFile = ({ inFolderName, inFileNameWithExtension, inItemName, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", FilePath: "", CreatedLog: {} };

    let LocalFolderInfo = CommonFolder.ForExistence({ inFolderName, inUserPK });
    if (LocalFolderInfo.KTF) {
        LocalReturnData.DirPath = LocalFolderInfo.DirPath;
        LocalReturnData.FilePath = `${LocalReturnData.DirPath}/${inFileNameWithExtension}`;

        if (fs.existsSync(LocalReturnData.FilePath)) {
            LocalReturnData.KTF = true;
        };
    };

    return LocalReturnData;
};

let InConfig = ({ inFolderName, inFileNameOnly, inItemName, inUserPK }) => {
    let LocalReturnObject = { KTF: false, DirCreate: "", CreatedLog: {} };

    try {
        let LocalFromFile = CommonFile.InConfig({ inFolderName, inFileNameOnly, inUserPK });
        let LocalFilePath = LocalFromFile.FilePath;
        let LocalFileData = fs.readFileSync(LocalFilePath);
        let LocalReturnData = fs.readFileSync(LocalFromFile.ReturnDataPath);

        if (inItemName in JSON.parse(LocalFileData)) {
            LocalReturnObject.KTF = true;
            LocalReturnObject.DisplayJsonData = JSON.parse(LocalFileData)[inItemName];
        };
        
        if (inItemName in JSON.parse(LocalReturnData)) {
            LocalReturnObject.ReturnDataJsonData = JSON.parse(LocalReturnData)[inItemName]
        };
    } catch (error) {
        console.log("error : ", error);
    };


    return LocalReturnObject;
};

module.exports = { ForFile, InConfig };