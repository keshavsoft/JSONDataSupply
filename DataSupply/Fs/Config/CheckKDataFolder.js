let fs = require("fs");
let CommonAbsolutePath = require("../DataPath");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, DataPKPath: "", KReason: "" };

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsoluteKDataPath();
    LocalReturnData.KDataPath = GlobalDataPath;

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
