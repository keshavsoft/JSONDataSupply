let path = require("path");
let fs = require("fs");
let CommonDataPath = require("../../Kprivate/DataPath.json");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, DataPKPath: "", KReason: "" };

    LocalReturnData.KDataPath = path.resolve(__dirname + `/../../${CommonDataPath.KDataFolderPath}`)

    try {
        if (fs.statSync(LocalReturnData.KDataPath).isDirectory()) {
            LocalReturnData.KTF = true;
        };
    } catch (error) {
        LocalReturnData.KReason = `KData folder not found!`;
    };

    return LocalReturnData;
};

let LocalMockFunc = () => {
    let LocalFromForExistence = ForExistence();
    console.log("LocalFromForExistence : ", LocalFromForExistence);
};

// LocalMockFunc();

module.exports = { ForExistence };
