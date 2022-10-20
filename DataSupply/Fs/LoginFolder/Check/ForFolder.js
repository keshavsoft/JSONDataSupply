let fs = require("fs");
let CommonAbsolutePath = require("../../DataPath");

let StartFunc = async () => {
    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    LocalReturnData.FolderPath = `${GlobalDataPath}/Login`;

    if (fs.existsSync(LocalReturnData.FolderPath)) {
        try {
            if (fs.statSync(LocalReturnData.FolderPath).isDirectory()) {
                LocalReturnData.KTF = true;
            };
        } catch (error) {
            LocalReturnData.KReason = error;
        };
    } else {
        LocalReturnData.KReason = "Json file not found";
    };
    
    return await LocalReturnData;
};

//module.exports = { StartFunc };
module.exports = { StartFunc };
