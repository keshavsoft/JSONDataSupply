let fs = require("fs");
let CommonAbsolutePath = require("../../../../DataPath");

let ForExistence = ({ inFolderName, inDataPk }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalDataPathName = "Data";

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    LocalReturnData.DirPath = `${GlobalDataPath}/${inDataPk}/${LocalDataPathName}/${inFolderName}`

    try {
        if (fs.statSync(LocalReturnData.DirPath).isDirectory()) {
            LocalReturnData.KTF = true;
        };
    } catch (error) {

    };

    return LocalReturnData;
};

module.exports = { ForExistence };
