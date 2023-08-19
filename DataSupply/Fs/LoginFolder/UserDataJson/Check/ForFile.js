let fs = require("fs");
let CommonFolderPath = require("../../Check/ForFolder");

let StartFunc = async () => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromFolderCheck = await CommonFolderPath.StartFunc();

    LocalReturnData = { ...LocalFromFolderCheck };
    LocalReturnData.FilePath = `${LocalReturnData.FolderPath}/UserData.json`;
    LocalReturnData.KTF = false;
    
    if (LocalFromFolderCheck.KTF === false) {
        LocalReturnData.ErrorFrom = __dirname;
        return LocalReturnData;
    };

    if (LocalFromFolderCheck.KTF) {
        if (fs.existsSync(LocalReturnData.FilePath)) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "Json file not found";
        };
    }

    return await LocalReturnData;
};

module.exports = { StartFunc };