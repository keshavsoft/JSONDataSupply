let CommonCheck = require("../Check");

let fs = require("fs");

let AsAsync = async () => {
    let LocalReturnData;
    let LocalDataFromCommonCreate;
    let LocalDataFromJSON;
    let LocalFilePath;

    LocalDataFromCommonCreate = await CommonCheck.ForExistence();

    if (LocalDataFromCommonCreate.KTF) {
        LocalFilePath = LocalDataFromCommonCreate.FilePath

        LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
        LocalReturnData = JSON.parse(LocalDataFromJSON);

        Object.freeze(LocalReturnData);
    };
    
    return await LocalReturnData;
};

module.exports = {
    AsAsync
};