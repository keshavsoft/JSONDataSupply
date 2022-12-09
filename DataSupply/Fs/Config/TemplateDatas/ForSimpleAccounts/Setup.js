let fs = require("fs");
let CommonFromCheck = require("./Check");
let CommonInConfigFolder = require("../../JSONFolder/DataPkAsFolder/ConfigFolder/Check");

let GetDirectories = ({ inDataPath }) => {
    let LocalDataPath = inDataPath;

    return fs.readdirSync(LocalDataPath).filter(function (file) {
        return fs.statSync(LocalDataPath + '/' + file).isDirectory();
    });
};

let StartFunc = () => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence();

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    const directoryPath = LocalFromCommonFromCheck.TemplateDataPath;
    let LocalFrom = GetDirectories({ inDataPath: directoryPath });
    let LocalFromCommonInConfigFolder = CommonInConfigFolder.FolderIsEmpty({ inDataPK: 16 });

    //let LocalFromCommonInConfigFolder=CommonInConfigFolder.ForExistence({in})

    console.log("LocalFrom : ", LocalFrom, LocalFromCommonInConfigFolder);

    return LocalReturnData;
};

let FromForExistence = StartFunc();

console.log("FromForExistence : ", FromForExistence);

module.exports = { StartFunc };
