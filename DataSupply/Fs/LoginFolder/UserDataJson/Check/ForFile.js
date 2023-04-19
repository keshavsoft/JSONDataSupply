let fs = require("fs");
let CommonFolderPath = require("../../Check/ForFolder");

let StartFunc = async () => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromFolderCheck = await CommonFolderPath.StartFunc();

    LocalReturnData = { ...LocalFromFolderCheck };

   // LocalReturnData.FolderPath = LocalFromFolderCheck.FolderPath;
    LocalReturnData.FilePath = `${LocalReturnData.FolderPath}/UserData.json`;

    //console.log(LocalFromFolderCheck);
    if (LocalFromFolderCheck.KTF) {
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