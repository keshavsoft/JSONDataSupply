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

let mockFunc = () => {
    AsAsync()
};
// mockFunc();

module.exports = {
    AsAsync
};