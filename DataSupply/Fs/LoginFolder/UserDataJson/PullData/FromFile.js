let fs = require("fs");
let CommonCheck = require("../Check/ForFile");

let StartFunc = async () => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromCheck = await CommonCheck.StartFunc();

    LocalReturnData = { ...LocalFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCheck.KTF) {
        LocalReturnData.FilePath = LocalFromCheck.FilePath;
        LocalReturnData.KTF = true;

        let LocalJsonData = fs.readFileSync(LocalFromCheck.FilePath);

        LocalReturnData.JsonData = JSON.parse(LocalJsonData);
    } else {
        LocalReturnData.KReason = "Json file not found";
    };

    return await LocalReturnData;
};

module.exports = { StartFunc };