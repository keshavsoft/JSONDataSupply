let path = require("path");
let fs = require("fs");
let CommonDataPath = require("../../Kprivate/DataPath.json");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, DataPKPath: "", KReason: "" };

    LocalReturnData.KDataPath = path.resolve(__dirname + `/../../../${CommonDataPath.KDataFolderPath}`)

    try {
        if (fs.statSync(LocalReturnData.KDataPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = `KDataPath not found!`;
        };
    } catch (error) {
        LocalReturnData.KReason = `KDataPath not found!`;
    };

    return LocalReturnData;
};

module.exports = { ForExistence };
