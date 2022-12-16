let CommonFromConfigFolder = require("../../../ConfigFolder/Check");
let CommonFromAdminFolder = require("../../../AdminFolder/Check");
let CommonFromCheck = require("./Check");
let CommonCreateFolders = require("../../CreateFolders/Basic");

let fs = require("fs-extra");

let StartFunc = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromAdminFolder = CommonFromConfigFolder.FolderIsEmpty({ inDataPK })

    if (LocalFromCommonFromAdminFolder) {
        let LocalFrom = CommonFromCheck.ReturnDirectories();

        if (LocalFrom.KTF === false) {
            LocalReturnData.KReason = LocalFrom.KReason;

            return await LocalReturnData;
        };
        
        if (LocalFrom.DirectoriesArray.includes("Config")) {
            fs.copySync(`${LocalFrom.TemplateDataPath}/Config`, LocalFromCommonFromAdminFolder.ConfigPath);
            LocalReturnData.KTF = true;
        };
    };

    return await LocalReturnData;
};

let StartFunc2 = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = await CommonCreateFolders.StartFunc({ inDataPK });
    LocalReturnData.ConfigPath = `${LocalFromCommonFromCheck.DataPKPath}/Config`;

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = `${inDataPK} : folder is already present...`;

        return await LocalReturnData;
    };

    let LocalFromCommonFromConfigFolder = CommonFromConfigFolder.FolderIsEmpty({ inDataPK })

    if (LocalFromCommonFromConfigFolder) {
        let LocalFrom = CommonFromCheck.ReturnDirectories();

        if (LocalFrom.KTF === false) {
            LocalReturnData.KReason = LocalFrom.KReason;

            return await LocalReturnData;
        };
        console.log("aaaaaa : ", LocalFrom.DirectoriesArray);
        if (LocalFrom.DirectoriesArray.includes("Config")) {
            fs.copySync(`${LocalFrom.TemplateDataPath}/Config`, LocalFromCommonFromConfigFolder.ConfigPath);
            LocalReturnData.KTF = true;
        };

        if (LocalFrom.DirectoriesArray.includes("Admin")) {
            fs.copySync(`${LocalFrom.TemplateDataPath}/Admin`, LocalFromCommonFromConfigFolder.ConfigPath);
            LocalReturnData.KTF = true;
        };
    };

    return await LocalReturnData;

    // let LocalFromCommonFromConfigFolder = CommonFromConfigFolder.FolderIsEmpty({ inDataPK })

    // if (LocalFromCommonFromConfigFolder) {

    // };
};

let StartFunc1 = ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence();

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    const directoryPath = LocalFromCommonFromCheck.TemplateDataPath;
    let LocalFrom = GetDirectories({ inDataPath: directoryPath });

    let LocalFromCommonFromConfigFolder = CommonFromConfigFolder.FolderIsEmpty({ inDataPK })

    if (LocalFromCommonFromConfigFolder) {
        if (LocalFrom.includes("Config")) {
            fs.copySync(`${directoryPath}/Config`, LocalFromCommonFromConfigFolder.ConfigPath);
            LocalReturnData.KTF = true;
        };
    };

    return LocalReturnData;

    // let LocalFromCommonFromConfigFolder = CommonFromConfigFolder.FolderIsEmpty({ inDataPK })

    // if (LocalFromCommonFromConfigFolder) {

    // };
};

let GetDirectories = ({ inDataPath }) => {
    let LocalDataPath = inDataPath;

    return fs.readdirSync(LocalDataPath).filter(function (file) {
        return fs.statSync(LocalDataPath + '/' + file).isDirectory();
    });
};

// StartFunc({ inDataPK: 1016 }).then(p => {

//     console.log("FromStartFunc : ", p);

// });

module.exports = { StartFunc };
