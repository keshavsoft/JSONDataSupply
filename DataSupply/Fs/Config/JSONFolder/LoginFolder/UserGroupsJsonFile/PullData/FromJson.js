let CommonCheck = require("../Check");
let fs = require("fs");

let AsAsync = async () => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalDataFromCommonCreate;
    let LocalDataFromJSON;
    let LocalFilePath;

    LocalDataFromCommonCreate = await CommonCheck.ForExistence();

    if (LocalDataFromCommonCreate.KTF === false) {
        LocalReturnData.Reason = LocalDataFromCommonCreate.Reason;
        return await LocalReturnData;
    };

    if (LocalDataFromCommonCreate.KTF) {
        LocalFilePath = LocalDataFromCommonCreate.FilePath

        LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
        LocalReturnData = JSON.parse(LocalDataFromJSON);

        Object.freeze(LocalReturnData);
    };
    console.log("LocalReturnData", LocalReturnData);

    return await LocalReturnData;
};

// let mockFunc = () => {
//     AsAsync()
// };
// mockFunc();

module.exports = {
    AsAsync
};