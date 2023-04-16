let fs = require("fs");
let CommonAbsolutePath = require("../DataPath");
let os = require("os");

let ForExistence = () => {
    let LocalPlatform = os.platform();
    let LocalReturnData = { KTF: false, DataPKPath: "", KReason: "" };
    let LocalPathChar = "";

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsoluteKDataPath();
    LocalReturnData.KDataPath = GlobalDataPath;

    switch (LocalPlatform) {
        case "darwin":
            LocalPathChar = "\\";

            break;
        case "linux":
            LocalPathChar = "\\";
            break;

        default:
            LocalPathChar = "/";
            break;
    };

    LocalReturnData.PathChar = LocalPathChar;

    try {
        if (fs.statSync(LocalReturnData.DataPKPath).isDirectory()) {
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
