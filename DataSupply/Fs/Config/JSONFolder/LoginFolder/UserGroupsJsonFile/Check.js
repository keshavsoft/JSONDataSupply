let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistence = async () => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromCheck = await CommonFromCheck.ForExistence();
    let LocalFileName = "UserGroups.json";

    LocalReturnData.FilePath = `${LocalFromCheck.LoginFolderPath}/${LocalFileName}`

    if (LocalFromCheck.KTF === false) {
        LocalReturnData.Reason = `${LocalFileName}: File not found..!`

        return await LocalReturnData;
    };

    if (fs.existsSync(LocalReturnData.FilePath)) {
        LocalReturnData.KTF = true;
    };
    return await LocalReturnData;
};
// let LocalMockForExistence = ForExistence().then((promiseData) => {
//     console.log("promiseData", promiseData);
// });
// console.log("LocalMockForExistence : ", LocalMockForExistence);


module.exports = { ForExistence };
