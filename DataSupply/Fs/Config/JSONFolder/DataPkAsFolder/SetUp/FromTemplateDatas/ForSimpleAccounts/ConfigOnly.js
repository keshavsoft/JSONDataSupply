let CommonFromConfigFolder = require("../../../ConfigFolder/Check");
let CommonFromCheck = require("./Check");
let fs = require("fs-extra");

let StartFunc = ({ inDataPK }) => {
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

// let FromForExistence = StartFunc({ inDataPK: 16 });

// console.log("FromForExistence : ", FromForExistence);

module.exports = { StartFunc };
