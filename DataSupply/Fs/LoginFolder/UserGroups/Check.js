let fs = require("fs");
let CommonFromCheck = require("../Check/ForFolder");

let ForExistence = async () => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromCheck = await CommonFromCheck.StartFunc();
    let LocalFileName = "UserGroups.json";

    LocalReturnData.FilePath = `${LocalFromCheck.FolderPath}/${LocalFileName}`

    if (LocalFromCheck.KTF === false) {
        return await LocalReturnData;
    };

    if (fs.existsSync(LocalReturnData.FilePath)) {
        LocalReturnData.KTF = true;
    };

    return await LocalReturnData;
};

module.exports = { ForExistence };
