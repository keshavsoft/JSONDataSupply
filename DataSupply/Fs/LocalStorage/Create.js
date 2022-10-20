let path = require("path");
let CommonAbsolutePath = require("../DataPath");
let fs = require("fs");

let CreateFolderIfNotPresent = ({ inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", CreatedLog: {} };

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({ inPresentDirectory: `${path.resolve("")}` });

    const LocalConfigFolderToCreate = `${GlobalDataPath}/${inUserPK}/Admin`;

    if (!fs.existsSync(LocalConfigFolderToCreate)) {
        LocalReturnData.DirCreate = fs.mkdirSync(LocalConfigFolderToCreate, {
            recursive: true
        });
    } else {
        LocalReturnData.DirCreate = LocalConfigFolderToCreate;
    };

    LocalReturnData.KTF = true;

    return LocalReturnData;
};

let CreateFileAsync = ({ inUserPK }) => {
    try {
        let LocalReturnData = { KTF: false, DirCreate: "", CreatedLog: {} };

        const LocalConfigFolderToCreate = CreateFolderIfNotPresent({ inUserPK });

        if (LocalConfigFolderToCreate.KTF) {
            let LocalFileName = "LocalStorage.json";
            let LocalFilePath = `${LocalConfigFolderToCreate.DirCreate}/${LocalFileName}`;

            if (!fs.existsSync(LocalFilePath)) {
                LocalReturnData.FilePath = fs.writeFileSync(LocalFilePath, JSON.stringify({}));
            } else {
                LocalReturnData.FilePath = LocalFilePath;
            };

            LocalReturnData.KTF = true;
        };

        return LocalReturnData;

    } catch (error) {
        console.log("error : ", error);
    };

};

//CreateFileIfNotPresent({ inUserPK: 53 });
module.exports = { CreateFolderIfNotPresent, CreateFileAsync };