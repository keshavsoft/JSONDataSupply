let fs = require("fs");
let CommonFolderPath = require("../../Check/ForFolder");

let StartFunc = async () => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromFolderCheck = await CommonFolderPath.StartFunc();
    LocalReturnData.FolderPath = LocalFromFolderCheck.FolderPath;
    LocalReturnData.FilePath = `${LocalReturnData.FolderPath}/AdminData.json`;

    //console.log(LocalFromFolderCheck);
    if (LocalFromFolderCheck.KTF = "true") {
        // console.log("Entered");
        if (fs.existsSync(LocalReturnData.FilePath)) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "Json file not found";
        };
    }

    return await LocalReturnData;
};

module.exports = { StartFunc };