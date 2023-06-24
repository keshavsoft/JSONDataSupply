let fs = require("fs");
let CommonCheck = require("../Check");

let AsAsync = async () => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalDataFromCommonCreate;
    let LocalDataFromJSON;
    let LocalFilePath;

    LocalDataFromCommonCreate = await CommonCheck.ForExistence();

    if (LocalDataFromCommonCreate.KTF === false) {
        LocalReturnData.Reason = `${LocalDataFromCommonCreate.UserGroupJsonFilePath} file not found...!`;
        return await LocalReturnData;
    };

    if (LocalDataFromCommonCreate.KTF) {
        LocalFilePath = LocalDataFromCommonCreate.UserGroupJsonFilePath

        LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
        LocalReturnData = JSON.parse(LocalDataFromJSON);

        Object.freeze(LocalReturnData);
    };
    console.log("LocalReturnData", LocalReturnData);

    return await LocalReturnData;
};

let StartFunc = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromCheck = CommonCheck.ForExistence();

    LocalReturnData.UserGroupJsonFilePath = LocalFromCheck.UserGroupJsonFilePath;

    if (LocalFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCheck.KReason;

        return LocalReturnData;
    };

    try {
        let LocalDataFromFile = fs.readFileSync(LocalReturnData.UserGroupJsonFilePath);
        let LocalJsonData = JSON.parse(LocalDataFromFile);

        LocalReturnData.KTF = true;
        LocalReturnData.JsonData = LocalJsonData;
    } catch (error) {

    };

    return LocalReturnData;
};


module.exports = {
    StartFunc
};