let fs = require("fs");
let CommonAbsolutePath = require("../../DataPath");
let CommonDataPath = require("../../../Kprivate/DataPath.json");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    //LocalReturnData.DataUploadPath = CommonDataPath.DataUploadPath;
    LocalReturnData.DataUploadPath = CommonAbsolutePath.ReturnJsonUploadPath();

    // console.log("ssssssssssss : ", LocalReturnData);

    console.log("----------- : ", LocalReturnData.DataUploadPath);

    try {
        if (fs.statSync(`${__dirname}/${LocalReturnData.DataUploadPath}`).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "DataUploadPath: not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = "DataUploadPath: not found!";
    };

    return LocalReturnData;
};

module.exports = {
    ForExistence
};
