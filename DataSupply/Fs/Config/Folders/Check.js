let fs = require("fs");
let CommonAbsolutePath = require("../../DataPath");
let CommonCreateInDataFolder = require("./Create/InDataFolder/CreateFolder");

let ForExistence = ({ inFolderName, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalDataPathName = "Data";

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    LocalReturnData.DirPath = `${GlobalDataPath}/${inUserPK}/${LocalDataPathName}/${inFolderName}`

    try {
        if (fs.statSync(LocalReturnData.DirPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "File not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

let ForExistenceElseCreate = async ({ inFolderName, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {}, DirCreate: "" };
    let LocalFromExistence = ForExistence({ inFolderName, inUserPK });
    let LocalFromCreate;

    if (LocalFromExistence.KTF === false) {
        LocalFromCreate = await CommonCreateInDataFolder.StartFunc({ inFolderName, inUserPK });

        if (LocalFromCreate.KTF) {
            LocalReturnData.KTF = true;
            LocalReturnData.DirCreate = LocalFromCreate.DirCreate;
            LocalReturnData.KResult = "Folder created";
        };
    } else {
        LocalReturnData.AlreadyPresent = true;
    };

    return await LocalReturnData;
};

let ForConfig = ({ inFolderName, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalDataPathName = "Config";

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    LocalReturnData.DirPath = `${GlobalDataPath}/${inUserPK}/${LocalDataPathName}/${inFolderName}`

    try {
        if (fs.statSync(LocalReturnData.DirPath).isDirectory()) {
            LocalReturnData.KTF = true;
        };
    } catch (error) {

    };

    return LocalReturnData;
};

module.exports = { ForExistence, ForConfig, ForExistenceElseCreate };
