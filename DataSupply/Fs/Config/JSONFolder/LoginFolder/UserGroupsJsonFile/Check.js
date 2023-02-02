let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistence = async () => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCheck = await CommonFromCheck.ForExistence();
    LocalReturnData.LoginFolderPath = LocalFromCheck.LoginFolderPath;
    LocalReturnData.localFileName = "UserGroups.json";
    
    if (LocalFromCheck.KTF) {
        LocalReturnData.UserGroupJsonFilePath = `${LocalFromCheck.LoginFolderPath}/${LocalReturnData.localFileName}`
    };

    try {
        if (fs.statSync(LocalReturnData.UserGroupJsonFilePath)) {
            LocalReturnData.KTF = true;
        };
    } catch (error) {

    };

    return LocalReturnData;
};
// let LocalMockForExistence = ForExistence().then((promiseData) => {
//     console.log("promiseData", promiseData);
// });
// console.log("LocalMockForExistence : ", LocalMockForExistence);


module.exports = { ForExistence };
