let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCheck = CommonFromCheck.ForExistence();
    LocalReturnData.LoginFolderPath = LocalFromCheck.LoginFolderPath;
    LocalReturnData.localFileName = "UserGroups.json";

    if (LocalFromCheck.KTF) {
        LocalReturnData.UserGroupJsonFilePath = `${LocalFromCheck.LoginFolderPath}/${LocalReturnData.localFileName}`
        LocalReturnData.KReason = LocalFromCheck.KReason;
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
