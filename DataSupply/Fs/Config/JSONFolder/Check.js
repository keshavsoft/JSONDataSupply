let fs = require("fs");
let CommonAbsolutePath = require("../../DataPath");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});

    LocalReturnData.JSONFolderPath = GlobalDataPath;

    try {
        if (fs.statSync(LocalReturnData.JSONFolderPath).isDirectory()) {
            LocalReturnData.KTF = true;
        };
    } catch (error) {

    };

    return LocalReturnData;
};

// let LocalMockForExistence = ForExistence();
// console.log("LocalMockForExistence : ", LocalMockForExistence);

module.exports = { ForExistence };
