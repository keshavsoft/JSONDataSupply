let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromCheck = CommonFromCheck.ForExistence();
    LocalReturnData.JSONFolderPath = LocalFromCheck.JSONFolderPath;
    LocalReturnData.LoginFolderPath =`${LocalFromCheck.JSONFolderPath}/Login` ;

    try {
        if (fs.statSync(LocalReturnData.LoginFolderPath).isDirectory()) {
            LocalReturnData.KTF = true;
        };
    } catch (error) {

    };

    return LocalReturnData;
};



// let LocalMockForExistence = ForExistence();
// console.log("LocalMockForExistence : ", LocalMockForExistence);

module.exports = { ForExistence };
